// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MobileNumberPortability {
    address public owner;
    
    enum PortingStatus { Requested, Approved, Rejected }
    
    struct PortingRequest {
        address requester;
        string currentNumber;
        string newNumber;
        PortingStatus status;
    }
    
    mapping(address => PortingRequest) public portingRequests;
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }
    
    function requestPorting(string memory currentNumber, string memory newNumber) external {
        require(bytes(currentNumber).length > 0 && bytes(newNumber).length > 0, "Numbers must be provided");
        require(portingRequests[msg.sender].status != PortingStatus.Requested, "A porting request is already pending");
        
        PortingRequest storage request = portingRequests[msg.sender];
        request.requester = msg.sender;
        request.currentNumber = currentNumber;
        request.newNumber = newNumber;
        request.status = PortingStatus.Requested;
    }
    
    function approvePorting(address requester) external onlyOwner {
        PortingRequest storage request = portingRequests[requester];
        require(request.status == PortingStatus.Requested, "Invalid request status");
        
        // Perform necessary checks, such as verifying user identity
        
        request.status = PortingStatus.Approved;
    }
    
    function rejectPorting(address requester) external onlyOwner {
        PortingRequest storage request = portingRequests[requester];
        require(request.status == PortingStatus.Requested, "Invalid request status");
        
        request.status = PortingStatus.Rejected;
    }
    
    function getPortingStatus() external view returns (PortingStatus) {
        return portingRequests[msg.sender].status;
    }
}
