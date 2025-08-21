import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <div className={styles.pb}>
          <Link href="/ahhhh">
            <Image
              src="/pb_eyes.jpg"
              alt="PB"
              width={150}
              height={75}
              />
          </Link>
        </div>
        <h2>Elowin&apos;s Tree</h2>

        <div className={styles.ImageContainer}>
          <Link href="/thedoll">
          <Image
          src="/elowins_tree.png"
          alt="The Doll"
          width={250}
          height={250}
        />
          </Link>

        <Link href="/side_ab">
        <Image
          src="/side_ab.jpg"
          alt="Side A/B"
          width={250}
          height={250}
        />
        </Link>
        </div>
      </main>
    </div>
  );
}
