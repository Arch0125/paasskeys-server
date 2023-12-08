import { client } from "@passwordless-id/webauthn";
import { user } from "@pushprotocol/restapi";

async function ClientRegistration(username: string) {
  try {
    const uname = localStorage.getItem("userDetails");

    const storedUsers = uname ? JSON.parse(uname) : null;

    const users = storedUsers.findIndex(
      (user: any) => user.username === username
    );

    console.log(users, "exists");

    if (users === -1) {
      const challenge = "a7c61ef9-dc23-4806-b486-2428938a547e";
      const registration = await client.register(username, challenge, {
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
      return registration.credential.id;
    } else {
      const storedDetailsString = localStorage.getItem("userDetails");

      const storedDetails = storedDetailsString
        ? JSON.parse(storedDetailsString)
        : null;
      console.log(storedDetails[users].credId, "stored");
      return storedDetails[users].credId;
    }
  } catch (e) {
    console.log(e);
  }
}

async function ClientAuthentication(publicId: string) {
  try {
    const challenge = "56535b13-5d93-4194-a282-f234c1c24500";
    const authentication = await client.authenticate([publicId], challenge, {
      authenticatorType: "auto",
      userVerification: "required",
      timeout: 60000,
    });
    return authentication;
  } catch (e) {
    console.log("Authentication failed");
  }
}

export { ClientRegistration, ClientAuthentication };
