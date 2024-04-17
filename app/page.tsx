"use client";
import Image from "next/image";
import { use, useEffect, useState } from "react";

const sols = [0.5, 1, 2, 5];

export default function Home() {
  const [network, setNetwork] = useState("devnet");
  const [amount, setAmount] = useState<any>(null);
  const [openAmount, setOpenAmount] = useState(false);
  const [wallet, setWallet] = useState("");
  const [validWallet, setValidWallet] = useState(true);
  const [loading, setLoading] = useState(false);
  const [signature, setSignature] = useState(
    null
  );
  const [showVerdict, setShowVerdict] = useState(false);
  const [error, setError] = useState<any>(null);

  async function handleAirdrop() {
    setLoading(true);
    const body = JSON.stringify({ wallet, airdrop_amount: amount, network });
    const response = await fetch("/api/airdrop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    const data = await response.json();
    if (data.signature) {
      setShowVerdict(true);
      setSignature(data.signature);
    } else if (data.message) {
      setShowVerdict(true);
      setError(data.message);
    } else {
      setShowVerdict(true);
      setError("An error occurred");
    }
    setLoading(false);
  }

  return (
    <main className="flex max-h-screen flex-col items-center justify-start p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Note: Devnet / Testnet SOL are not real SOL.
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://github.com/sameergupta4873/"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            Sameer.SOL
          </a>
        </div>
      </div>

      <div className="h-[80vh] flex flex-col justify-center">
        <div className="group rounded-lg border bg-transparent p-7 transition-colors border-neutral-700 max-md:scale-75 max-sm:scale-50">
          <div className="flex justify-between w-[28rem] items-center">
            <h2 className="text-2xl font-medium">Request Airdrop </h2>
            <select
              className="border border-neutral-700 bg-transparent rounded-md px-2 text-sm font-medium h-min py-[0.4rem] hover:bg-neutral-800/50 focus:outline outline-offset-2 outline-2 outline-neutral-700"
              onChange={(e) => {
                setNetwork(e.target.value);
              }}
            >
              <option value={"devnet"}>devnet</option>
              <option value={"testnet"}>testnet</option>
            </select>
          </div>
          <p className="mt-1 max-w-[30ch] text-sm opacity-50">
            Maximum of 2 requests per hour
          </p>
          <div className="flex justify-between w-[28rem] items-center pt-7">
            <input
              className="border border-neutral-700 bg-transparent rounded-md px-3 text-sm font-medium h-min w-full py-[0.5rem] focus:outline outline-offset-2 outline-2 outline-neutral-700 mr-2"
              placeholder="Wallet Address"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
            />
            <div className="relative">
              <button
                onClick={() => setOpenAmount(true)}
                className="h-min px-3 py-[0.5rem] rounded-md border border-neutral-700 bg-transparent hover:bg-neutral-800/50 focus:outline outline-offset-2 outline-2 outline-neutral-700 text-sm min-w-[5rem]"
              >
                {amount ? amount + " SOL" : "Amount"}
              </button>
              {openAmount && (
                <div className="absolute p-3.5 border border-neutral-700/60 rounded-md bg-black mt-1 flex flex-wrap gap-2.5 w-[7.6rem]">
                  {sols.map((sol, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setAmount(sol);
                        setOpenAmount(false);
                      }}
                      className="h-10 w-10 border border-neutral-700/60 rounded-md bg-black flex justify-center items-center text-sm font-semibold hover:bg-neutral-800 transition-all ease-linear duration-200 hover:border-none"
                    >
                      {sol}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="mt-7">
            <button
              onClick={handleAirdrop}
              disabled={!wallet || !amount || loading}
              className="w-full h-min disabled:bg-[#877D8B] bg-[#E3D7E4] text-black text-sm font-medium rounded-lg py-[0.5rem] flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 animate-spin"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                  Requesting Airdrop ...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                    />
                  </svg>
                  Confirm Airdrop
                </>
              )}
            </button>
          </div>
        </div>
        <div className="relative ml-[20rem] z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px] max-md:scale-75 max-sm:scale-50"></div>
      </div>

      {showVerdict && signature ? (
        <div className="absolute top-0 left-0 min-h-[100vh] w-[99.98vw] bg-gray-500/50 flex flex-col justify-center items-center">
          <div className="rounded-md bg-slate-50 min-h-[18.5rem] w-[36rem] flex flex-col items-center justify-center p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-16 h-16 text-green-500 animate-bounce"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
              />
            </svg>
            <h2 className="text-2xl font-medium text-green-500">
              Airdrop Completed
            </h2>
            <p className="text-gray-800 text-center pt-5 max-w-[32rem] flex flex-col gap-2">
              Airdrop successful, check transaction:
              <a
                href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 tex"
              >
                {`https://explorer.solana.com/tx/${signature}?cluster=devnet`.slice(
                  0,
                  50
                ) + "..."}
              </a>
            </p>
            <div className="w-full flex justify-end">
              <button
                onClick={() => {
                  setShowVerdict(false)
                  setWallet('')
                  setAmount(null)
                  setNetwork('devnet')
                }}
                className="mt-5 px-4 py-2 bg-slate-200 text-slate-800 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : (
        showVerdict &&
        error && (
          <div className="absolute top-0 left-0 min-h-[100vh] w-[99.98vw] bg-gray-500/50 flex flex-col justify-center items-center">
            <div className="rounded-md bg-slate-50 min-h-[18.5rem] w-[36rem] flex flex-col items-center justify-center p-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-16 h-16 text-red-500 animate-bounce"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
              <h2 className="text-2xl font-medium text-red-500">
                Airdrop Failed
              </h2>
              <p className="text-gray-800 text-center pt-5">{error}</p>
              <div className="w-full flex justify-end">
                <button
                  onClick={() => {
                    setShowVerdict(false)
                    setWallet('')
                    setAmount(null)
                    setNetwork('devnet')
                  }}
                  className="mt-5 px-4 py-2 bg-slate-200 text-slate-800 rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </main>
  );
}
