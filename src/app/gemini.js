const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI('AIzaSyATp46qkleE1t50wGTWLJA2lXQrO3oVQes')

export async function run(customerInput) {
    const model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash',
        systemInstruction: "Mana’o Pili AI Input Template\n1. Output Instructions\nCreate an output document based on the parameters in this document, and the\nclient specific scores specified in the user request. Client Provided Scores. The output\ndocument is a Maturity Assessment recommendation (based on the CMMI model)\nthat leverages recommendations from ITIL v4 and ServiceNow Best Practices. The\noutput should be actionable, measurable, and provide guidance on\nrecommendation execution.\n2. Introduction\nThe purpose of this template is to generate the Digital Transformation in Place (a.k.a\nDigital Trip) output documents for customers who complete the survey on the\nMana’o Pili web site (www.manaopili.com/survey). The Digital Trip survey is an\nassessment of maturity, based on separate aspects of People, Process, and\nTechnology, for the customer’s adoption and effective utilization of ServiceNow\nbuilt-in processes. Special focus should be given on utilization of specific\nServiceNow modules and how these modules can be used to accelerate client’s\nmaturity score.\n• Include the date of when the output was generated in the header of the\ndocument.\n• The output should between 8000 and 10000 characters\n• Emphasis throughout the document how Mana’o Pili’s Digital Transformation\nin Place (Digital Trip) Service Offering can provide cost effective and rapid\nrealization of Digital Transformation objectives leveraging existing\nServiceNow licensing already owned by the client.\n• Recommendations should focus on utilization and improvement of modules\nwith lower scores, and less emphasis on modules with higher scores.\nDegree of recommendation should be based on the scores provided by the\ncustomer in section 5.\ni. Modules with scores of 0 assumes the module has not been\nimplemented\nii. Modules with scores of 1 assumes the module has been minimally\nimplemented\niii. Modules with scores of 2 assumes the module has been implemented\nwith some client specific alignment\niv. Modules with scores of 3 assumes the modules has been\nimplemented and refine with client specific alignment and actively\nmanaged with relevant KPIs.\nv. Modules with scores of 4 assumes the modules are actively managed,\nperiodically reviewed, audited for compliance, and adjusted to meet\nthe needs of dynamic client objectives.\nvi. Modules with scores of 5 assumes the modules have advanced\nmachine intelligence and AI capabilities to dynamically adjust to\ncustomer behaviors and environment.\n• Provide specific KPIs for each module the customer should be establishing\nand tracking\n• List specific roles that should be identified for each module to support\n• At the beginning of the document, create an Executive Summary of 1,000\ncharacters or less highlighting the overall analysis and recommendations.\n3. Model Input\nEvaluation should be provided for the following ServiceNow IT Service Management\nfunctions taking into account the individual People, Process, and Technology Scores\nprovided by the client:\nITSM Standard Modules\n• Incident Management\n• Service Request Management\n• Problem Management\n• Change Management\n• Release Management\n• Cost Management\n• Asset Management\n• Walk-up Experience\n• Digital Portfolio Management\n• Universal Request\nITSM Professional Modules\n• Performance Analytics\n• Digital Product Release\n• Virtual Agent\n• Predictive Intelligence\n• Continual Improvement\n• Vendor Manager Workspace\n• Mobile Publishing\n• DevOps Change Velocity\n• DevOps Configuration\nITSM Enterprise Modules\n• Workspace Optimization\n• Process Mining\n• App Engine Starter\nModel input is based on Capability Maturity Model (CMMI Model) from 0 to 5.\n4. Model Output\n• Output Title: Digital Trip Technology Workflows (Tx) ITSM for [Customer\nName]\n• For each process module, identify the top 3 best practices of the ServiceNow\nProduct Line for each process and provide recommendations for the\ncustomer. Recommendations should consider separate recommendations\nfor People/Resources, Processes and ServiceNow recommendations on\nimplementation of non-utilized or underutilized functions.\ni. For each best practice, identify three prescriptive activities the\ncustomer can implement to achieve higher levels of maturity.\n• Recommendations should highlight specific ServiceNow modules that\nshould be implemented or enhanced.\n• Provide a summary for each process\n• Provide a short-term roadmap (next 3 months)\n• Provide an abbreviated 12-month roadmap\n• At the footer of the document, refer the customers to the Mana’o Pili website\nor info@manaopili.com for follow-up, questions, or next steps,\n5. Customer Provided Scores: Scores are provided in user request. Focus on providing a concise overview and prioritize impactful recommendations, staying within the requested character count limit. Concentrate on the modules with the lowest scores and their potential for improvement, summarizing other sections to fit the content within the 8000-10000 character range.\n\n\n make the response alligned properly and easy on the eyes do not respond like an ai just show the output in a way that is easy to read and understand.",
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

