pragma solidity ^0.4.24;

// ----------------------------------------------------------------------------
// 'PLToken' token contract
//
// Deployed to : 0x795f9412CF44B40ab5Efa151c2c124C869c0aaCe
// Symbol      : PLTOK
// Name        : ProjectLink Token
// Total supply: 100000000
// Decimals    : 18
//
// Enjoy.
//
// (c) by Moritz Neto with BokkyPooBah / Bok Consulting Pty Ltd Au 2017. The MIT Licence.
// ----------------------------------------------------------------------------


// ----------------------------------------------------------------------------
// Safe maths
// ----------------------------------------------------------------------------
contract SafeMath {
    function safeAdd(uint a, uint b) public pure returns (uint c) {
        c = a + b;
        require(c >= a);
    }
    function safeSub(uint a, uint b) public pure returns (uint c) {
        require(b <= a);
        c = a - b;
    }
    function safeMul(uint a, uint b) public pure returns (uint c) {
        c = a * b;
        require(a == 0 || c / a == b);
    }
    function safeDiv(uint a, uint b) public pure returns (uint c) {
        require(b > 0);
        c = a / b;
    }
}


// ----------------------------------------------------------------------------
// ERC Token Standard #20 Interface
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md
// ----------------------------------------------------------------------------
contract ERC20Interface {
    function totalSupply() public constant returns (uint);
    function balanceOf(address tokenOwner) public constant returns (uint balance);
    function allowance(address tokenOwner, address spender) public constant returns (uint remaining);
    function transfer(address to, uint tokens) public returns (bool success);
    function approve(address spender, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);
    
   
    
    function lockBalance(uint tokens) public returns(bool success);
    function getLockedBalance(address tokenOwner) public constant returns(uint tokens);
    function myBalance() public constant returns (uint tokens);
    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);

    
}


// ----------------------------------------------------------------------------
// Contract function to receive approval and execute function in one call
//
// Borrowed from MiniMeToken
// ----------------------------------------------------------------------------
contract ApproveAndCallFallBack {
    function receiveApproval(address from, uint256 tokens, address token, bytes data) public;
}


// ----------------------------------------------------------------------------
// Owned contract
// ----------------------------------------------------------------------------
contract Owned {
    address public owner;
    address public newOwner;

    event OwnershipTransferred(address indexed _from, address indexed _to);

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address _newOwner) public onlyOwner {
        newOwner = _newOwner;
    }
    function acceptOwnership() public {
        require(msg.sender == newOwner);
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
        newOwner = address(0);
    }
}

contract PLContractInterface{
      struct PLContract {
        address problemOwnerWallet;
        address solutionOwnerWallet;
        string problemID;
        string deadline_1;
         uint paid_1;
        string deadline_2;
         uint paid_2;
        string deadline_3;
         uint paid_3;
        string IPFSHash;
       
    }
    mapping(string=>PLContract) ContractDetail;
    function setDetail(string problemID) public returns (bool success) {
         ContractDetail[problemID]=PLContract(0x77284293372ebC1e3361A40D778D70D02CdED1B2,0x77284293372ebC1e3361A40D778D70D02CdED1B2,problemID,'ss',12,'ss',13,'ss',14,'sss');
        return true;
    }
    
    function setContractDetail(address problemOwnerWallet, address solutionOwnerWallet, string problemID,string deadline_1,uint paid_1,string deadline_2,uint paid_2,string deadline_3,uint paid_3,string IPFSHash) public {
         
            ContractDetail[problemID]=PLContract(problemOwnerWallet,solutionOwnerWallet,problemID,deadline_1,paid_1,deadline_2,paid_2,deadline_3,paid_3,IPFSHash);
    }
    function getDeadline_1(string problemID) public constant returns(string){
            return ContractDetail[problemID].deadline_1;
    }
    function getPaid_1(string problemID) public constant returns(uint){
            return ContractDetail[problemID].paid_1;
    }
    function getDeadline_2(string problemID) public constant returns(string){
            return ContractDetail[problemID].deadline_2;
    }
     function getPaid_2(string problemID) public constant returns(uint){
            return ContractDetail[problemID].paid_2;
    }
     function getDeadline_3(string problemID) public constant returns(string){
            return ContractDetail[problemID].deadline_3;
    }
     function getPaid_3(string problemID) public constant returns(uint){
            return ContractDetail[problemID].paid_3;
    }
    function getIPFSHash(string problemID) public constant returns(string){
            return ContractDetail[problemID].IPFSHash;
    }
    
     function getProblemOwnerWallet(string problemID) public constant returns(address){
            return ContractDetail[problemID].problemOwnerWallet;
    }
     function getSolutionOwnerWallet(string problemID) public constant returns(address){
            return ContractDetail[problemID].solutionOwnerWallet;
    }
}


