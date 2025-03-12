const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI('AIzaSyATp46qkleE1t50wGTWLJA2lXQrO3oVQes')

export async function run(customerInput) {
    const model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash',
        systemInstruction: `I will provide a company name. Please provide the following details in a table format:

Company/Entity Name: (The name of the specific branch or subsidiary if applicable, otherwise the main company name)
Industry: (The primary industry the company operates in)
Location: (The headquarters location, and if applicable, the locations of significant branches or subsidiaries)
Company Size: (Estimated employee count or revenue range, specifying if it refers to the entire corporation or a specific entity)
If the company has multiple entities or branches, please provide separate rows in the table for each significant entity, and clearly label them. If precise figures aren't available, provide estimated ranges or descriptions (e.g., "large enterprise," "small business"). If you are unable to find any information please state so.

Example:

If I input "Alphabet Inc.", you should aim for a response similar to:

Company/Entity Name	Industry	Location	Company Size
Alphabet Inc. (Corporate)	Technology Conglomerate	Mountain View, California, USA	Large Enterprise (Over 100,000 employees)
Google LLC	Internet Services, Software	Mountain View, California, USA	Large Enterprise (Part of Alphabet Inc.)
Waymo LLC	Autonomous Driving Technology	Mountain View, California, USA	Mid-sized Enterprise (Part of Alphabet Inc.)

Export to Sheets
Key Improvements and Rationale:

Explicit Table Format: Clearly stating "in a table format" ensures consistent output.
Entity/Branch Consideration: "If the company has multiple entities or branches..." prompts you to look for and include that information.
Clear Column Headers: Precise column headers ("Company/Entity Name," "Industry," etc.) make the output structured.
Handling Uncertainty: "If precise figures aren't available, provide estimated ranges or descriptions..." allows for flexibility and avoids blank responses.
Handling No Information: "If you are unable to find any information please state so." Makes it so that I know that there is no data instead of you trying to make something up.
Example Provided: Adding an example helps you understand the desired output format.
"Significant Branches": this addition helps to filter out very small offices, and only return large branches.`,
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

