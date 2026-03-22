import React, { useEffect } from 'react';

const AIChatLayout = () => {
  // Inject Google Fonts on mount
  useEffect(() => {
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&family=Press+Start+2P&family=Source+Code+Pro:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div style={styles.container}>
      import React from "react";

      const AI_CHAT_URL = "https://sites.google.com/view/dominumnetworkv2/ai-chat"; // Change this to your preferred AI chat URL

      const CustomEmbed: React.FC = () => {
        return (
          <div style={{ width: "100%", height: "100vh", background: "#1c1c1c" }}>
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
  terminal: {
    fontFamily: "'Source Code Pro', monospace",
    color: '#00FF41', // Classic terminal green for the AI vibe
  },
  prompt: {
    marginRight: '10px',
  },
  cursor: {
    animation: 'blink 1s infinite',
  },
  footer: {
    marginTop: '30px',
  },
  button: {
    backgroundColor: 'rgba(249, 249, 249, 1)',
    color: 'rgba(28, 28, 28, 1)',
    border: 'none',
    padding: '12px 24px',
    fontSize: '12pt',
    fontWeight: '700',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'opacity 0.2s',
  }
};

export default AIChatLayout;