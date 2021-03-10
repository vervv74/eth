import { useEffect, useState } from 'react';
import { getWeb3, getWal } from './utils.js';
import SenderRest from './SenderRest.js';
import Send from './Send.js';


function App() {
  const [web3, setWeb3] = useState(undefined);// web3 instance
  const [accounts, setAccounts] = useState([]);///ganache accounts 
  const [wal, setWal] = useState(undefined); // sc instance
  const [ContractBalance, setContractBalance] = useState(0);// sc balance
  const [ContractAddress, setContractAddress] = useState(undefined);//sc address
  const [bal, setbal] = useState([]);//ganache accounts balance
  const [SenderBalance, setSenderBalance] = useState([]);//SenderBalance
  const [accBal, setAccB] = useState([{ ac: '', bl: '', Senderbl: '' }]);// Object state - acc and balances

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      setWeb3(web3);
      const wal = await getWal(web3);//////getWal takes the web3 instance as a parameter
      setWal(wal);
      const accounts = await web3.eth.getAccounts();////
      setAccounts(accounts);
      const ContractBalance = await wal.methods.ContractBalance().call();
      const ContractAddress = await wal.methods.ContractAddress().call();
      setContractAddress(ContractAddress);
      setContractBalance(ContractBalance);

    }
    init();
  }, []);/// the only called effect



  useEffect(async () => {/// define array with objects - all the information aboyt ganache account - address, eth balance, wallet balance
    const SenderBalance = await Promise.all(accounts.map((acc61) => {
      return wal.methods.getRest(acc61).call();
    }))
    setSenderBalance(SenderBalance);

    const qwe87 = await Promise.all(accounts.map((acc91, index) => {
      var key = index;
      return { ac: acc91, bl: bal[key], Senderbl: SenderBalance[key] };
    }));
    setAccB(qwe87);

  }, [bal]);

  useEffect(async () => {///// define ganache accounts balance in ethereum (not wallet) - setbal
    const qwe = await Promise.all(accounts.map((acc6) => {
      return web3.eth.getBalance(acc6);
    }))
    setbal(qwe);

  }, [ContractBalance]);



  const SunNew = async (e, sum, from) => {
    e.preventDefault();
    await web3.eth.sendTransaction({ from: document.getElementById(from).value, to: ContractAddress, value: document.getElementById(sum).value });
    const ContractBalance = await wal.methods.ContractBalance().call();
    setContractBalance(ContractBalance);
  }

  /* const output = accBal.map((acc11, index) => {
    // var key = index;
     return (
       <div>
         {acc11}
       </div>
     )
   }) */

  // const Object = Object.keys(accBal);

  const defineRest1 = async (e, sender, id) => {/// th rest for address
    e.preventDefault();
    const sum = await wal.methods.Rest(sender).call();
    alert(sum);
    alert(id);
    document.getElementById(id).value = sum;
  }


  const Send1 = async (e, toSend, sumSend) => {

    try {
       e.preventDefault();
    await wal.methods.Send(document.getElementById(toSend).value, document.getElementById(sumSend).value).send({ from: document.getElementById(toSend).value });
    const ContractBalance = await wal.methods.ContractBalance().call();
    setContractBalance(ContractBalance);}
   catch (err){
     alert(err)
   }

  }


  return (
    <div >
      <p>ContractBalance = {ContractBalance}</p>
      Accounts
      {accBal.map((acc11) => {
        // var key = index;
        return (
          <div>
            {`${acc11.ac}   ....... ${acc11.bl}.... ${acc11.Senderbl}`}
          </div>
        )
      })}
      <form onSubmit={e => SunNew(e, "sum", "accapp")}>
        <input id="sum" size="50" type="text"></input>
        <input size="50" id="accapp" type="text" ></input>
        <input type="submit" value="Отправляем с APP"></input>
      </form>
      <SenderRest acc19={accBal} />
      <Send defineRest={defineRest1} Send1={Send1} />
    </div>
  );
}

export default App;
