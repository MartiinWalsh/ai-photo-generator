import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/photo", async (req, res) => {
  const prompt = req.body.prompt;
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
    });
    const image = response.data.data[0].url;

    res.send({ image });
  } catch (error) {
    console.log(error);
  }
});

app.listen(8080, () => {
  console.log("Server started on port 8000");
});
