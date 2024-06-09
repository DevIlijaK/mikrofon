import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

export async function POST(request: Request) {
  const { language, text } = await request.json();
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You will be provided with a sentence. Your tasks are to: 
        - Detect the language of the sentance
        - Translate it into ${language}
        Do not return anything other than the translated sentence`,
      },
      {
        role: "user",
        content: text,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  return NextResponse.json({
    text: response.choices[0].message.content,
  });
}
