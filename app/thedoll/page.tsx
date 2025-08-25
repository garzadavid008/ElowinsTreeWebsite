"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./thedoll.module.css";
import Doll from "@/components/Doll";

export default function TheDollPage() {
    const [active, setActive] = useState<"first" | "second" | "third"| "fourth" | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleImageClick = (song: "first" | "second" | "third" | "fourth") => {
        if (active === song){
            const link = document.createElement("a");
            
            switch (song) {
                case "first":
                  link.href = "/Cloud Catching.wav";
                  link.download = "Cloud Catching";
                  break;
                case "second":
                  link.href = "/Bird in the Hand.wav";
                  link.download = "Bird in the Hand";
                  break;
                case "third":
                  link.href = "/wireBox.wav";
                  link.download = "wireBox";
                  break;
                case "fourth":
                  link.href = "/Flashback.wav";
                  link.download = "Flashback";
                  break;
                default:
                  console.warn("Unknown song choice:", song);
              }
            link.click()
        } else {
            setActive(song)
        }
    }
    const resetAll = () => setActive(null);

    useEffect(() =>{
        if (active && audioRef.current){
            audioRef.current.volume = 0.4;
            audioRef.current.play()
        }

        const handleClickOutside = (e: MouseEvent) => {
            if (!(e.target as HTMLElement).closest(".imageContainer")){
                resetAll()
            }
        };
        document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
    }, [active]);

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <div className={`${styles.ccContainer} ${active === "first" ? styles.active : ""}`}>
                    <Doll onClick={() => handleImageClick("first")}/>
                        {active === "first" && (
                            <div>
                                <span className={styles.ccText}>
                                    Download Cloud Catching.wav
                                </span>
                                <audio ref={audioRef} src="/sounds/OTKUTT Sample.wav" loop/>
                            </div>
                        )}
                </div>

                <div className={`${styles.bthContainer} ${active === "second" ? styles.active : ""}`}>
                    <Doll onClick={() => handleImageClick("second")}/>
                        {active === "second" && (
                            <div>
                                <span className={styles.bthText}>
                                    Download Bird in the Hand.wav
                                </span>
                                <audio ref={audioRef} src="/sounds/OTKUTT Sample.wav" loop/>
                            </div>
                        )}
                </div>

                <div className={`${styles.wbContainer} ${active === "third" ? styles.active : ""}`}>
                    <Doll onClick={() => handleImageClick("third")}/>
                        {active === "third" && (
                            <div>
                                <span className={styles.wbText}>
                                    Download wireBox.wav
                                </span>
                                <audio ref={audioRef} src="/sounds/OTKUTT Sample.wav" loop/>
                            </div>
                        )}
                </div>
            </main>
        </div>
    );
}