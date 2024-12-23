import Chat from "./_components/chat";

import { ChatProvider } from "./_contexts/chat";

export default function Home() {
  return (
    <ChatProvider>
      <div className="h-screen w-screen p-4">
        <Chat />
      </div>
    </ChatProvider>
  );
}
