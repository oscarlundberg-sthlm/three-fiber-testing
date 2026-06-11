import * as React from "react";

export default function MouseClickToKey({
  keyCode,
  children,
}: {
  keyCode: string;
  children: React.ReactNode;
}) {
  const pointerDownHandler = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return; // left button only
    const keydownEvent = new KeyboardEvent("keydown", {
      code: keyCode, // e.g., "Space" or "KeyA"
      key: keyFromCode(keyCode), // helps libs that read `key` not `code`
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(keydownEvent);
  };

  const pointerUpHandler = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return;
    const keyupEvent = new KeyboardEvent("keyup", {
      code: keyCode,
      key: keyFromCode(keyCode),
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(keyupEvent);
  };

  return (
    <button
      type="button"
      onPointerDown={pointerDownHandler}
      onPointerUp={pointerUpHandler}
      className="pointer-events-auto focus:outline-none focus:ring-0 select-none touch-none no-callout"
    >
      {children}
    </button>
  );
}

// tiny helper so "Space" maps to " " and "KeyA" -> "a"
function keyFromCode(code: string) {
  if (code === "Space") return " ";
  const m = code.match(/^Key([A-Z])$/);
  return m ? m[1].toLowerCase() : code;
}
