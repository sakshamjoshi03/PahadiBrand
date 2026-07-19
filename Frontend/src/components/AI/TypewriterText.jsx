import { useEffect, useState } from "react";

export default function TypewriterText({
  text,
  speed = 40,
  delay = 0,
  className = "",
}) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      let index = 0;

      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, index + 1));
        index++;

        if (index >= text.length) {
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay]);

  return <p className={className}>{displayedText}</p>;
}