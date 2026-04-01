import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { emailText } = await req.json();

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Olet Cancellation Ninja. Analysoi teksti ja palauta VAIN puhdasta JSON-koodia. Rakenteen pitää olla: { \"subscriptions\": [{ \"name\": string, \"price\": string, \"period\": \"monthly\" | \"yearly\", \"cancelLink\": string }] }"
        },
        {
          role: "user",
          content: `Etsi tilaukset tästä tekstistä: ${emailText}`
        }
      ],
      model: "llama-3.3-70b-versatile", // Groqin nopein ja älykkäin malli
      response_format: { type: "json_object" },
    });

    const content = chatCompletion.choices[0]?.message?.content;
    return NextResponse.json(JSON.parse(content || "{}"));
  } catch (error) {
    return NextResponse.json({ error: "Analyysi epäonnistui" }, { status: 500 });
  }
}
