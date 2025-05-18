import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployCourseBadge: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Replace with your actual metadata CID
  const baseURI = "ipfs://bafybeifcpasy4s3iupuj5uezcnpld4ra5wx2mtlv2kf7a246lnapmipgli/";

  await deploy("CourseBadge", {
    from: deployer,
    args: [baseURI, deployer], // 👈 constructor(baseURI, owner)
    log: true,
    autoMine: true,
  });

  // Optional: interact with deployed contract
  const courseBadge = await hre.ethers.getContract<Contract>("CourseBadge", deployer);
  console.log("✅ CourseBadge contract deployed");
};

export default deployCourseBadge;

deployCourseBadge.tags = ["CourseBadge"];
