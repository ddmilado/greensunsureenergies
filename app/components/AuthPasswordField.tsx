"use client";

import { useState } from "react";
import { Eye, EyeSlash } from "@phosphor-icons/react";

export function AuthPasswordField({ isNew = false, errors }: { isNew?: boolean; errors?: string[] }) {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <label htmlFor="password">Password</label>
      <div className="auth-password">
        <input
          id="password"
          name="password"
          type={visible ? "text" : "password"}
          required
          minLength={isNew ? 8 : undefined}
          autoComplete={isNew ? "new-password" : "current-password"}
          aria-invalid={errors?.length ? true : undefined}
          aria-describedby={[isNew ? "password-hint" : "", errors?.length ? "password-error" : ""].filter(Boolean).join(" ") || undefined}
          className="form-field"
          placeholder={isNew ? "Create a password" : "Enter your password"}
        />
        <button type="button" className="auth-password-toggle" onClick={() => setVisible(!visible)} aria-label={visible ? "Hide password" : "Show password"} aria-pressed={visible}>
          {visible ? <EyeSlash size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
        </button>
      </div>
      {isNew && <p id="password-hint" className="auth-hint">At least 8 characters, including a letter and a number.</p>}
      {!!errors?.length && <ul id="password-error" className="auth-field-error">{errors.map(error => <li key={error}>{error}</li>)}</ul>}
    </div>
  );
}
