import {NextRequest, NextResponse} from "next/server";
const SOLANA = require('@solana/web3.js');
const { Connection, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } = SOLANA;

async function Airdrop(WALLET_ADDRESS: string, AIRDROP_AMOUNT: number, network: string) {
        const SOLANA_CONNECTION = new Connection(clusterApiUrl(network || 'devnet'));
        console.log(`Requesting airdrop for ${WALLET_ADDRESS}`)
        const signature = await SOLANA_CONNECTION.requestAirdrop(
            new PublicKey(WALLET_ADDRESS),
            AIRDROP_AMOUNT
        );
        const { blockhash, lastValidBlockHeight } = await SOLANA_CONNECTION.getLatestBlockhash();
        await SOLANA_CONNECTION.confirmTransaction({
            blockhash,
            lastValidBlockHeight,
            signature
        },'finalized');
        console.log(`Tx Complete: https://explorer.solana.com/tx/${signature}?cluster=devnet`)
        return signature;
};

export async function GET (request: NextRequest){
    const greeting = "Hello World!!"
    const json = {
        greeting
    };
    return NextResponse.json(json);
}

export async function POST (request: NextRequest){
    const body = await request.json();
    const {wallet, airdrop_amount, network} = body;
    const AIRDROP_AMOUNT = airdrop_amount * LAMPORTS_PER_SOL;
    if (wallet) {
        try{
            const signature = await Airdrop(wallet, AIRDROP_AMOUNT, network);
            return NextResponse.json({message: `Airdrop successful, check transaction: https://explorer.solana.com/tx/${signature}?cluster=devnet`, signature});
        }catch(e){
            return NextResponse.json({message: `Airdrop failed: ${e}`});
        }
    } else {
        return NextResponse.json({message: "Please provide a wallet address"});
    }
}