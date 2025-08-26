"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./thedoll.module.css";
import Doll from "@/components/Doll";
import Unmute from "@/components/Unmute"
import Mute from "@/components/Mute"

export default function TheDollPage() {
    const [active, setActive] = useState<"Cloud Catching" | "Bird in the Hand" | "wireBox"| "Flashback" | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [soundOn, setSoundOn] = useState(true);

    const handleImageClick = (song: "Cloud Catching" | "Bird in the Hand" | "wireBox" | "Flashback") => {
        if (active === song){
            const link = document.createElement("a");
            link.href = `/${song}.wav`
            link.download = song
            link.click()
        } else {
            setActive(song)
        }
    }

    const resetAll = () => setActive(null);

    useEffect(() =>{

        if (audioRef.current) {
            audioRef.current.muted = !soundOn;
            if (active) audioRef.current.play();
          }
        
        const handleClickOutside = (e: MouseEvent) => {
            if (!(e.target as HTMLElement).closest(".imageContainer")){
                resetAll()
            }
        };
        document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
    }, [active, soundOn]);

    return (
        <div className={styles.page}>

            {active != null && (
                <div className={styles.soundContainer} onClick={() => setSoundOn(prev => !prev)}>
                    <span>
                        {soundOn ? <Unmute/> : <Mute/>}
                    </span>
                </div>
            )}

            <main className={styles.main}>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <div className={styles.stage}>
                    <div className={`${styles.char} ${styles.ccContainer} ${active === "Cloud Catching" ? styles.active : ""}`}>
                        <Doll onClick={() => handleImageClick("Cloud Catching")}/>
                            {active === "Cloud Catching" && (
                                <div>
                                    <span className={styles.ccText}>
                                        Download Cloud Catching.wav
                                    </span>
                                    <audio ref={audioRef} src="/sounds/CC Sample.wav" loop/>
                                </div>
                            )}
                    </div>

                    <div className={`${styles.char} ${styles.bthContainer} ${active === "Bird in the Hand" ? styles.active : ""}`}>
                        <Doll onClick={() => handleImageClick("Bird in the Hand")}/>
                            {active === "Bird in the Hand" && (
                                <div>
                                    <span className={styles.bthText}>
                                        Download Bird in the Hand.wav
                                    </span>
                                    <audio ref={audioRef} src="/sounds/BTH Sample.wav" loop/>
                                </div>
                            )}
                    </div>

                    <div className={`${styles.char} ${styles.wbContainer} ${active === "wireBox" ? styles.active : ""}`}>
                        <Doll onClick={() => handleImageClick("wireBox")}/>
                            {active === "wireBox" && (
                                <div>
                                    <span className={styles.wbText}>
                                        Download wireBox.wav
                                    </span>
                                    <audio ref={audioRef} src="/sounds/WB Sample.wav" loop/>
                                </div>
                            )}
                    </div>

                    <div className={`${styles.char} ${styles.fbContainer} ${active === "Flashback" ? styles.active : ""}`}>
                        <Doll onClick={() => handleImageClick("Flashback")}/>
                            {active === "Flashback" && (
                                <div>
                                    <span className={styles.fbText}>
                                        Download Flashback.wav
                                    </span>
                                    <audio ref={audioRef} src="/sounds/FB Sample.wav" loop/>
                                </div>
                            )}
                    </div>
                </div>
            </main>
        </div>
    );
}