/* eslint-disable prettier/prettier */
import { useEffect } from "react";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";


export function GetFindSession({args, setIsFound}) {

	const { data } = useScaffoldContractRead({
		contractName: "Game1",
		functionName: "findSession",
		args: [args],
	});
	useEffect(() => {
		if (data?.exists)
			setIsFound(data);
		console.log("data", data)
	}, [data]);

	return (<></>)
}
