import { useEffect } from "react";

const TawkToChat = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://embed.tawk.to/${
      import.meta.env.VITE_TAWK_TO_PROPERTY_ID
    }/1is5g394b`;
    script.async = true;
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default TawkToChat;