// ----------------------------------------------------------------------------
// ERC20 Token, with the addition of symbol, name and decimals and assisted
// token transfers
// ----------------------------------------------------------------------------
contract ProjectLinkToken is ERC20Interface, Owned, SafeMath,PLContractInterface {
    string public symbol;
    string public  name;
    uint8 public decimals;
    uint public _totalSupply;
    address ownerAddress;
    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) allowed;
    mapping(address=> uint) lockedBalance;
  
    // ------------------------------------------------------------------------
    // Constructor
    // ------------------------------------------------------------------------
    constructor() public {
        symbol = "PLTOK";
        name = "ProjectLink Token";
        decimals = 18;
        _totalSupply = 100000000000000000000000000;
        ownerAddress=msg.sender;
        balances[ownerAddress] = _totalSupply;
        emit Transfer(address(0),ownerAddress, _totalSupply);
    }


    // ------------------------------------------------------------------------
    // Total supply
    // ------------------------------------------------------------------------
    function totalSupply() public constant returns (uint) {
        return _totalSupply  - balances[address(0)];
    }

    //pay for contract
    function pay(address receiver,uint tokens)  public  returns(bool success){
                lockedBalance[msg.sender]=safeSub(lockedBalance[msg.sender],tokens);
                balances[receiver]=safeAdd(balances[receiver],tokens);
                return true;
    }
    


    // ------------------------------------------------------------------------
    // Get the token balance for account tokenOwner
    // ------------------------------------------------------------------------
    function balanceOf(address tokenOwner) public constant returns (uint balance) {
        return balances[tokenOwner];
    }
    //lock an amount of token from this address to make sure this tokenOwner cant use amount of tokens
    function lockBalance(uint tokens) public returns(bool success){
        balances[msg.sender]=safeSub(balances[msg.sender],tokens);
        lockedBalance[msg.sender]=safeAdd(lockedBalance[msg.sender],tokens);
        return true;
    }
    
    function getLockedBalance(address tokenOwner) public constant returns(uint tokens){
        return lockedBalance[tokenOwner];
    }
    
    // ------------------------------------------------------------------------
    // Transfer the balance from token owner's account to to account
    // - Owner's account must have sufficient balance to transfer
    // - 0 value transfers are allowed
    // ------------------------------------------------------------------------
    function transfer(address to, uint tokens) public returns (bool success) {
        balances[msg.sender] = safeSub(balances[msg.sender], tokens);
        balances[to] = safeAdd(balances[to], tokens);
        emit Transfer(msg.sender, to, tokens);
        return true;
    }


    // ------------------------------------------------------------------------
    // Token owner can approve for spender to transferFrom(...) tokens
    // from the token owner's account
    //
    // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md
    // recommends that there are no checks for the approval double-spend attack
    // as this should be implemented in user interfaces 
    // ------------------------------------------------------------------------
    function approve(address spender, uint tokens) public returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        return true;
    }


    // ------------------------------------------------------------------------
    // Transfer tokens from the from account to the to account
    // 
    // The calling account must already have sufficient tokens approve(...)-d
    // for spending from the from account and
    // - From account must have sufficient balance to transfer
    // - Spender must have sufficient allowance to transfer
    // - 0 value transfers are allowed
    // ------------------------------------------------------------------------
    function transferFrom(address from, address to, uint tokens) public returns (bool success) {
        balances[from] = safeSub(balances[from], tokens);
        allowed[from][msg.sender] = safeSub(allowed[from][msg.sender], tokens);
        balances[to] = safeAdd(balances[to], tokens);
        emit Transfer(from, to, tokens);
        return true;
    }



    function myBalance() public constant returns (uint tokens){
        return  balances[msg.sender];
    }
    // ------------------------------------------------------------------------
    // Returns the amount of tokens approved by the owner that can be
    // transferred to the spender's account
    // ------------------------------------------------------------------------
    function allowance(address tokenOwner, address spender) public constant returns (uint remaining) {
        return allowed[tokenOwner][spender];
    }


    // ------------------------------------------------------------------------
    // Token owner can approve for spender to transferFrom(...) tokens
    // from the token owner's account. The spender contract function
    // receiveApproval(...) is then executed
    // ------------------------------------------------------------------------
    function approveAndCall(address spender, uint tokens, bytes data) public returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        ApproveAndCallFallBack(spender).receiveApproval(msg.sender, tokens, this, data);
        return true;
    }


    // ------------------------------------------------------------------------
    // Don't accept ETH
    // ------------------------------------------------------------------------
    function () public payable {
        revert();
    }


    // ------------------------------------------------------------------------
    // Owner can transfer out any accidentally sent ERC20 tokens
    // ------------------------------------------------------------------------
    function transferAnyERC20Token(address tokenAddress, uint tokens) public onlyOwner returns (bool success) {
        return ERC20Interface(tokenAddress).transfer(owner, tokens);
    }
}