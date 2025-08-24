
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
            link.href = song === "first" ? "/Over the Kite, Under the Tree.wav" : "/All Around You.wav";
            link.download = song === "first" ? "Over the Kite, Under the Tree" : "All Around You";
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
                <div 
                    className={`imageContainer ${active === "first" ? "active" : ""}`} 
                    onClick={() => handleImageClick("first")}
                >
                    <div className={styles.ccContainer}>
                        <Doll/>
                    </div>
                    {active === "first" && (
                        <div>
                            <span className="infoBox">
                                Download Cloud Catching.wav
                            </span>
                            <audio ref={audioRef} src="/sounds/OTKUTT Sample.wav" loop/>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
  }