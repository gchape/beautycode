import { useEffect } from "react";

const CrispChat = () => {
  useEffect(() => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = import.meta.env.VITE_CRISP_WEBSITE_ID;

    const d = document;
    const s = d.createElement("script");
    s.src = "https://client.crisp.chat/l.js";
    s.async = true;
    d.getElementsByTagName("head")[0].appendChild(s);

    return () => {
      const scripts = d.querySelectorAll(
        'script[src="https://client.crisp.chat/l.js"]',
      );
      scripts.forEach((script) => script.remove());
      delete window.$crisp;
      delete window.CRISP_WEBSITE_ID;
    };
  }, []);

  return null;
};

export default CrispChat;
