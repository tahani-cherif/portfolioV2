"use client";

import { useEffect, useState } from "react";

export default function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && text === word) {
      timer = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => i + 1);
      return;
    } else {
      timer = setTimeout(
        () =>
          setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? 40 : 80
      );
    }
    return () => clearTimeout(timer);
  }, [text, deleting, index, words]);

  return (
    <span>
      {text}
      <span className="cursor">&nbsp;</span>
    </span>
  );
}