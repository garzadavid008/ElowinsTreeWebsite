import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Doll from "@/components/Doll";
import Kevin from "@/components/Kevin";
import Robot from "@/components/Robot";
import styles from "./page.module.css";

export default function Home() {
  return (
    
    <div className={styles.page}>
      <main className={styles.main}>

        <div className={styles.elowinsContainer}>
          <span>Elowin&apos;s Tree</span>
          <div className={styles.rectangle}></div>
        </div>

        {/* <div className={`${styles.robotChar}`}>
          <Link href="/ahhhh">
            <Robot/>
          </Link>
        </div> */}

        <div className={styles.dollKevContainer}>
          <div className={styles.dollChar}>
            <Link href="/thedoll">
            <Image
              src="/characters/DollColor.png"
              alt="Doll"
              width={200} 
              height={200}  
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
  
            </Link>
          </div>

          <div className={styles.kevinChar}>
            <Link href="/side_ab">
              <Image
                src="/characters/KevinColor.png"
                alt="Kevin"
                width={200} 
                height={200}  
                style={{ width: "70%", height: "auto", objectFit: "contain" }}
              />
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
