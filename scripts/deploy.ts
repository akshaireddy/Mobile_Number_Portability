const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const MobileNumberPortability = await hre.ethers.getContractFactory("MobileNumberPortability");
  const mnp = await MobileNumberPortability.deploy();
  await mnp.deployed();

  console.log("MobileNumberPortability deployed to:", mnp.address);

  // Save contract address to a file (optional)
  fs.writeFileSync("contract-address.txt", mnp.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
