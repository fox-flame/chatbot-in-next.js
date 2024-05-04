import { ChatCompletionMessageParam } from "openai/resources";
import { useCallback } from "react";
import { fetchChatResults, fetchGeminiResults } from "./chatHistory.server";
import ChatInput from "./chatInput.client";

export default async function Index() {
  const handleGPTChat = useCallback(
    async (ChatHistory: ChatCompletionMessageParam[]) => {
      "use server";
      return await fetchChatResults(ChatHistory);
    },
    []
  );
  const handleGeminiChat = useCallback(async (prompt: string) => {
    "use server";
    return await fetchGeminiResults(prompt);
  }, []);

  return (
    <div className="flex-1 w-full flex flex-col gap-5 items-center max-w-4xl p-[10px]">
      <nav className="animate-in w-full flex items-center border-b border-b-foreground/10 h-16">
        <p>An AI-Powered Chat Bot - Ask me anything</p>
      </nav>

      <ChatInput
        handleGPTChat={handleGPTChat}
        handleGeminiChat={handleGeminiChat}
      />
      {/* <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3"></div> */}
    </div>
  );
}
