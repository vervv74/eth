import Web3 from 'web3';
import Wal from './contracts/Wal.json';

const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      if(window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          resolve(web3);
        } catch(error) {
          reject(error);
        }
      } else if(window.web3) {
        resolve(window.web3);
      } else {
        reject('Must install Metamask');
      }
    });
  });
};

const getWal = async web3 => { //contract instance produced by web3
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = Wal.networks[networkId];
  return new web3.eth.Contract(
    Wal.abi,
/* Оператор && выполняет следующие действия:
Вычисляет операнды слева направо.
Каждый операнд преобразует в логическое значение. Если результат false, останавливается и возвращает исходное значение этого операнда.
Если все операнды были истинными, возвращается последний. */
    deployedNetwork && deployedNetwork.address,
  );
}

export { getWeb3, getWal }; 
