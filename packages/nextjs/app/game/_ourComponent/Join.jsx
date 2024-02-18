import React from 'react'
import { GetFindSession } from '../_components/GetFindSession'
import { formatEther } from 'viem'

function Join({sessionId, sendBet, handleChange, handleSearch, callGetHook=false, bytes32String, setIsFound, isFound, correctSessionId, updateNum, updateCoin}) {
  return (
	<>
		<div className="flex w-1/2 gap-16">
          <input
            className="input input-ghost mb-4 focus-within:border-transparent bg-white focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
            placeholder={"Search for a game"}
            value={sessionId}
            onChange={handleChange}
            autoComplete="off"
            maxLength={32}
          />
          <button onClick={handleSearch}

          className="bg-blue-500 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-2 px-4 rounded"> Search </button>
        </div>

        {callGetHook && ( <GetFindSession args={bytes32String} setIsFound={setIsFound} /> )}

        {isFound?.exists && (
        <div className="w-1/2 bg-red-700 flex flex-col p-6 rounded-xl">
          <input
            className="input input-ghost mb-4 focus-within:border-transparent bg-white focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
            disabled
            value={correctSessionId || ""}
            />
          <input
            className="input input-ghost mb-4 focus-within:border-transparent bg-white focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
            placeholder="insert your game number"
            type="number"
            name="num"
            onChange={(e) => updateNum(e.target.value)}
            autoComplete="off"
          />

          <div className="flex gap-16">
              <input
                className="input input-ghost  focus-within:border-transparent bg-white focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
                name="payable"
                value={formatEther(isFound?.bet)}
                disabled
                onChange={(e) => updateCoin(e.target.value)}
                />
              <button onClick={sendBet} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Bet </button>
            </div>
              <p>se vinci guadagnerai: !!!METTI VALUE!!</p>

        </div>
        )}
	</>
  )
}

export default Join
