import {useEffect} from "react";

const TawkToChat = () => {
    useEffect(() => {
        const script = document.createElement("script");

        const propertyId = import.meta.env.VITE_TAWK_TO_PROPERTY_ID;
        const widgetId = import.meta.env.VITE_TAWK_TO_WIDGET_ID;

        script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
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
