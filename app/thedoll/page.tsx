import styles from "./page.module.css";
import Character1 from "@/components/Character1";

export default function TheDollPage() {
    return (
      <div className={styles.page}>
        <h1>The Doll Page</h1>
        <p>This is the record page for The Doll.</p>
        <div className={styles.characterContainer}>
         <Character1/>
        </div>
      </div>
    );
  }