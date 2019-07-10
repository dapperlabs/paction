pragma solidity >=0.5.6 <0.6.0;

contract TestContract {
    bool public publicBool;
    uint256 public publicUint256;
    bytes32 public publicBytes32;
    address public publicAddress;
    address payable public publicPayableAddress;
    uint256[] public publicUint256Array;
    bytes32[] public publicBytes32Array;

    struct MyToken {
        address owner;
        bytes32 metadata;
    }

    mapping (uint256 => MyToken) public tokens;

    constructor(
        bool publicBool_,
        bytes32 publicBytes32_,
        address publicAddress_,
        address payable publicPayableAddress_,
        uint256[] memory publicUint256Array_,
        bytes32[] memory publicBytes32Array_
    ) public {
        publicBool = publicBool_;
        publicBytes32 = publicBytes32_;
        publicAddress = publicAddress_;
        publicPayableAddress = publicPayableAddress_;
        publicUint256Array = publicUint256Array_;
        publicBytes32Array = publicBytes32Array_;
    }

    function createToken (uint256 tokenId_, address owner_, bytes32 metadata_) external {
        tokens[tokenId_] = MyToken({
          owner: owner_,
          metadata: metadata_
        });
    }
}
