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
    const prompt = `You are a ${language} language translator. Given a phrase or sentence in english translate it to ${language} language exactly. There is no need for any extra information just the translation`
    const required = phrase
    const result = await model.generateContent([prompt, required])
    return result.response.text()
}