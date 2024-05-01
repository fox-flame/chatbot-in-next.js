import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import { ChatHistory } from "@/utils/shared";

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col gap-5 items-center max-w-4xl p-[10px]">
      <nav className="animate-in w-full flex items-center border-b border-b-foreground/10 h-16">
        <p>An AI-Powered Chat Bot - Ask me anything</p>
      </nav>
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
                {value.content}
              </div>
              <div></div>
            </div>
          );
        })}
      </div>

      <div className="animate-in w-full h-20 flex items-center pr-3 border rounded-xl relative">
        <textarea
          className="h-10 resize-none placeholder:text-gray-400 bg-transparent flex-1 py-2 pl-9 pr-3 focus:outline-none sm:text-sm"
          placeholder="Ask anything..."
        />
        <button
          className="h-16 hover:bg-foreground/10 w-24 border rounded-xl"
          disabled={false}
        >
          Send
        </button>
      </div>

      {/* <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3"></div> */}
    </div>
  );
}
