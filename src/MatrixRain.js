import React, { useEffect, useRef } from "react";

export default function MatrixRain({ opacity = 0.05 }) {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Matrix characters
    const letters = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const fontSize = 20;
    let columns;
    let drops;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    }

    resize();
    window.addEventListener("resize", resize);

    function draw() {
      ctx.fillStyle = `rgba(16, 28, 38, 0.18)`; // dark background, fade out old chars
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = fontSize + "px monospace";
      ctx.fillStyle = `rgba(54, 255, 149, ${opacity})`; // neon green, low opacity

      for (let i = 0; i < columns; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [opacity]);

  return (
    <canvas
  ref={canvasRef}
  width={window.innerWidth}
  height={window.innerHeight}
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: -1, // <-- key line: keep the canvas behind everything!
    pointerEvents: "none", // <-- lets you click through it
    width: "100vw",
    height: "100vh",
    opacity: opacity ?? 1.25, // still use your desired low opacity!
    transition: "opacity 0.3s"
  }}
/>

  );
}
