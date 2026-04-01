import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "../../../lib/prompts";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { emailText } = await req.json();

    if (!emailText) {
      return NextResponse.json({ error: "Email text is required" }, { status: 400 });
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Analyze this email:\n\n${emailText}` }
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.1, // Low temperature for factual extraction
    });

    const content = chatCompletion.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error("No content received from Groq");
    }

    return NextResponse.json(JSON.parse(content));
  } catch (error) {
    console.error("Error analyzing email:", error);
    return NextResponse.json({ error: "Failed to analyze email" }, { status: 500 });
  }
}
