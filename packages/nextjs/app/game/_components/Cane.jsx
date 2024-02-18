/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import { formatEther } from 'viem';
import { useScaffoldContractRead } from '~~/hooks/scaffold-eth';

function Cane({sessionId, playerAddress, setResult}) {
  const { data } = useScaffoldContractRead({
		contractName: "Game1",
		functionName: "getResult",
		args: [sessionId, playerAddress],
	});
	useEffect(() => {
      setResult(data);
		console.log("dataAAAAAA", data)
	}, [data]);

	return (<></>)
}

export default Cane
