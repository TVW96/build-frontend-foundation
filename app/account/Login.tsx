import styles from "./account.module.css";
import Link from "next/link";

export default function Login() {
  return (
    <div className={styles.loginPrompt}>
      <span>Already have an account?</span>
      <Link className={styles.loginStatus} href="/login">
        Sign in
      </Link>
    </div>
  );
}
