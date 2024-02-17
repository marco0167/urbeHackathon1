"use client";

import { use, useEffect, useState } from "react";
import { InputBase, IntegerInput } from "~~/components/scaffold-eth";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";


export function GameContracts() {

  // const { data: totalCounter } = useScaffoldContractRead({
  //   contractName: "Game1",
  //   functionName: "betAmount",
  // });
  const [value, setValue] = useState<string>("05");
  const [isJoin, setIsJoin] = useState<boolean>(true);
  const [isFound, setIsFound] = useState<boolean>(false);

  // useEffect(() => {
  //   console.log(value);
  // }, [value]);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleJoin() {
    setIsJoin(false);
  }

  function handleCreate() {
    setIsJoin(true);
  }

  function handleSearch() {
    setIsFound(!isFound);
  }

  return (

    <div>

      {/* crate two button "join" and "create" side by side  */}

      <div className="flex flex-col items-center">
        <div className="flex gap-16 p-5 justify-center w-1/2 bg-red-700 ">
          <button disabled={!isJoin} onClick={handleJoin} className="bg-blue-500 disabled:opacity-50 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Join </button>
          <button disabled={isJoin} onClick={handleCreate} className="bg-blue-500 disabled:opacity-50 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Create </button>
        </div>

        <div className="flex w-1/2 gap-16">
          <input
            className="input input-ghost mb-4 focus-within:border-transparent bg-white focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
            placeholder={"Search for a game"}
            value={value?.toString()}
            onChange={handleChange}
            autoComplete="off"
          />
          <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Search </button>
        </div>

        {isFound && (
        <div className="w-1/2 bg-red-700 flex flex-col p-6 rounded-xl">
          <input
            className="input input-ghost mb-4 focus-within:border-transparent bg-white focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
            placeholder={"Enter a number"}
            value={value?.toString()}
            onChange={handleChange}
            autoComplete="off"
            />
          <input
            className="input input-ghost mb-4 focus-within:border-transparent bg-white focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
            placeholder={"Enter a number"}
            value={value?.toString()}
            onChange={handleChange}
            autoComplete="off"
          />

          <div className="flex gap-16">
              <input
                className="input input-ghost  focus-within:border-transparent bg-white focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
                placeholder={"Enter a number"}
                value={value?.toString()}
                onChange={handleChange}
                autoComplete="off"
                />
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Bet </button>
            </div>
              <p>se vinci guadagnerai: {value}</p>

        </div>
        )}
      </div>
    </div>

  );
}
