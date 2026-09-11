// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract TrustWork is ReentrancyGuard {
    enum ProjectStatus { PENDING, FUNDED, DISPUTED, COMPLETED }

    struct Milestone {
        uint8 percentage;
        bool isApproved;
    }

    struct Project {
        address client;
        address worker;
        uint256 totalAmount;
        IERC20 token;
        ProjectStatus status;
        uint8 currentMilestone;
        address arbiter;
    }

    address public defaultArbiter;
    uint256 public projectCount;
    
    mapping(uint256 => Project) public projects;
    mapping(uint256 => Milestone[]) public projectMilestones;

    event ProjectCreated(uint256 indexed projectId, address indexed client, address indexed worker);
    event MilestoneApproved(uint256 indexed projectId, uint8 milestoneIndex, uint256 amount);
    event Disputed(uint256 indexed projectId);
    event Resolved(uint256 indexed projectId, uint256 clientAmount, uint256 workerAmount);

    constructor(address _defaultArbiter) {
        defaultArbiter = _defaultArbiter;
    }

    function createProject(
        address _worker,
        uint256 _amount,
        IERC20 _token,
        uint8[] memory _milestonePercentages
    ) external nonReentrant {
        require(_amount > 0, "Amount must be > 0");
        require(_milestonePercentages.length > 0, "Needs milestones");
        
        uint8 totalPct = 0;
        for(uint i=0; i < _milestonePercentages.length; i++) {
            totalPct += _milestonePercentages[i];
        }
        require(totalPct == 100, "Milestones must total 100%");

        require(_token.transferFrom(msg.sender, address(this), _amount), "Transfer failed");

        uint256 projectId = projectCount++;
        
        Project storage p = projects[projectId];
        p.client = msg.sender;
        p.worker = _worker;
        p.totalAmount = _amount;
        p.token = _token;
        p.status = ProjectStatus.FUNDED;
        p.arbiter = defaultArbiter;

        for(uint i=0; i < _milestonePercentages.length; i++) {
            projectMilestones[projectId].push(Milestone({
                percentage: _milestonePercentages[i],
                isApproved: false
            }));
        }

        emit ProjectCreated(projectId, msg.sender, _worker);
    }

    function approveMilestone(uint256 _projectId) external nonReentrant {
        Project storage p = projects[_projectId];
        require(msg.sender == p.client, "Only client");
        require(p.status == ProjectStatus.FUNDED, "Not funded");
        require(p.currentMilestone < projectMilestones[_projectId].length, "All milestones done");

        Milestone storage m = projectMilestones[_projectId][p.currentMilestone];
        require(!m.isApproved, "Already approved");

        m.isApproved = true;
        uint256 payment = (p.totalAmount * m.percentage) / 100;
        
        p.currentMilestone++;
        if(p.currentMilestone == projectMilestones[_projectId].length) {
            p.status = ProjectStatus.COMPLETED;
        }

        require(p.token.transfer(p.worker, payment), "Transfer failed");
        emit MilestoneApproved(_projectId, p.currentMilestone - 1, payment);
    }

    function triggerDispute(uint256 _projectId) external {
        Project storage p = projects[_projectId];
        require(msg.sender == p.client || msg.sender == p.worker, "Not participant");
        require(p.status == ProjectStatus.FUNDED, "Can only dispute funded");
        
        p.status = ProjectStatus.DISPUTED;
        emit Disputed(_projectId);
    }

    function resolveDispute(uint256 _projectId, uint8 _clientPct, uint8 _workerPct) external nonReentrant {
        Project storage p = projects[_projectId];
        require(msg.sender == p.arbiter, "Only arbiter");
        require(p.status == ProjectStatus.DISPUTED, "Not disputed");
        require(_clientPct + _workerPct == 100, "Must total 100%");

        p.status = ProjectStatus.COMPLETED;

        uint8 remainingPct = 0;
        for(uint i = p.currentMilestone; i < projectMilestones[_projectId].length; i++) {
            remainingPct += projectMilestones[_projectId][i].percentage;
        }
        
        uint256 remainingAmount = (p.totalAmount * remainingPct) / 100;
        uint256 clientShare = (remainingAmount * _clientPct) / 100;
        uint256 workerShare = (remainingAmount * _workerPct) / 100;

        if(clientShare > 0) require(p.token.transfer(p.client, clientShare), "Client transfer failed");
        if(workerShare > 0) require(p.token.transfer(p.worker, workerShare), "Worker transfer failed");

        emit Resolved(_projectId, clientShare, workerShare);
    }
}
