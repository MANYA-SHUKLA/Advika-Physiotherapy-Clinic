// app/api/chatbot/route.ts
import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
    });

    return NextResponse.json({ reply: completion.choices[0].message });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
