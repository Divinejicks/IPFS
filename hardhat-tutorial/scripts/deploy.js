const { ethers } = require("hardhat");
require("@nomiclabs/hardhat-etherscan");

const main = async () => {
    const metadataURL = "ipfs://Qmbygo38DWF1V8GttM1zy89KzyZTPU2FLUzQtiDvB7q6i5/"
    const LW3Punks = await ethers.getContractFactory("LW3Punks");
    const lw3Punks = await LW3Punks.deploy(metadataURL);
    await lw3Punks.deployed();

    console.log("LW3 deployed on address ", lw3Punks.address);

    console.log("Sleeping.......");
    await sleep(300000);

    await hre.run("verify:verify", {
        address: lw3Punks.address,
        constructorArguments: [metadataURL]
    })
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })