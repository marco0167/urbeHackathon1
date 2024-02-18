/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import { useScaffoldContractRead } from '~~/hooks/scaffold-eth';

function Cane({sessionId, playerAddress, setResult}) {
  console.log("WOOOOO")
  const { data } = useScaffoldContractRead({
		contractName: "Game1",
		functionName: "getResult",
		args: [sessionId, playerAddress],
	});
	useEffect(() => {
		if (data)
			setResult(data);
		console.log("data", data)
	}, [data]);

	return (<></>)
}

export default Cane
