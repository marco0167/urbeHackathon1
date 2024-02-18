/* eslint-disable prettier/prettier */
import React, { useState } from 'react'

function CreateComp({sessionId, sendBet, setSessionId, updateSessionId, updateNum, updateCoin}) {
  const [num, setNum] = useState(1);

  function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    updateSessionId(result);
    return result;
  }


  const checkNum = (num) => {
    if (num < 0)
    {
      setNum(0);
      updateNum(0);
    }
    else if (num > 5)
    {
      setNum(5);
      updateNum(5);
    }
    else
      setNum(num);
  }

  return (
		<div className="flex w-2/3 gap-16">

        <div className="w-full bg-[#323f61] flex flex-col p-6 rounded-xl">
          <div className='w-full flex items-center justify-between mb-4'>

              <input
                className="input input-ghost  focus-within:border-transparent bg-white focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-4/5 font-medium placeholder:text-accent/50 text-gray-400"
                placeholder="Generate a random session"
                value={sessionId}
                disabled
              />
              <button onClick={() => {setSessionId(makeid(32))}}
                className="bg-green-500 hover:bg-green-700 disabled:opacity-50 text-white font-bold py-2 px-4 rounded"> Generate </button>

            </div>
          <input
            className="input input-ghost mb-4 focus-within:border-transparent bg-white focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-4/5 font-medium placeholder:text-accent/50 text-gray-400"
            placeholder="Insert your game number between 0 and 5"
            type="number"
            name="num"
            value={num}
            onChange={(e) => checkNum(e.target.value)}
            autoComplete="off"
          />

          <div className="flex justify-between">
              <input
                className="input input-ghost  focus-within:border-transparent bg-white focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-4/5 font-medium placeholder:text-accent/50 text-gray-400"
                name="payable"
                placeholder="Insert the bet amount in ETH"
                onChange={(e) => updateCoin(e.target.value)}
                />
              <button onClick={sendBet} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Bet </button>
            </div>
              {/* <p>se vinci guadagnerai: !!!METTI VALUE!!</p> */}

        </div>
      </div>
  )
}

export default CreateComp
