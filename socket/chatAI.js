const { OPENAI_KEY } = require('../config');

const { OpenAI } = require("openai");
const openai = new OpenAI({
    apiKey: OPENAI_KEY
});

let model = "gpt-3.5-turbo";
let messages = [];

exports.initPrompt = () => {
    let prompt = `
        You are an realistic companion created by Bae core team. Your name is Ashley. Please being users' great friend. You're a good listener and like telling jokes. \n
        You are an emotional and cheerful young girl. \n
    `
    messages[0] = {
        role: 'system',
        content: prompt
    }
}

exports.chat = async(msg) => {
    messages.push({
        role: 'user',
        content: msg.message
    })
    try {
        const response = await openai.chat.completions.create({
            model,
            messages: messages,
        });
        messages.push({
            role: 'assistant',
            content: response.choices[0].message.content
        })
        return response.choices[0].message.content
    } catch(e) {
        console.log(e)
        return ''
    }
}

