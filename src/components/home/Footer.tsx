"use client";
import { useEffect, useState } from "react";

export default function Footer() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer
      id="contact"
      className="bg-background relative z-10 flex h-screen flex-col justify-between p-12"
    >
      <div className="flex items-start justify-between">
        <span className="font-serif text-2xl">ATLAS</span>
        <div className="text-accent flex gap-4 font-mono text-xs">
          <a href="#">TWITTER / X</a>
          <a href="#">GITHUB</a>
          <a href="#">LINKEDIN</a>
        </div>
      </div>

      <div className="text-center">
        <h2 className="fluid-heading hover:text-accent cursor-pointer font-serif leading-none transition-colors duration-500">
          <a href="mailto:hello@atlas.dev">SAY HELLO</a>
        </h2>
      </div>

      <div className="text-muted flex justify-between font-mono text-[10px] uppercase">
        <span>Based in Seattle</span>
        <span>Local Time: {time}</span>
        <span>© 2024</span>
      </div>
    </footer>
  );
}
