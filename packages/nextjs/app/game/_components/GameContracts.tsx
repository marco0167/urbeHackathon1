/* eslint-disable prettier/prettier */
"use client";

import { useEffect, useState } from "react";
import { formatEther, getAddress, parseEther, stringToHex } from "viem";
import Join from "../_ourComponent/Join";
import CreateComp from "../_ourComponent/CreateComp";
import Cane from "../_components/Cane";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";


export function GameContracts() {
  const router = useRouter();

  const [sessionId, setSessionId] = useState<string>("");
  const [isJoin, setIsJoin] = useState<boolean>(false);
  const [isFound, setIsFound] = useState<any>();
  const [callGetHook, setCallGetHook] = useState<boolean>(false);

  const [bytes32String, setBytes32String] = useState<any>("");
  const [correctSessionId, setCorrectSessionId] = useState<string>("");

  const [dataResult, setDataResult] = useState<any>(0n);
  const { address: connectedAddress } = useAccount();

  const [isSubmitActive, setIsSubmitActive] = useState(false);

  const [data, setData] = useState({
		sessionId: "",
		coin: parseEther("0"),
		number: "",
	});

  //! Solo per debug
  useEffect(() => {
    console.log(data);
  }, [data]);

  // When the sessionId input value is changed, set the value
  function handleChange(e) {
    setSessionId(e.target.value);
  }

  function handleJoin() {
    setIsJoin(false);
  }

  function handleCreate() {
    setIsJoin(true);
  }

  // When the bytes32String is set, call the hook to get the data from the contract
  useEffect(() => {
    setCallGetHook(true);
  }, [bytes32String]);



  // When the sessionId is found on the chain is found, set the sessionId in the data object
  useEffect(() => {
    if(isFound?.exists)
    {
      setData({ ...data, sessionId: bytes32String.toString(), coin: isFound?.bet });
      setCorrectSessionId(sessionId);
    }
  }, [isFound]);


  //Search for a game converting the sessionId in byte32
  function handleSearch() {
     setBytes32String(stringToHexSafe(sessionId)); //Converts a string to a bytes32 hex string
  }


  // Set the num of the user
	const updateNum = (value: string) => {
		setData({ ...data, number: value });
	};


  // Set the Bet of the user
	const updateCoin = (value: string) => {
		const val = valueToEther(value);
		setData({ ...data, coin: val });
	};

	function valueToEther(value: string) {
		const val = parseEther(value);
		return val;
	}



  const updateSessionId = (value: string) => {
		const val = stringToHexSafe(value) || "";
		setData({ ...data, sessionId: val.toString() });
	};


  function stringToHexSafe(value: string) {
		let val;

		if (value.length <= 32) {
			val = stringToHex(value, { size: 32 })
		}
		return val;
	}

  useEffect(() => {
    if(dataResult != 0n && dataResult != undefined)
    {
    //  alert(`The game is ended, the result is , ${dataResult} `);
      if (dataResult == 1n)
        router.push('/win')
      if (dataResult == 2n)
        router.push('/lose')
    }
  }, [dataResult]);

  //BETTTTT
  async function sendBet() {
    writeAsync();

    while (dataResult == 0n)
    {
        if (dataResult != 0n)
        {
          return;
        }
        setIsSubmitActive(true);
        await delay(2000);
        setIsSubmitActive(false);
        await delay(2000);

    }
    console.log("The game is ended", dataResult[1]);
  }

  function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
    contractName: "Game1",
    functionName: "newGame",
    args: [data.sessionId as `0x${string}` , BigInt(data.number)],
    value: data.coin,
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });


  return (

    <div>

      <div className="flex flex-col items-center">
        <div className="flex gap-16 p-5 justify-center w-1/2 ">
          <button disabled={!isJoin} onClick={handleJoin} className="bg-blue-500 disabled:opacity-100 hover:opacity-100 opacity-50 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Join </button>
          <button disabled={isJoin} onClick={handleCreate} className="bg-blue-500 disabled:opacity-100 hover:opacity-100 opacity-50 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Create </button>
        </div>
          {isSubmitActive && (<Cane sessionId={data.sessionId} playerAddress={connectedAddress} setResult={setDataResult}/>)}
        {dataResult && (<h1> The game is ended, the result is {formatEther(dataResult|| 0n)} </h1>)}

        {isJoin && (<CreateComp sendBet={sendBet} updateCoin={updateCoin} updateNum={updateNum} sessionId={sessionId} updateSessionId={updateSessionId} setSessionId={setSessionId}/>)}

        {!isJoin && (<Join sessionId={sessionId} sendBet={sendBet} handleChange={handleChange} handleSearch={handleSearch} callGetHook={callGetHook} bytes32String={bytes32String} setIsFound={setIsFound} isFound={isFound} correctSessionId={correctSessionId} updateNum={updateNum} updateCoin={updateCoin} />)}
      </div>
    </div>

  );
}
