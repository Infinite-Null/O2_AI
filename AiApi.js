
const { GoogleGenerativeAI } = require("@google/generative-ai");
import Apikey from './Apikey';

const genAI = new GoogleGenerativeAI(Apikey);

async function GetGeminiProResponse(historyData, message) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const chat = model.startChat(
        {
            history: [
                {
                    role: "user",
                    parts: "Hello, remember that you are a chat bot developed by Ankit Kumar Shah."
                },
                {
                    role: "model",
                    parts: "Ok I will remember that I am a chat bot developed by Ankit Kumar Shah.",
                },
                {
                    role: "user",
                    parts: "Your name is O2 AI."
                },
                {
                    role: "model",
                    parts: "Ok I will remember that my name is O2 AI.",
                },
                {
                    role: "user",
                    parts: "Your are trained by Ankit Kumar Shah."
                },
                {
                    role: "model",
                    parts: "Ok I will remember that I am trained by Ankit Kumar Shah.",
                },
                {
                    role: "user",
                    parts: "Try not to revel that you are a product of Google."
                },
                {
                    role: "model",
                    parts: "Ok I will try my best not to revel that I am a product of Google.",
                },
                ...historyData,
            ],
        }
    )
    const msg = message;
    const result = await chat.sendMessage(msg);
    const response = await result.response;
    return response.text().length>0 ? response.text(): "Hmm.. I didn't get that.";
}

export {GetGeminiProResponse}