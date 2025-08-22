
"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./side_ab.module.css";

export default function SideABPage() {
    const [active, setActive] = useState<"first" | "second" | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleImageClick = (song: "first" | "second") => {
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
                <div 
                    className={`imageContainer ${active === "first" ? "active" : ""}`} 
                    onClick={() => handleImageClick("first")}
                >
                    <Image
                        src="/Lucas1.jpg"
                        alt="Over the Kite, Under the Grass"
                        width={250}
                        height={325}
                    />
                    {active === "first" && (
                        <div>
                            <span className="infoBox">
                                Download Over the Kite, Under the Tree.wav
                            </span>
                            <audio ref={audioRef} src="/sounds/OTKUTT Sample.wav" loop/>
                        </div>
                    )}
                </div>

                <div 
                    className={`imageContainer ${active === "second" ? "active" : ""}`} 
                    onClick={() => handleImageClick("second")}
                >
                    <Image
                        src="/Lucas2.jpg"
                        alt="All Around You"
                        width={250}
                        height={325}
                    />
                    {active === "second" && (
                        <div>
                            <span className="infoBox">
                                Download All Around You.wav
                            </span>
                            <audio ref={audioRef} src="/sounds/AAY Sample.wav" loop/>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
  }