import Image from "next/image";
import Link from "next/link";
import Doll from "@/components/Doll";
import Kevin from "@/components/Kevin";
import Robot from "@/components/Robot";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <div className={styles.elowinsContainer}>
          <span>Elowin&apos;s Tree</span>
          <div className={styles.rectangle}></div>
        </div>

        <div className={`${styles.robotChar}`}>
          <Link href="/ahhhh">
            <Robot/>
          </Link>
        </div>

        <div className={styles.dollKevContainer}>
          <div className={styles.dollChar}>
            <Link href="/thedoll">
                <Doll/>
            </Link>
          </div>

          <div className={styles.kevinChar}>
            <Link href="/side_ab">
              <Kevin/>
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
