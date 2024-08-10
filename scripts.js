import dotenv from 'dotenv'
import express from 'express'
dotenv.config()
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

const port = 3003
const app = express()
app.use(express.static('public'))
app.use(express.json())

app.post('/info', async (req, res) => {
    const answer = await translate(req.body.first, req.body.second)
    res.send({answer: answer})
})


app.listen(port, function() {
    console.log(`Server is running at http://localhost:${port}`)
})

async function translate(phrase, language) {
    const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: phrase }],
          },
          {
            role: "model",
            parts: [{ text: `You are an experienced language translator 
                and you can translate various sentences 
                in different languages correctly, 
                give me just the answer to the translation and 
                how to pronounce the text, also add a comma to the 
                word before giving me the translation and 
                include the pronunciation in parenthesis, 
                do not add extra text` }],
          },
        ],
        generationConfig: {
            maxOutputTokens: 120,
            temperature: 0.5,
          },
      })
    const prompt = `Translate this ${phrase} in ${language}`
    const result = await chat.sendMessage(prompt)
    return result.response.text()
}