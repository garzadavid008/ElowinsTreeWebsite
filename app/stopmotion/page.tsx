"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./stopmotion.module.css";

const frames: string[] = [
  "/frames/frame1.webp",
  "/frames/frame2.webp",
  "/frames/frame3.webp",
  "/frames/frame4.webp",
  "/frames/frame5.webp",
  "/frames/frame6.webp",
  "/frames/frame7.webp",
  "/frames/frame8.webp",
  "/frames/frame9.webp",
  "/frames/frame10.webp",
  "/frames/frame11.webp",
  "/frames/frame12.webp",
  "/frames/frame13.webp",
  "/frames/frame14.webp",
  "/frames/frame15.webp",
  "/frames/frame16.webp",
  "/frames/frame17.webp",
  "/frames/frame18.webp",
];
const FRAME_DURATION = 400; // ms

export default function StopMotionPage() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const frameRef = useRef(0);
  const lastTimeRef = useRef(0);
  
  // Preload frames
  useEffect(() => {
    let loadedCount = 0;
    frames.forEach((src) => {
      const imgEl = new window.Image();
      imgEl.src = src;
      imgEl.onload = () => {
        loadedCount++;
        if (loadedCount === frames.length) setLoaded(true);
      };
    });
  }, []);

  useEffect(() => {
    if (!loaded) return;

    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const elapsed = timestamp - lastTimeRef.current;

      if (elapsed >= FRAME_DURATION) {
        frameRef.current = (frameRef.current + 1) % frames.length;
        setCurrentFrame(frameRef.current);
        lastTimeRef.current = timestamp;
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [loaded]);

  return (
    <div className={styles.stopmotionBg}>
      {frames.map((src, idx) => (
        <div
          key={idx}
          className={styles.frame}
          style={{ opacity: idx === currentFrame ? 1 : 0 }}
        >
          <Image src={src} alt="" fill style={{ objectFit: "cover" }} priority  unoptimized/>
        </div>
      ))}
      <div className={styles.chatcontainer}>
        <h1>Over the Kite, Under the Tree Over the Kite, Under the Tree Over the Kite, Under the Tree Over the Kite, Under the Tree Over the Kite, Under the Tree  </h1>
      </div>
    </div>
  );
}
