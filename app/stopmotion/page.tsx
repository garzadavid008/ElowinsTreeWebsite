"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./stopmotion.module.css";
import Unmute from "@/components/Unmute"
import Mute from "@/components/Mute"

export default function StopMotionPage() {

  
  useEffect(() => {

  }, []);

  useEffect(() => {

  }, );

  return (
    <div>
      <div className={styles.sideA}>
        <Image
          src="/Side_A_bg.png"
          alt="Side A Background"
          fill
        />

        {/* <div className={styles.button}>
          <button>
            <div className="button-outer">
              <div className="button-inner">
                <span>Side B</span>
              </div>
            </div>
          </button>
        </div> */}
      
        <div className={styles.chatcontainer}>
          <h1>{`As they go down
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
              The rain will rot`}
          </h1>
        </div>

        <div className={styles.character}>
          <Image
            src="/characters/KITESPRITE.png"
            alt="Kite"
            width={50}
            height={80}
            style={{ width: '100%', maxWidth: '250px', height: 'auto' }}
          />
        </div>
      </div>
    </div>
  );
}
