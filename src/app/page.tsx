"use client";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState<string>();
  const [translation, setTranslation] = useState<string>();
  function handleOnRecord() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "sr-RS";

    // recognition.onresult = async function (event) {
    //   console.log(event);
    //   const transcript = event.results[0][0].transcript;
    //   setText(transcript);
    //   const response = await fetch("/api/translate", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       text: transcript,
    //       language: "da-DK",
    //     }),
    //   }).then((r) => r.json());

    recognition.onresult = async function (event) {
      console.log(event);
      const transcript = event.results[0][0].transcript;
      setText(transcript);
      const response = await fetch("/api/astro", {
        method: "POST",
        body: JSON.stringify({
          question: transcript,
        }),
      }).then((r) => r.json());

      setTranslation(response.text);
    };
    recognition.start();
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={handleOnRecord}>123</button>
      <p> Spoken text: {text}</p>
      <p> Spoken text: {translation}</p>
    </main>
  );
}
