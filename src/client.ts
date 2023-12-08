import { client } from '@passwordless-id/webauthn'

async function ClientRegistration(username: string) {
    try {
        const challenge = "a7c61ef9-dc23-4806-b486-2428938a547e"
        const registration = await client.register(username, challenge, {
            authenticatorType: "auto",
            userVerification: "required",
            timeout: 60000,
            attestation: false,
            userHandle: "recommended to set it to a random 64 bytes value",
            debug: false
        })
        console.log(registration)
        return registration.credential;
    } catch (e) {
        console.log(e)
    }
}

async function ClientAuthentication(publicId: string) {
    try {
        const challenge = "56535b13-5d93-4194-a282-f234c1c24500"
        const authentication = await client.authenticate([publicId], challenge, {
            "authenticatorType": "auto",
            "userVerification": "required",
            "timeout": 60000
        })
        return authentication
    } catch (e) {
        console.log("Authentication failed")
    }
}

export  {ClientRegistration, ClientAuthentication};