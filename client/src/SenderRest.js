//WalletBalance of Senders
import React from 'react';

function SenderRest({ acc19 }) {
    //console.log(acc19);
    const asd = Object.keys(acc19).map((acc15) => {
        // var key = index;
        return (
            <div>
              {  `${acc19[acc15].ac} .....${acc19[acc15].Senderbl} `}; 
             {/*  {acc19[acc15].ac} */}
            </div>
        )
    });
    return (
        <div>
            {asd}
        </div>
    )


}
export default SenderRest;