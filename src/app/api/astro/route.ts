import { NextResponse } from "next/server";
import OpenAI from "openai";
import { RunCreateParams } from "openai/resources/beta/threads/runs/runs";
import { MessageCreateParams } from "openai/resources/beta/threads/messages.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});
const astroNelinda = "asst_ERajVnbpwDyjXk93jkYd1aqQ";
const nelindaThread = "thread_hYOQkpRjXqzoLhfvr3kxj2LQ";

export async function POST(request: Request) {
  const { question } = await request.json();
  const messageProba = await openai.beta.threads.messages.create(
    nelindaThread,
    {
      content: question,
      role: "user",
    } as MessageCreateParams
  );

  console.log("Message proba123: ", messageProba);
  var run = await openai.beta.threads.runs.create(nelindaThread, {
    assistant_id: astroNelinda,
  } as RunCreateParams);

  var message = null;
  while (true) {
    console.log("Run je: ", run.completed_at);
    run = await openai.beta.threads.runs.retrieve(nelindaThread, run.id);
    if (run.completed_at) {
      message = await openai.beta.threads.messages.list(nelindaThread);
      break;
    }
  }
  console.log("Message je: ", message);
  console.log("Message je: ", message.choices);
  console.log("Message je: ");
  console.log("Message je: ");
  return NextResponse.json({
    text: message?.data[0].content[0]?.text.value,
  });
}
