import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

// ================== Configuration du ENV ===================
dotenv.config();

// ================== Configuration de OPENAI ================
const configuration = new Configuration({
    // apiKey: process.env.OPENAI_API_KEY,
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// ================== Créer une application express ==========
const app = express();
app.use(cors());
app.use(express.json());

// ================ Créer des routes =========================
app.route('/')
.get(async (req, res) => {
    res.status(200).send({
        message: "Hello from lahatra3"
    });
})
.post(async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0.31,
            max_tokens: 3001,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0
        });
        res.status(200).send({
            response_data: response.data.choices[0].text
        });
    } catch (error) {
        res.status(500).send({error});
    }
});

app.listen(3131, () => console.log(`Server is running on http://localhost:3131`));