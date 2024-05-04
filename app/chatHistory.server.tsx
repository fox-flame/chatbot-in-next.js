"use server";

import OpenAI from "openai";
const { GoogleGenerativeAI } = require("@google/generative-ai");

import { ChatCompletionMessageParam } from "openai/resources";

const openai = new OpenAI({
  apiKey: process.env["NEXT_PUBLIC_OPEN_API_SECRET_KEY"],
  dangerouslyAllowBrowser: true,
});

export const fetchChatResults = async (
  ChatHistory: ChatCompletionMessageParam[]
) => {
  const completion = await openai.chat.completions.create({
    messages: ChatHistory,
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
};
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(
  process.env["NEXT_PUBLIC_GEMINI_SECRET_KEY"]
);

export async function fetchGeminiResults(prompt: string) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}
