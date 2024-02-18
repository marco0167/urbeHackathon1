"use client"
import type { NextPage } from "next";
import { useRouter } from "next/navigation";

const Lose: NextPage = () => {
  const routes = useRouter();
  return (
    <>
      <button onClick={() => routes.push("/game")} className="bg-primary text-neutral p-2 rounded-md w-fit">Go back to monkey</button>
      <div className="text-center mt-8 bg-secondary p-10">
        YOU LOSE
      </div>
    </>
  );
};

export default Lose;
