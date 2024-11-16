"use client";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Scaffold-Essential</span>
          </h1>
          <p className="text-center text-lg">
            Get started by editing
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/nextjs/app/page.tsx
            </code>
          </p>
          <p className="text-center text-lg">
            Edit your smart contract
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              contract.pnt
            </code>{" "}
            in{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              backend/src
            </code>
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
