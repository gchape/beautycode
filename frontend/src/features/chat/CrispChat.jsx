import { useEffect } from "react";

const CrispChat = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = import.meta.env.VITE_CRISP_WEBSITE_ID;

      const s = document.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = true;
      document.head.appendChild(s);
    }, 3000); // load after 3s

    return () => {
      clearTimeout(timer);
      document
        .querySelectorAll('script[src="https://client.crisp.chat/l.js"]')
        .forEach((s) => s.remove());
      delete window.$crisp;
      delete window.CRISP_WEBSITE_ID;
    };
  }, []);

  return null;
};

export default CrispChat;
