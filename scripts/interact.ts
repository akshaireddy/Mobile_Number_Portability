import { ethers } from "hardhat";
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const contractAddress = fs.readFileSync("contract-address.txt", "utf-8").trim();

  const MobileNumberPortability = await hre.ethers.getContractFactory("MobileNumberPortability");
  const mnp = await MobileNumberPortability.attach(contractAddress);

  // Get porting status
  const portingStatus = await mnp.getPortingStatus();
  console.log("Porting Status:", portingStatus);

  // Request porting
  try {
    const tx = await mnp.requestPorting("1234567890", "9876543210");
    await tx.wait();
    console.log("Porting request submitted");
  } catch (error) {
    console.error("Error submitting porting request:", error);
  }

  // Approve porting (assuming you are the contract owner)
  try {
    const tx = await mnp.approvePorting(deployer.address);
    await tx.wait();
    console.log("Porting request approved");
  } catch (error) {
    console.error("Error approving porting request:", error);
  }

  // Reject porting (assuming you are the contract owner)
  try {
    const tx = await mnp.rejectPorting(deployer.address);
    await tx.wait();
    console.log("Porting request rejected");
  } catch (error) {
    console.error("Error rejecting porting request:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
