/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { GetFindSession } from '../_components/GetFindSession'
import { formatEther } from 'viem'

function Join({sessionId, sendBet, handleChange, handleSearch, callGetHook=false, bytes32String, setIsFound, isFound, correctSessionId, updateNum, updateCoin}) {
  const [num, setNum] = useState(1);

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
    {
      updateNum(num);
      setNum(num);
    }
  }

  return (
	<>
		<div className="flex bg-[#323f61] p-6 rounded-xl items-center w-2/3 justify-between">
          <input
            className="input input-ghost focus-within:border-transparent bg-white focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-4/5 font-medium placeholder:text-accent/50 text-gray-400"
            placeholder={"Search for a game"}
            value={sessionId}
            onChange={handleChange}
            autoComplete="off"
            maxLength={32}
          />
          <button onClick={handleSearch}
          className="bg-green-500 hover:bg-green-700 disabled:opacity-50 text-white font-bold py-2 px-4 rounded"> Search </button>
        </div>

        {callGetHook && ( <GetFindSession args={bytes32String} setIsFound={setIsFound} /> )}

        {isFound?.exists && (
        <div className="w-2/3 bg-[#323f61] mt-6 flex flex-col p-6 rounded-xl">
          <input
            className="input input-ghost mb-4 focus-within:border-transparent bg-white focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-4/5 font-medium placeholder:text-accent/50 text-gray-400"
            disabled
            value={correctSessionId || ""}
            />
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
                value={formatEther(isFound?.bet)}
                disabled
                onChange={(e) => {updateCoin(e.target.value), setBet(e.target.value)}}
                />
              <button onClick={sendBet} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Bet </button>
            </div>
              <p>Potential winnig: {(+formatEther(isFound?.bet) * 2 + +formatEther(isFound?.bet)) - ((+formatEther(isFound?.bet) * 2 + +formatEther(isFound?.bet)) * 20 / 100)} ETH</p>

        </div>
        )}
	</>
  )
}

export default Join
