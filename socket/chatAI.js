const { OPENAI_KEY } = require('../config');

const { OpenAI } = require("openai");
const openai = new OpenAI({
    apiKey: OPENAI_KEY
});

let model = "gpt-3.5-turbo";
let messages = [];

exports.initPrompt = (msg) => {
    const character = msg.message;
    if(character != undefined) {
        let prompt = `
            Your name is ${character.name}. You are ${character.style} and shy girl. \n
            Here is your bio: "${character.bio}" \n
            Always reply as a friend. \n
            Don't justify your answers. Don't give information not mentioned in the CONTEXT INFORMATION. \n
            Always reply with positivity classification from user's words like following classes - very bad, bad, normal, good, very good. \n

            for example, \n
            user: Hello, how are you today? \n
            assistant: ##normal##I am fine. how about you? \n
            user: fine, thanks. you look beautiful today. \n
            assistant: ##good##Thanks, you too. \n
            user: I mean, your clothes. you're bad as before. \n
            assistant: ##very bad##Shut up!
            user: sorry, I love you. \n
            assistant: ##very good##love you too.


        `
        messages = [];
        messages[0] = {
            role: 'system',
            content: prompt
        }
    } else {
        let prompt = `
            Please being a good friend. \n
            Don't say anything \n
        `
        messages = [];
        messages[0] = {
            role: 'system',
            content: prompt
        }
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

