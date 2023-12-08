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
exports.ClientAuthentication = exports.ClientRegistration = void 0;
const webauthn_1 = require("@passwordless-id/webauthn");
const ethers_1 = require("ethers");
function ClientRegistration(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let users = -1;
            // const uname = localStorage.getItem("userDetails");
            // const storedUsers = uname ? JSON.parse(uname) : null;
            // users = storedUsers.findIndex(
            //   (user: any) => user.username === username
            // );
            // console.log(users, "exists");
            if (users === -1) {
                const challenge = "a7c61ef9-dc23-4806-b486-2428938a547e";
                const registration = yield webauthn_1.client.register(username, challenge, {
                    authenticatorType: "auto",
                    userVerification: "required",
                    timeout: 60000,
                    attestation: false,
                    userHandle: "recommended to set it to a random 64 bytes value",
                    debug: false,
                });
                const userDetails = [
                    {
                        credId: registration.credential.id,
                        username: username,
                    },
                ];
                console.log(userDetails);
                localStorage.setItem("userDetails", JSON.stringify(userDetails));
                console.log(registration, "registraion new");
                return ethers_1.ethers.utils.keccak256(registration.credential.id);
            }
            else {
                const storedDetailsString = localStorage.getItem("userDetails");
                const storedDetails = storedDetailsString
                    ? JSON.parse(storedDetailsString)
                    : null;
                console.log(storedDetails[users].credId, "stored");
                return ethers_1.ethers.utils.keccak256(storedDetails[users].credId);
            }
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.ClientRegistration = ClientRegistration;
function ClientAuthentication(publicId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const challenge = "56535b13-5d93-4194-a282-f234c1c24500";
            const authentication = yield webauthn_1.client.authenticate([publicId], challenge, {
                authenticatorType: "auto",
                userVerification: "required",
                timeout: 60000,
            });
            return authentication;
        }
        catch (e) {
            console.log("Authentication failed");
        }
    });
}
exports.ClientAuthentication = ClientAuthentication;
