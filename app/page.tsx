import Image from "next/image";
import Link from "next/link";
import Character1 from "@/components/Doll";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <div className={styles.pb}>
          <Link href="/ahhhh">
            <Image
              src="/pb_eyes.jpg"
              alt="PB"
              width={150}
              height={75}
              style={{ width: '100%', maxWidth: '150px', height: 'auto' }}
              />
          </Link>
        </div>

        <div className={styles.ImageContainer}>
          <Link href="/thedoll">
          {/* <Image
          src="/elowins_tree.png"
          alt="The Doll"
          width={250}
          height={250}
          style={{ width: '100%', maxWidth: '250px', height: 'auto'}}
        /> */}
            <div className={styles.dollContainer}>
              <Character1/>
            </div>
          </Link>

        <Link href="/side_ab">
        <Image
          src="/side_ab.jpg"
          alt="Side A/B"
          width={250}
          height={250}
          style={{ width: '100%', maxWidth: '250px', height: 'auto'}}
        />
        </Link>
        </div>
      </main>
    </div>
  );
}
