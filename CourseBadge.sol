// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract CourseBadge is ERC1155, Ownable (msg.sender) {
    // Track whether a user has claimed a specific token ID
    mapping(address => mapping(uint256 => bool)) public hasClaimed;

    // Maximum allowed token IDs (e.g., 1 to 4 for 4 phases)
    uint256 public constant MAX_PHASE_ID = 4;

    constructor(string memory baseURI) ERC1155(baseURI) {}

    /**
     * @dev Allows users to mint a badge for a specific course phase.
     * Requirements:
     * - tokenId must be between 1 and MAX_PHASE_ID
     * - user must not have already claimed that phase badge
     */
    function claimBadge(uint256 tokenId) external {
        require(tokenId >= 1 && tokenId <= MAX_PHASE_ID, "Invalid phase ID");
        require(!hasClaimed[msg.sender][tokenId], "Already claimed this badge");

        hasClaimed[msg.sender][tokenId] = true;
        _mint(msg.sender, tokenId, 1, "");
    }

    /**
     * @dev Admin can update the base URI if needed (optional)
     */
    function setBaseURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    /**
     * @dev Override uri to return token-specific metadata
     * Example: ipfs://CID/1.json, ipfs://CID/2.json
     */

    function uri(uint256 tokenId) public view override returns (string memory) {
    return string(abi.encodePacked(super.uri(tokenId), Strings.toString(tokenId)));
    }

}
