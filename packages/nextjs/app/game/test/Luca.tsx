/* eslint-disable prettier/prettier */
"use client";

import { useEffect, useReducer, useState } from "react";
import { Address, Balance, Bytes32Input } from "~~/components/scaffold-eth";
import { useDeployedContractInfo, useNetworkColor } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { ContractName } from "~~/utils/scaffold-eth/contract";
import { parseEther, stringToHex } from "viem";

type ContractUIProps = {
	contractName: ContractName;
	className?: string;
};

/**
 * UI component to interface with deployed contracts.
 **/
export const ContractUI = ({ contractName, className = "" }: ContractUIProps) => {
	const [data, setData] = useState({
		sessionId: "",
		coin: BigInt(0),
		number: "",
	});
	const [isSubmitActive, setIsSubmitActive] = useState(false);

	useEffect(() => {
		console.log(data);
		if (data.sessionId && data.coin && data.number)
			setIsSubmitActive(true);
	}, [data]);

	const sendNewGame = () => {

	};

	const updateSessionId = (value: string) => {
		let val = stringToHexSafe(value);
		setData({ ...data, sessionId: val?.toString() });
	};

	const updateCoin = (value: string) => {
		let val = valueToEther(value);
		setData({ ...data, coin: val });
	};

	const updateNum = (value: string) => {
		setData({ ...data, number: value });
	};

	function stringToHexSafe(value: string) {
		let val;

		if (value.length <= 32) {
			val = stringToHex(value, { size: 32 })
		}
		// console.log(val);
		return val;
	};

	function valueToEther(value: string) {
		let val = parseEther(value);
		// console.log(val);
		return val;
	};

	return (
		<div>
			<input placeholder="insert your game id" autoComplete="off" maxLength={32} name="sessionId" onChange={(e) => updateSessionId(e.target.value)}></input>
			<input placeholder="insert your game number" type="number" autoComplete="off" name="num" onChange={(e) => updateNum(e.target.value)}></input>
			<input placeholder="insert your payable amount" type="number" autoComplete="off" name="payable" onChange={(e) => updateCoin(e.target.value)}></input>
			<button disabled={!isSubmitActive} onClick={sendNewGame()}></button>
		</div>
	);
};
