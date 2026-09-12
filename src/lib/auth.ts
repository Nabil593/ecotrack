import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db("ecoTrack");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      companyName: {
        type: "string",
        required: false,
        defaultValue: "",
      },
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
      },
      status: {
        type: "string",
        required: false,
        defaultValue: "active",
      },
      subscriptionPlan: {
        type: "string",
        required: false,
        defaultValue: "free",
      },
      stripeCustomerId: {
        type: "string",
        required: false,
        defaultValue: "",
      },
      image: {
        type: "string",
        required: false,
        defaultValue: "",
      },
    },
  },
});
