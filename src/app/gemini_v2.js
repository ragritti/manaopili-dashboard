const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI('AIzaSyATp46qkleE1t50wGTWLJA2lXQrO3oVQes')

export async function run(customerInput) {
    const model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash',
        systemInstruction: "hey gemini i will type in company name and i want you to give the basic details of the company such as size, industry, location. put these in a table. answer only these",
    })
    const generationConfig = {
        temperature: 0.5,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,

        responseMimeType: "text/plain",
    };
    const result = await model.generateContent({
        generationConfig,
        contents: [
            {
                role: 'user',
                parts: [
                    {
                        text: JSON.stringify(customerInput)
                    }
                ]
            }
        ]
    })
    console.log(result.response.text())
    return result.response.text()
}

