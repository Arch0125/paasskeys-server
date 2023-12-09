import { ethers } from "ethers";
import { Presets, Client } from "userop";

async function payUsingBase(pvtKey:string) {
    const rpcUrl = "https://api.stackup.sh/v1/node/bab86e1e6e56836c1b6a5948d3d38e5308164f5ea5699359f1f49bc231f3dcf4";
    const paymasterRpcUrl = "https://api.stackup.sh/v1/paymaster/bab86e1e6e56836c1b6a5948d3d38e5308164f5ea5699359f1f49bc231f3dcf4";
    const paymasterContext = { type: "payg" };
    const paymaster = Presets.Middleware.verifyingPaymaster(
        paymasterRpcUrl,
        paymasterContext
    );

    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const signer = new ethers.Wallet("0x9f18ac0a894949b08c9e6f3dff463233c6a5f7ad52793df07f33421a1202eab0")
    var builder = await Presets.Builder.SimpleAccount.init(
        signer,
        rpcUrl,
        paymaster
    );
    console.log(builder)
    const address = builder.getSender();
    console.log(`Account address: ${address}`);

    const client = await Client.init(rpcUrl);
    const res = await client.sendUserOperation(builder.execute("0x2207b75941311c0E03832bffE7a954169991A92A","0x00","0x00"));

    console.log(`UserOpHash: ${res.userOpHash}`);
    console.log("Waiting for transaction...");
    const ev = await res.wait();
    console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);
}

export {payUsingBase};