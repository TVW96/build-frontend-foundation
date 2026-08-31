"use client";

import {
  deleteAccount,
  deleteAddress,
  saveAddress,
  updateBio,
  updateProfile,
} from "@/actions/account";
import type {
  AccountActionResult,
  AccountAddress,
  AccountUser,
} from "@/lib/account-types";
import { COUNTRY_OPTIONS, getCountryName } from "@/lib/countries";
import { useRouter } from "next/navigation";
import {
  type FormEvent,
  useEffect,
  useState,
  useTransition,
} from "react";

import styles from "./profile.module.css";

type ModalState =
  | { kind: "profile" }
  | { kind: "address"; address?: AccountAddress }
  | { kind: "delete-address"; address: AccountAddress }
  | { kind: "delete-account" }
  | null;

type ModalProps = {
  account: AccountUser;
  modal: Exclude<ModalState, null>;
  busy: boolean;
  result: AccountActionResult | null;
  onClose: () => void;
  onDeleteAccount: () => void;
  onDeleteAddress: (addressId: string) => void;
  onSubmit: (
    event: FormEvent<HTMLFormElement>,
    action: (formData: FormData) => Promise<AccountActionResult>,
  ) => void;
};

function FieldErrors({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <ul className={styles.fieldErrors}>
      {errors.map((error) => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  );
}

function AccountModal({
  account,
  modal,
  busy,
  result,
  onClose,
  onDeleteAccount,
  onDeleteAddress,
  onSubmit,
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !busy) onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [busy, onClose]);

  const isDestructive =
    modal.kind === "delete-address" || modal.kind === "delete-account";
  const title =
    modal.kind === "profile"
      ? "Edit profile"
      : modal.kind === "address"
        ? modal.address
          ? "Edit mailing address"
          : "Add mailing address"
        : modal.kind === "delete-address"
          ? "Remove this address?"
          : "Delete your account?";

  return (
    <div className={styles.modalBackdrop} role="presentation">
      <section
        aria-labelledby="account-modal-title"
        aria-modal="true"
        className={styles.modal}
        role="dialog"
      >
        <header className={styles.modalHeader}>
          <div>
            <p>{isDestructive ? "Please confirm" : "Account details"}</p>
            <h2 id="account-modal-title">{title}</h2>
          </div>
          <button
            aria-label="Close dialog"
            autoFocus
            className={styles.closeButton}
            disabled={busy}
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </header>

        {result && !result.ok && (
          <p className={styles.modalAlert} role="alert">
            {result.message}
          </p>
        )}

        {modal.kind === "profile" && (
          <form
            className={styles.modalForm}
            onSubmit={(event) => onSubmit(event, updateProfile)}
          >
            <div className={styles.fieldGroup}>
              <label htmlFor="profile-full-name">Full name</label>
              <input
                defaultValue={account.fullName}
                id="profile-full-name"
                maxLength={120}
                name="fullName"
                required
              />
              <FieldErrors errors={result?.errors?.fullName} />
            </div>
            <div className={styles.fieldGroup}>
              <label htmlFor="profile-username">Username</label>
              <div className={styles.usernameInput}>
                <span aria-hidden="true">@</span>
                <input
                  autoCapitalize="none"
                  defaultValue={account.username}
                  id="profile-username"
                  maxLength={50}
                  name="username"
                  required
                  spellCheck={false}
                />
              </div>
              <FieldErrors errors={result?.errors?.username} />
            </div>
            <div className={styles.fieldGroup}>
              <label htmlFor="profile-region">Region</label>
              <select
                defaultValue={account.region}
                id="profile-region"
                name="region"
                required
              >
                {COUNTRY_OPTIONS.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
              <FieldErrors errors={result?.errors?.region} />
            </div>
            <div className={styles.fieldGroup}>
              <label htmlFor="profile-avatar">Avatar image URL</label>
              <input
                defaultValue={account.avatarUrl ?? ""}
                id="profile-avatar"
                inputMode="url"
                maxLength={2048}
                name="avatarUrl"
                placeholder="https://example.com/avatar.jpg"
                type="url"
              />
              <p className={styles.fieldHint}>
                Leave blank to use your initials.
              </p>
              <FieldErrors errors={result?.errors?.avatarUrl} />
            </div>
            <ModalActions busy={busy} onClose={onClose} saveLabel="Save profile" />
          </form>
        )}

        {modal.kind === "address" && (
          <AddressForm
            address={modal.address}
            busy={busy}
            errors={result?.errors}
            onClose={onClose}
            onSubmit={(event) => onSubmit(event, saveAddress)}
          />
        )}

        {modal.kind === "delete-address" && (
          <div className={styles.confirmBody}>
            <p>
              <strong>{modal.address.label}</strong> will be removed from your
              saved mailing addresses. This cannot be undone.
            </p>
            <div className={styles.modalActions}>
              <button disabled={busy} onClick={onClose} type="button">
                Cancel
              </button>
              <button
                className={styles.dangerButton}
                disabled={busy}
                onClick={() => onDeleteAddress(modal.address.addressId)}
                type="button"
              >
                {busy ? "Removing…" : "Remove address"}
              </button>
            </div>
          </div>
        )}

        {modal.kind === "delete-account" && (
          <div className={styles.confirmBody}>
            <p>
              Your profile, saved addresses, sessions, listings, and inventory
              will be permanently deleted. This action cannot be undone.
            </p>
            <div className={styles.modalActions}>
              <button disabled={busy} onClick={onClose} type="button">
                Keep my account
              </button>
              <button
                className={styles.dangerButton}
                disabled={busy}
                onClick={onDeleteAccount}
                type="button"
              >
                {busy ? "Deleting…" : "Delete account"}
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function AddressForm({
  address,
  busy,
  errors,
  onClose,
  onSubmit,
}: {
  address?: AccountAddress;
  busy: boolean;
  errors?: Record<string, string[]>;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form className={styles.modalForm} onSubmit={onSubmit}>
      <input name="addressId" type="hidden" value={address?.addressId ?? ""} />
      <div className={styles.fieldGroup}>
        <label htmlFor="address-label">Address label</label>
        <input
          defaultValue={address?.label ?? ""}
          id="address-label"
          maxLength={60}
          name="label"
          placeholder="Home, studio, or work"
          required
        />
        <FieldErrors errors={errors?.label} />
      </div>
      <div className={styles.fieldGroup}>
        <label htmlFor="address-line-1">Address line 1</label>
        <input
          autoComplete="address-line1"
          defaultValue={address?.addressLine1 ?? ""}
          id="address-line-1"
          maxLength={255}
          name="addressLine1"
          required
        />
        <FieldErrors errors={errors?.addressLine1} />
      </div>
      <div className={styles.fieldGroup}>
        <label htmlFor="address-line-2">Address line 2</label>
        <input
          autoComplete="address-line2"
          defaultValue={address?.addressLine2 ?? ""}
          id="address-line-2"
          maxLength={255}
          name="addressLine2"
          placeholder="Apartment, suite, or unit (optional)"
        />
      </div>
      <div className={styles.fieldGrid}>
        <div className={styles.fieldGroup}>
          <label htmlFor="address-city">City</label>
          <input
            autoComplete="address-level2"
            defaultValue={address?.city ?? ""}
            id="address-city"
            maxLength={100}
            name="city"
          />
        </div>
        <div className={styles.fieldGroup}>
          <label htmlFor="address-area">State / province</label>
          <input
            autoComplete="address-level1"
            defaultValue={address?.administrativeArea ?? ""}
            id="address-area"
            maxLength={100}
            name="administrativeArea"
          />
        </div>
      </div>
      <div className={styles.fieldGrid}>
        <div className={styles.fieldGroup}>
          <label htmlFor="address-postal-code">Postal code</label>
          <input
            autoComplete="postal-code"
            defaultValue={address?.postalCode ?? ""}
            id="address-postal-code"
            maxLength={24}
            name="postalCode"
          />
        </div>
        <div className={styles.fieldGroup}>
          <label htmlFor="address-country">Country</label>
          <select
            autoComplete="country"
            defaultValue={address?.country ?? "US"}
            id="address-country"
            name="country"
          >
            {COUNTRY_OPTIONS.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <label className={styles.defaultCheck}>
        <input
          defaultChecked={address?.isDefault ?? false}
          name="isDefault"
          type="checkbox"
        />
        Make this my default mailing address
      </label>
      <ModalActions
        busy={busy}
        onClose={onClose}
        saveLabel={address ? "Save address" : "Add address"}
      />
    </form>
  );
}

function ModalActions({
  busy,
  onClose,
  saveLabel,
}: {
  busy: boolean;
  onClose: () => void;
  saveLabel: string;
}) {
  return (
    <div className={styles.modalActions}>
      <button disabled={busy} onClick={onClose} type="button">
        Cancel
      </button>
      <button className={styles.saveButton} disabled={busy} type="submit">
        {busy ? "Saving…" : saveLabel}
      </button>
    </div>
  );
}

export default function AccountDashboard({ account }: { account: AccountUser }) {
  const router = useRouter();
  const [modal, setModal] = useState<ModalState>(null);
  const [bioEditing, setBioEditing] = useState(false);
  const [bio, setBio] = useState(account.bio ?? "");
  const [result, setResult] = useState<AccountActionResult | null>(null);
  const [busy, startTransition] = useTransition();
  const initials = account.fullName
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const openModal = (nextModal: Exclude<ModalState, null>) => {
    setResult(null);
    setModal(nextModal);
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
    action: (formData: FormData) => Promise<AccountActionResult>,
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      const actionResult = await action(formData);
      setResult(actionResult);
      if (actionResult.ok) {
        setModal(null);
        router.refresh();
      }
    });
  };

  const handleBioSave = () => {
    startTransition(async () => {
      const actionResult = await updateBio(bio);
      setResult(actionResult);
      if (actionResult.ok) {
        setBioEditing(false);
        router.refresh();
      }
    });
  };

  const handleDeleteAddress = (addressId: string) => {
    startTransition(async () => {
      const actionResult = await deleteAddress(addressId);
      setResult(actionResult);
      if (actionResult.ok) {
        setModal(null);
        router.refresh();
      }
    });
  };

  const handleDeleteAccount = () => {
    startTransition(async () => {
      const actionResult = await deleteAccount();
      setResult(actionResult);
      if (actionResult.ok) {
        router.push("/signup");
        router.refresh();
      }
    });
  };

  return (
    <main className={styles.accountPage} id="main-content">
      <header className={styles.accountHero}>
        <div className={styles.heroInner}>
          <div
            aria-label={`${account.fullName}'s avatar`}
            className={styles.avatar}
            style={
              account.avatarUrl
                ? { backgroundImage: `url(${JSON.stringify(account.avatarUrl)})` }
                : undefined
            }
          >
            {!account.avatarUrl && initials}
          </div>
          <div className={styles.identity}>
            <p>Collector profile</p>
            <h1>{account.fullName}</h1>
            <div className={styles.identityMeta}>
              <span>@{account.username}</span>
              <span>{getCountryName(account.region)}</span>
              <span>
                Member since {new Date(account.createdAt).getFullYear()}
              </span>
            </div>
          </div>
          <button
            className={styles.heroEditButton}
            onClick={() => openModal({ kind: "profile" })}
            type="button"
          >
            <span aria-hidden="true">✎</span> Edit profile
          </button>
        </div>
      </header>

      <div className={styles.accountContent}>
        {result?.ok && (
          <p className={styles.pageNotice} role="status">
            <span aria-hidden="true">✓</span> {result.message}
          </p>
        )}

        <section className={styles.bioSection} aria-labelledby="bio-heading">
          <div className={styles.sectionHeading}>
            <div>
              <p>About this collector</p>
              <h2 id="bio-heading">Bio</h2>
            </div>
            {!bioEditing && (
              <button
                aria-label="Edit bio"
                className={styles.iconButton}
                onClick={() => {
                  setResult(null);
                  setBioEditing(true);
                }}
                type="button"
              >
                ✎
              </button>
            )}
          </div>

          {bioEditing ? (
            <div className={styles.bioEditor}>
              <label className={styles.visuallyHidden} htmlFor="account-bio">
                Profile bio
              </label>
              <textarea
                autoFocus
                id="account-bio"
                maxLength={600}
                onChange={(event) => setBio(event.target.value)}
                rows={6}
                value={bio}
              />
              <div className={styles.bioMeta}>
                <span>{bio.length} / 600</span>
                <div>
                  <button
                    disabled={busy}
                    onClick={() => {
                      setBio(account.bio ?? "");
                      setBioEditing(false);
                    }}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className={styles.saveButton}
                    disabled={busy}
                    onClick={handleBioSave}
                    type="button"
                  >
                    {busy ? "Saving…" : "Save bio"}
                  </button>
                </div>
              </div>
              {result && !result.ok && (
                <p className={styles.inlineError} role="alert">
                  {result.message}
                </p>
              )}
            </div>
          ) : (
            <p className={styles.bioCopy}>
              {account.bio ||
                "Tell other collectors what you read, collect, or hope to find next."}
            </p>
          )}
        </section>

        <section className={styles.detailsSection} aria-labelledby="details-heading">
          <div className={styles.sectionHeading}>
            <div>
              <p>Private account details</p>
              <h2 id="details-heading">Profile information</h2>
            </div>
            <button
              className={styles.textButton}
              onClick={() => openModal({ kind: "profile" })}
              type="button"
            >
              Edit details
            </button>
          </div>
          <dl className={styles.detailGrid}>
            <div>
              <dt>Full name</dt>
              <dd>{account.fullName}</dd>
            </div>
            <div>
              <dt>Username</dt>
              <dd>@{account.username}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{account.email}</dd>
            </div>
            <div>
              <dt>Region</dt>
              <dd>{getCountryName(account.region)}</dd>
            </div>
          </dl>
        </section>

        <section className={styles.addressSection} aria-labelledby="addresses-heading">
          <div className={styles.sectionHeading}>
            <div>
              <p>Shipping destinations</p>
              <h2 id="addresses-heading">Mailing addresses</h2>
            </div>
            <button
              className={styles.addButton}
              onClick={() => openModal({ kind: "address" })}
              type="button"
            >
              <span aria-hidden="true">＋</span> Add address
            </button>
          </div>

          {account.addresses.length ? (
            <div className={styles.addressGrid}>
              {account.addresses.map((address) => (
                <article className={styles.addressCard} key={address.addressId}>
                  <header>
                    <div>
                      <h3>{address.label}</h3>
                      {address.isDefault && <span>Default</span>}
                    </div>
                    <div className={styles.cardActions}>
                      <button
                        aria-label={`Edit ${address.label}`}
                        onClick={() => openModal({ kind: "address", address })}
                        type="button"
                      >
                        Edit
                      </button>
                      <button
                        aria-label={`Delete ${address.label}`}
                        onClick={() =>
                          openModal({ kind: "delete-address", address })
                        }
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </header>
                  <address>
                    {address.addressLine1}
                    {address.addressLine2 && <>, {address.addressLine2}</>}
                    {(address.city || address.administrativeArea) && <br />}
                    {[address.city, address.administrativeArea, address.postalCode]
                      .filter(Boolean)
                      .join(", ")}
                    <br />
                    {getCountryName(address.country)}
                  </address>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <span aria-hidden="true">⌂</span>
              <h3>No mailing addresses yet</h3>
              <p>Add one when you are ready to buy, sell, or trade.</p>
            </div>
          )}
        </section>

        <section className={styles.dangerZone} aria-labelledby="danger-heading">
          <div>
            <p>Permanent action</p>
            <h2 id="danger-heading">Delete account</h2>
            <span>
              Permanently remove your profile and all associated information.
            </span>
          </div>
          <button
            onClick={() => openModal({ kind: "delete-account" })}
            type="button"
          >
            Delete account
          </button>
        </section>
      </div>

      {modal && (
        <AccountModal
          account={account}
          busy={busy}
          modal={modal}
          onClose={() => setModal(null)}
          onDeleteAccount={handleDeleteAccount}
          onDeleteAddress={handleDeleteAddress}
          onSubmit={handleSubmit}
          result={result}
        />
      )}
    </main>
  );
}
