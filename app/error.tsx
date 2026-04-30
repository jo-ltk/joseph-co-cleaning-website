"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./error.module.css";
import Navbar from "../components/Navbar";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // We intentionally do not use console.error here as per production rules
  }, [error]);

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <div className={styles.errorCode}>Oops</div>
        <h1 className={styles.title}>Something went wrong</h1>
        <p className={styles.description}>
          We encountered an unexpected issue while loading this page. Our team has been notified.
        </p>
        <div className={styles.buttonContainer}>
          <button onClick={reset} className={styles.buttonPrimary}>
            Try Again
          </button>
          <Link href="/" className={styles.buttonSecondary}>
            Return to Home
          </Link>
        </div>
      </main>
    </>
  );
}
