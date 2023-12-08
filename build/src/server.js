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
const webauthn_1 = require("@passwordless-id/webauthn");
function serverAuthentication(authentication, publicId) {
    return __awaiter(this, void 0, void 0, function* () {
        const expected = {
            challenge: "56535b13-5d93-4194-a282-f234c1c24500",
            origin: "http://localhost:8080",
            userVerified: true,
            counter: 123 // Optional. For device-bound credentials, you should verify the authenticator "usage" counter increased since last time.
        };
        const credentialKey = {
            id: "",
            publicKey: "",
            algorithm: "RS256"
        };
        const authenticationParsed = yield webauthn_1.server.verifyAuthentication(authentication, credentialKey, expected);
    });
}
