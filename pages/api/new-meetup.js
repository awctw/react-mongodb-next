import { MongoClient } from "mongodb";

export async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://test:123@cluster0.pabyt.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);
    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
