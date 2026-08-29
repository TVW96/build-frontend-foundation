"use client";

import { signup } from "@/actions/auth";
import { initialSignupState, type SignupField } from "@/lib/definitions";
import Link from "next/link";
import { useActionState, useState } from "react";

import styles from "./account.module.css";

type FieldErrorProps = {
  errors?: string[];
  id: string;
};

function FieldError({ errors, id }: FieldErrorProps) {
  if (!errors?.length) return null;

  return (
    <ul className={styles.fieldErrors} id={id}>
      {errors.map((error) => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  );
}

export default function SignupForm() {
  const [state, action, pending] = useActionState(
    signup,
    initialSignupState,
  );
  const [showPassword, setShowPassword] = useState(false);

  const hasError = (field: SignupField) => Boolean(state.errors?.[field]);

  if (state.status === "success") {
    return (
      <section className={styles.successState} aria-live="polite">
        <span className={styles.successMark} aria-hidden="true">
          ✓
        </span>
        <p className={styles.formEyebrow}>Profile details complete</p>
        <h2>Nice to meet you, {state.values?.displayName}.</h2>
        <p>
          Your signup details passed validation. The final account will be
          created when the marketplace authentication service is connected.
        </p>
        <dl className={styles.accountPreview}>
          <div>
            <dt>Username</dt>
            <dd>@{state.values?.username}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{state.values?.email}</dd>
          </div>
        </dl>
        <Link className={styles.primaryAction} href="/shop">
          Explore the marketplace
        </Link>
      </section>
    );
  }

  return (
    <form className={styles.signupForm} action={action} noValidate>
      <header className={styles.formHeader}>
        <p className={styles.formEyebrow}>Free collector account</p>
        <h2 id="signup-heading">Create your profile</h2>
        <p>
          Keep your collection organized and make each listing feel personal.
        </p>
      </header>

      {state.message && (
        <div className={styles.formAlert} role="alert">
          <span aria-hidden="true">!</span>
          <p>{state.message}</p>
        </div>
      )}

      <div className={styles.fieldGrid}>
        <div className={styles.fieldGroup}>
          <label htmlFor="displayName">Display name</label>
          <input
            aria-describedby={
              hasError("displayName") ? "displayName-error" : undefined
            }
            aria-invalid={hasError("displayName")}
            autoComplete="name"
            defaultValue={state.values?.displayName}
            id="displayName"
            maxLength={120}
            name="displayName"
            placeholder="Mika Tanaka"
            required
          />
          <FieldError
            errors={state.errors?.displayName}
            id="displayName-error"
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="username">Username</label>
          <div className={styles.prefixedInput}>
            <span aria-hidden="true">@</span>
            <input
              aria-describedby={
                hasError("username") ? "username-error" : "username-hint"
              }
              aria-invalid={hasError("username")}
              autoCapitalize="none"
              autoComplete="username"
              defaultValue={state.values?.username}
              id="username"
              maxLength={50}
              name="username"
              placeholder="mikashelf"
              required
              spellCheck={false}
            />
          </div>
          <p className={styles.fieldHint} id="username-hint">
            Letters, numbers, and underscores only.
          </p>
          <FieldError errors={state.errors?.username} id="username-error" />
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="email">Email address</label>
        <input
          aria-describedby={hasError("email") ? "email-error" : undefined}
          aria-invalid={hasError("email")}
          autoCapitalize="none"
          autoComplete="email"
          defaultValue={state.values?.email}
          id="email"
          inputMode="email"
          name="email"
          placeholder="mika@example.com"
          required
          type="email"
        />
        <FieldError errors={state.errors?.email} id="email-error" />
      </div>

      <div className={styles.fieldGrid}>
        <div className={styles.fieldGroup}>
          <label htmlFor="password">Password</label>
          <input
            aria-describedby="password-hint password-error"
            aria-invalid={hasError("password")}
            autoComplete="new-password"
            id="password"
            minLength={8}
            name="password"
            required
            type={showPassword ? "text" : "password"}
          />
          <FieldError errors={state.errors?.password} id="password-error" />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            aria-describedby={
              hasError("confirmPassword")
                ? "confirmPassword-error"
                : undefined
            }
            aria-invalid={hasError("confirmPassword")}
            autoComplete="new-password"
            id="confirmPassword"
            minLength={8}
            name="confirmPassword"
            required
            type={showPassword ? "text" : "password"}
          />
          <FieldError
            errors={state.errors?.confirmPassword}
            id="confirmPassword-error"
          />
        </div>
      </div>

      <div className={styles.passwordMeta}>
        <p id="password-hint">
          Use 8+ characters with a letter, number, and symbol.
        </p>
        <label className={styles.showPassword}>
          <input
            checked={showPassword}
            onChange={(event) => setShowPassword(event.target.checked)}
            type="checkbox"
          />
          Show passwords
        </label>
      </div>

      <div className={styles.termsGroup}>
        <label>
          <input
            aria-describedby={
              hasError("acceptedTerms") ? "terms-error" : undefined
            }
            aria-invalid={hasError("acceptedTerms")}
            name="acceptedTerms"
            required
            type="checkbox"
          />
          <span>
            I agree to the Marketplace Terms and acknowledge the Privacy
            Policy.
          </span>
        </label>
        <FieldError
          errors={state.errors?.acceptedTerms}
          id="terms-error"
        />
      </div>

      <button className={styles.submitButton} disabled={pending} type="submit">
        <span>{pending ? "Checking your details…" : "Create my account"}</span>
        <span aria-hidden="true">→</span>
      </button>

      <p className={styles.securityNote}>
        Your password is validated securely and is never returned to this page.
      </p>
    </form>
  );
}
