//send form
import React, { useState } from 'react';

function Send({ defineRest, Send1 }) {
   // const [Rest, setRest] = useState(0);

    const SenderRest = (e) => {///show the rest for address choosen
        e.preventDefault();
        const senderAddress = e.target.value;
        alert(senderAddress);
       // alert(defineRest(e, senderAddress));
        defineRest(e, senderAddress, 'sumSend');
       // setRest(sum);
    }
    const submitSend = (e, toSend, sumSend) => {
        e.preventDefault();
        Send1(e, toSend, sumSend);
    }

    return (
        <div>
            <form onSubmit={e => submitSend(e, "toSend", "sumSend")} >
                <input size="50" id="toSend" type="text" onChange={e => SenderRest(e)}></input>
                <input size="50" id="sumSend" type="text"  ></input>
                <input type="submit" value="Send"></input>
            </form>
        </div>
    )
}


export default Send;