import { MongoClient, Database } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { CarSchema } from "./schema.ts";

const client = new MongoClient();
await client.connect(`mongodb://mongo:27017`);

const db = client.database("MyDatabase");

export const carsCollection = db.collection<CarSchema>("cars");
