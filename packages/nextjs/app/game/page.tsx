
import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";
import { GameContracts } from "./_components/GameContracts";

export const metadata = getMetadata({
  title: "Game Contracts",
  description: "Game your deployed 🏗 Scaffold-ETH 2 contracts in an easy way",
});

const Game: NextPage = () => {
  return (
    <>
      <GameContracts />
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">Game Contracts</h1>
        <p className="text-neutral">
          You can game & interact with your deployed contracts here.
          <br /> Check{" "}
          <code className="italic bg-base-300 text-base font-bold [word-spacing:-0.5rem] px-1">
            packages / nextjs / app / game / page.tsx
          </code>{" "}
        </p>
      </div>
    </>
  );
};

export default Game;
