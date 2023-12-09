"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payUsingBase = void 0;
const ethers_1 = require("ethers");
const userop_1 = require("userop");
// import {privateKeyToSafeSmartAccount} from "permissionless/accounts"
function payUsingBase(pvtKey) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const rpcUrl = "https://api.stackup.sh/v1/node/bab86e1e6e56836c1b6a5948d3d38e5308164f5ea5699359f1f49bc231f3dcf4";
        const paymasterRpcUrl = "https://api.stackup.sh/v1/paymaster/bab86e1e6e56836c1b6a5948d3d38e5308164f5ea5699359f1f49bc231f3dcf4";
        const paymasterContext = { type: "payg" };
        const paymaster = userop_1.Presets.Middleware.verifyingPaymaster(paymasterRpcUrl, paymasterContext);
        const provider = new ethers_1.ethers.providers.JsonRpcProvider(rpcUrl);
        const signer = new ethers_1.ethers.Wallet("0x9f18ac0a894949b08c9e6f3dff463233c6a5f7ad52793df07f33421a1202eab0");
        var builder = yield userop_1.Presets.Builder.SimpleAccount.init(signer, rpcUrl);
        console.log(builder);
        const address = builder.getSender();
        console.log(`Account address: ${address}`);
        const client = yield userop_1.Client.init(rpcUrl);
        const res = yield client.sendUserOperation(builder.execute("0x2207b75941311c0E03832bffE7a954169991A92A", "0x00", "0x00"));
        console.log(`UserOpHash: ${res.userOpHash}`);
        console.log("Waiting for transaction...");
        const ev = yield res.wait();
        console.log(`Transaction hash: ${(_a = ev === null || ev === void 0 ? void 0 : ev.transactionHash) !== null && _a !== void 0 ? _a : null}`);
        return { address, ev };
    });
}
exports.payUsingBase = payUsingBase;
