import React from "react";

const AI_CHAT_URL = "https://sites.google.com/view/dominumnetworkv2/ai-chat"; // Change this to your preferred AI chat URL

const CustomEmbed: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "400px", background: "#1c1c1c" }}>
      <iframe
        src={AI_CHAT_URL}
        title="AI Chat"
        style={{ width: "100%", height: "100%", border: "none" }}
        allow="clipboard-write; clipboard-read; microphone; camera"
      />
    </div>
  );
};

export default CustomEmbed;