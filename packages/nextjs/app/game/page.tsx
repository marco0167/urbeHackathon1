
import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";
import { GameContracts } from "./_components/GameContracts";

export const metadata = getMetadata({
  title: "Game Contracts",
  description: "Game your deployed 🏗 Scaffold-ETH 2 contracts in an easy way",
});

const Game: NextPage = () => {
  return (
    <GameContracts />
  );
};

export default Game;
