import { client } from "@passwordless-id/webauthn";
const { MongoClient } = require("mongodb");

const mongoose = require("mongoose");

const PORT = 5002;
const MONGO_URL =
  "mongodb+srv://Route-2:Rutusway@cluster0.rcijt7q.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(MONGO_URL);

client.connect();

const db = client.db("passKeys");
const collection = db.collection("passKeys");

async function ClientRegistration(username: string) {
  try {
    const challenge = "a7c61ef9-dc23-4806-b486-2428938a547e";
    const registration = await client.register(username, challenge, {
      authenticatorType: "auto",
      userVerification: "required",
      timeout: 60000,
      attestation: false,
      userHandle: "recommended to set it to a random 64 bytes value",
      debug: false,
    });

    const details = {
      [username]: registration.credential.id,
    };

    await collection.insertOne(details);
    console.log(registration);
    return registration.credential.id;
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

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log(`Connected ----> ${PORT}`);
  })
  .catch((error: any) => {
    console.error("MongoDB connection error:", error);
  });

export { ClientRegistration, ClientAuthentication };
