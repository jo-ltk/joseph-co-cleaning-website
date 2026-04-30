import Link from "next/link";
import styles from "./not-found.module.css";
import Navbar from "../components/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.description}>
          The page you are looking for does not exist or has been moved. Let's get you back to our standard of clean.
        </p>
        <Link href="/" className={styles.button}>
          Return to Home
        </Link>
      </main>
    </>
  );
}
