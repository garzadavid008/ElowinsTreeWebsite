"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./side_ab.module.css";
import Unmute from "@/components/Unmute"
import Mute from "@/components/Mute"
import { is } from "@/node_modules/@react-three/fiber/dist/declarations/src/core/utils";

export default function SideABPage() {
  const [isSideA, setIsSideA] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [soundOn, setSoundOn] = useState(true);
  const [isCharSelected, setCharSelected] = useState(false)


  const handleDownload = () => {
    const confirmDownload = window.confirm(
      `Do you want to download ${isSideA ? "Over the Kite, Under the Tree" : "All Around You"}?`
    );
  
    if (!confirmDownload) return;
  
    const link = document.createElement("a");
    link.href = isSideA 
      ? "/Over the Kite, Under the Tree.wav" 
      : "/All Around You.wav";
    link.download = isSideA 
      ? "Over the Kite, Under the Tree" 
      : "All Around You";
    link.click();
  };

  
  useEffect(() =>{
    if (audioRef.current) {
        audioRef.current.muted = !soundOn;
      }
  }, [soundOn]);

  useEffect(() => {
    if (audioRef.current) {
      if (isCharSelected) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
    }
    }
  }, [isCharSelected]);

  return (
    <div>
      {isCharSelected != false && (
      <div className={styles.soundContainer} 
        onClick={() => {
          setSoundOn(prev => !prev);
          }
        }
      >
        <span>
          {soundOn ? <Unmute/> : <Mute/>}
        </span>
        <audio ref={audioRef} src={isSideA ? `/sounds/OTKUTT Sample.mp3` : "/sounds/AAY Sample.mp3"} loop/>
      </div>
      )}


      <div className={styles.page}>

        <div className={styles.noiseLayer}></div>
    
        </div>
        <Image
          src={isSideA ? "/side_a_bg.png" : "/side_b_bg.png"}
          alt={isSideA ? "Side A Background" : "Side B Background"}
          fill
        />

        {/*Button to change to side b*/}
        <div className={styles.handleButton}>
          <button onClick={() => {
            setIsSideA(!isSideA);
            setCharSelected(false)
            setSoundOn(true)
            }}>
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
              The rain will rot`
              : 
              `I find that you
              Look down at me again
              And every time I see you too
              
              And when you go
              There's nothing more to say
              I’ll have to wait another day
              
              If you remember
              
              But you’re leaving the fall now
              I wanna be
              Here in today, as far away, where you’ll be
              
              Without anything, you stay
              I fall away
              With nothing more for me to say to you
              
              Your broken trees
              A sign of you again
              Will you tell me when you leave
              
              Forever gone (Won’t you tell me why)
              And something you wont hold (The night can’t go on by)
              When everything keeps getting old (If you could only see my eyes)
              
              And if you wanna stay here forever
              
              But you’re leaving the fall now
              I wanna be
              Here in today, as far away, where you’ll be
              
              When you wake up sleeping
              Is there more to this
              You wake up dreaming
              Do you forgive
              
              Do you`}
          </h1>
        </div>

        {isCharSelected && (
          <div 
            className={styles.downloadContainer}
            onClick={() => {
              handleDownload()
            }} 
          >
            <span>{ isSideA ? "Download Over the Kite, Under the Tree.wav" : "Download All Around You.wav" }</span>
          </div>
        )}

          <div 
            className={`${isSideA ? styles.kiteCharacter : styles.aayCharacter}
                        ${isCharSelected ? (isSideA ? styles.kiteCharacterActive : styles.aayCharacterActive) : ""}`}
          >
            {isSideA ?
              <Image
              src= {isCharSelected ? "/characters/KiteColor.svg" : "/characters/KiteFill.svg"}
              alt="Kite"
              width={500}
              height={800}
              style={{ width: '100%', maxWidth: '250px', height: 'auto' }}
              onClick = {() => {
                {
                  setCharSelected(prev => !prev)
                }
              }}
              /> :
              <Image
              src={isCharSelected ? "/characters/AroundColor.png" : "/characters/AroundFill.svg"}
              alt="All Around You"
              width={500}
              height={800}
              style={{ width: '100%', maxWidth: '250px', height: 'auto' }}
              onClick = {() => {
                {
                  setCharSelected(prev => !prev)
                }
              }}
              />
            } 
          </div>
      </div>
  );
}
