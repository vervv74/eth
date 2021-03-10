const Wal = artifacts.require("Wal");

module.exports = async function (deployer, network, acc) {
  await deployer.deploy(Wal);
  const wal = Wal.deployed();
  await web3.eth.sendTransaction({from: acc[0], to: wal.address,value: 1000000000000000000})
};
