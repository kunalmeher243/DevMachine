import express from "express";
import multer from "multer";
import fs from "fs";
import speech from "@google-cloud/speech";
import { Translate } from "@google-cloud/translate";

const app = express();
const upload = multer({ dest: "uploads/" });

// Initialize Google clients
const speechClient = new speech.SpeechClient();
const translate = new Translate();

// ----------- ROUTE 1: SPEECH TO TEXT -----------
app.post("/api/speech-to-text", upload.single("audio"), async (req, res) => {
  try {
    const file = fs.readFileSync(req.file.path);
    const audioBytes = file.toString("base64");

    const audio = {
      content: audioBytes,
    };

    const config = {
      encoding: "LINEAR16", // or "MP3", "FLAC" depending on your input
      sampleRateHertz: 16000,
      languageCode: "hi-IN", // user’s spoken language (example: Hindi)
    };

    const request = { audio, config };
    const [response] = await speechClient.recognize(request);

    const transcription = response.results
      .map((r) => r.alternatives[0].transcript)
      .join("\n");

    fs.unlinkSync(req.file.path); // cleanup
    res.json({ text: transcription });
  } catch (error) {
    console.error("Error during speech-to-text:", error);
    res.status(500).json({ error: error.message });
  }
});

// ----------- ROUTE 2: TRANSLATE TEXT -----------
app.post("/api/translate", express.json(), async (req, res) =>{
  try {
    const { text, targetLang } = req.body;

    const [translation] = await translate.translate(text, targetLang);
    res.json({ translatedText: translation });
  } catch (error) {
    console.error("Error during translation:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
