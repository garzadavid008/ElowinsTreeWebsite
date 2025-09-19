"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./stopmotion.module.css";
import Unmute from "@/components/Unmute"
import Mute from "@/components/Mute"
import { is } from "@/node_modules/@react-three/fiber/dist/declarations/src/core/utils";

export default function StopMotionPage() {
  const [isSideA, setIsSideA] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [soundOn, setSoundOn] = useState(false);

  const toggleSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    } 
  }

  const handleImageClick = () => {
    if (isSideA){
        const link = document.createElement("a");
        link.href = `/All Around You.wav`
        link.download = "All Around You"
        link.click()
    } 
}

  
  useEffect(() =>{
    if (audioRef.current) {
        audioRef.current.muted = !soundOn;
      }
}, [soundOn]);

  useEffect(() => {

  }, );

  return (
    <div>
      <div className={styles.soundContainer} 
        onClick={() => {
          setSoundOn(prev => !prev);
          toggleSound();
          }
        }
      >
        <span>
          {soundOn ? <Unmute/> : <Mute/>}
        </span>
        <audio ref={audioRef} src={isSideA ? `/sounds/OTKUTT Sample.mp3` : "/sounds/AAY Sample.mp3"} loop/>
      </div>

      <div className={isSideA ? styles.sideA : styles.sideB}>
        <Image
          src={isSideA ? "/side_a_bg.webp" : "/side_b_bg.png"}
          alt={isSideA ? "Side A Background" : "Side B Background"}
          fill
        />

        {/*Button to change to side b*/}
        <div className={styles.handleButton}>
          <button onClick={() => {
            setIsSideA(!isSideA);
            setSoundOn(false);
            } 
            }>
            <div className={styles.buttonOuter}>
              <div className={styles.buttonInner}>
                <span>{isSideA ? "Side B": "Side A"}</span>
              </div>
            </div>
          </button>
        </div> 
      
        <div className={styles.chatcontainer}>
          <h1>{isSideA ? `As they go down
              And as the leaves will
              Follow all around
              Do you remember
              The sun was down when you caught a glimpse of her
              Time will find you
              With colored hands and
              Nothing left to do
              The rain pours over
              Your melted skin makes every thing older
              And if you could
              If you would now
              And if you could
              If you would
              It will find you
              What was lost
              Under the ground
              The rain will rot
              There was nothing
              Maybe if you never stopped looking
              Could they forget you
              As you tried to let it out over the blue
              And if you could
              If you would now
              And if you could
              If you would
              It will find you
              What was lost
              Under the ground
              The rain will rot
              As they go
              They cant see why
              As they go
              They say goodbye
              As they go
              They wonder why
              They go
              It will find you
              What was lost
              Under the ground
              The rain will rot`: "IIIIIIIII"}
          </h1>
        </div>

          <div className={isSideA ? styles.kiteCharacter : styles.aayCharacter}>
            {isSideA ?
              <Image
              src="/characters/KITESPRITE.png"
              alt="Kite"
              width={500}
              height={800}
              style={{ width: '100%', maxWidth: '250px', height: 'auto' }}
              /> :
              <Image
              src="/characters/AroundFill.svg"
              alt="All Around You"
              width={500}
              height={800}
              style={{ width: '100%', maxWidth: '250px', height: 'auto' }}
              />
            } 
          </div>
      </div>
    </div>
  );
}
