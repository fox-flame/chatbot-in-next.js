"use client";

import { ChatCompletionMessageParam } from "openai/resources";
import { useState, ChangeEvent } from "react";

interface IChatInput {
  handleGPTChat?: (
    ChatHistory: ChatCompletionMessageParam[]
  ) => Promise<string | null>;
  handleGeminiChat: (prompt: string) => Promise<string | null>;
}

const ChatInput = ({ handleGeminiChat }: IChatInput) => {
  const [ChatHistory, setChatHistory] = useState<ChatCompletionMessageParam[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleAIResponse = () => {
    if (content.length > 0) {
      setIsLoading(true);
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        {
          role: "user",
          content: content,
        },
      ]);
      handleGeminiChat(content).then((data) => {
        setChatHistory((prevChatHistory) => [
          ...prevChatHistory,
          {
            role: "assistant",
            content: data,
          },
        ]);
        setIsLoading(false);
      });

      setContent("");
    }
  };

  return (
    <>
      <div className="w-full max-h-[500px] flex-1 overflow-y-scroll">
        {ChatHistory.map((value, index) => {
          return (
            <div
              key={index}
              className={`flex gap-2 mb-6 ${
                value.role === "assistant" && "flex-row-reverse"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center ${
                  value.role === "user" ? "bg-orange-900" : "bg-indigo-900"
                }`}
              >
                {value.role === "user" ? "A" : "B"}
              </div>
              <div
                className={`w-10/12 rounded-xl ${
                  value.role === "user" ? "bg-zinc-900" : "bg-sky-950	"
                } p-3`}
              >
                {value?.content as string}
              </div>
              <div></div>
            </div>
          );
        })}
        {isLoading && (
          <div className={`animate-in flex gap-2 mb-6 flex-row-reverse`}>
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center bg-indigo-900`}
            >
              B
            </div>
            <div className={`w-10/12 rounded-xl bg-sky-950 p-3`}>Typing...</div>
          </div>
        )}
      </div>
      <div className="animate-in w-full h-20 flex items-center pr-3 border rounded-xl relative">
        <textarea
          onChange={handleChange}
          value={content}
          className="h-10 resize-none placeholder:text-gray-400 bg-transparent flex-1 py-2 pl-9 pr-3 focus:outline-none sm:text-sm"
          placeholder="Ask anything..."
        />
        <button
          className="h-16 hover:bg-foreground/10 w-24 border rounded-xl"
          disabled={false}
          onClick={handleAIResponse}
        >
          Send
        </button>
      </div>
    </>
  );
};

export default ChatInput;
