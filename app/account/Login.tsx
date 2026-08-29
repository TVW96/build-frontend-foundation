import styles from "./account.module.css";

export default function Login() {
  return (
    <div className={styles.loginPrompt}>
      <span>Already have an account?</span>
      <span className={styles.loginStatus}>Sign in coming next</span>
    </div>
  );
}
