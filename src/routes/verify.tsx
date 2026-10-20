import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { useRef, useState, type ClipboardEvent, type FormEvent } from "react";

export const Route = createFileRoute("/verify")({
  head: () => ({
    meta: [
      { title: "Your account — One2Many Safety" },
      {
        name: "description",
        content:
          "Sign in or create a One2Many account. Your safety, your choice.",
      },
      { property: "og:title", content: "Your account — One2Many Safety" },
      {
        property: "og:description",
        content: "Discreet, privacy-first support for your next step.",
      },
    ],
  }),
  component: Auth,
});

type AuthStep = "login" | "register" | "forgot" | "verify" | "new-password" | "complete";
type AuthIntent = "login" | "register" | "reset";

function Auth() {
  const [step, setStep] = useState<AuthStep>("login");
  const [intent, setIntent] = useState<AuthIntent>("login");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const codeInputs = useRef<Array<HTMLInputElement | null>>([]);

  function startAuth(nextStep: "login" | "register" | "forgot") {
    setError("");
    setNotice("");
    setStep(nextStep);
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    if (nextStep !== "register") {
      setFullName("");
      setPhone("");
    }
    if (nextStep === "login" || nextStep === "register") setIntent(nextStep);
  }

  function submitDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setCode(["", "", "", "", "", ""]);

    if (step === "register" && password !== confirmPassword) {
      setError("Those passwords don't match. Please try again.");
      return;
    }
    if (step === "register" && !fullName.trim()) {
      setError("Enter your full name to continue.");
      return;
    }
    if (step === "register" && !phone.trim()) {
      setError("Enter a phone number to continue.");
      return;
    }

    setPassword("");
    setConfirmPassword("");
    setFullName("");
    setPhone("");
    setShowPassword(false);
    setIntent(step === "forgot" ? "reset" : step === "register" ? "register" : "login");
    setStep("verify");
  }

  function submitCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (code.some((digit) => !digit)) {
      setError("Enter all 6 digits to continue.");
      return;
    }
    setStep(intent === "reset" ? "new-password" : "complete");
  }

  function submitNewPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Use at least 8 characters for your new password.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Those passwords don't match. Please try again.");
      return;
    }
    setStep("login");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setNotice("Password reset preview complete. Connect a secure account service to save it.");
  }

  function updateCode(index: number, value: string) {
    const digits = value.replace(/\D/g, "").slice(0, code.length - index);
    if (digits.length > 1) {
      setCode((current) => current.map((digit, itemIndex) => (
        itemIndex >= index && itemIndex < index + digits.length
          ? digits.charAt(itemIndex - index)
          : digit
      )));
      codeInputs.current[Math.min(index + digits.length, code.length - 1)]?.focus();
      return;
    }
    setCode((current) => current.map((digit, itemIndex) => itemIndex === index ? digits : digit));
    if (digits && index < codeInputs.current.length - 1) codeInputs.current[index + 1]?.focus();
  }

  function handleCodeKeyDown(index: number, key: string) {
    if (key === "Backspace" && !code[index] && index > 0) {
      codeInputs.current[index - 1]?.focus();
    }
  }

  function handleCodePaste(event: ClipboardEvent<HTMLDivElement>) {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    event.preventDefault();
    setCode(Array.from({ length: 6 }, (_, index) => pasted[index] ?? ""));
    codeInputs.current[Math.min(pasted.length, 5)]?.focus();
  }

  const stepCopy: Record<AuthStep, { eyebrow: string; title: string; detail: string }> = {
    login: {
      eyebrow: "WELCOME BACK",
      title: "A safe space, on your terms.",
      detail: "Sign in to continue. You can still reach support without an account.",
    },
    register: {
      eyebrow: "CREATE YOUR ACCOUNT",
      title: "Start with what feels right.",
      detail: "Only share what you feel comfortable sharing.",
    },
    forgot: {
      eyebrow: "ACCOUNT RECOVERY",
      title: "Let's get you back in.",
      detail: "Enter your email and we'll guide you through a password reset.",
    },
    verify: {
      eyebrow: "EMAIL VERIFICATION",
      title: "Check it's really you.",
      detail: `A 6-digit code would be sent to ${email}. In this preview, enter any 6 digits to continue.`,
    },
    "new-password": {
      eyebrow: "ACCOUNT RECOVERY",
      title: "Choose a new password.",
      detail: "Make it at least 8 characters and keep it somewhere safe.",
    },
    complete: {
      eyebrow: "YOUR NEXT STEP",
      title: intent === "register" ? "Registration preview complete." : "Sign-in preview complete.",
      detail: "This is a preview. Connect an authentication service to activate your account.",
    },
  };
  const copy = stepCopy[step];
  const isPasswordStep = step === "login" || step === "register" || step === "new-password";

  return (
    <div className="auth-screen">
      <header className="auth-header">
        <Link to="/" className="brand-lockup" aria-label="One2Many home">
          <span className="brand-mark" aria-hidden="true"><span>2</span></span>
          <span className="brand-name">one2many</span>
        </Link>
        <Link to="/" className="auth-exit" aria-label="Back to home">
          <ArrowLeft size={16} />
          <span>Back to safety tools</span>
        </Link>
      </header>

      <main className="auth-content">
        <div className="auth-intro">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p className="auth-intro-detail">{copy.detail}</p>
        </div>

        <section className="auth-card" aria-label="Account access">
          {step === "login" && (
            <div className="auth-tabs" role="group" aria-label="Account access options">
              <button
                type="button"
                aria-pressed="true"
                className="auth-tab auth-tab-active"
              >
                Sign in
              </button>
              <button
                type="button"
                aria-pressed="false"
                className="auth-tab"
                onClick={() => startAuth("register")}
              >
                Create account
              </button>
            </div>
          )}

          {step === "register" && (
            <div className="auth-tabs" role="group" aria-label="Account access options">
              <button type="button" aria-pressed="false" className="auth-tab" onClick={() => startAuth("login")}>
                Sign in
              </button>
              <button type="button" aria-pressed="true" className="auth-tab auth-tab-active">
                Create account
              </button>
            </div>
          )}

          {notice && <p className="auth-notice" role="status">{notice}</p>}
          {error && <p className="auth-error" role="alert">{error}</p>}

          {(step === "login" || step === "register" || step === "forgot") && (
            <form className="auth-form" onSubmit={submitDetails}>
              {step === "register" && (
                <>
                  <label className="auth-field">
                    <span>Full name</span>
                    <input
                      name="name"
                      autoComplete="name"
                      required
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      placeholder="Your full name"
                    />
                  </label>
                  <label className="auth-field">
                    <span>Phone number</span>
                    <input
                      name="tel"
                      type="tel"
                      autoComplete="tel"
                      required
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="+27 00 000 0000"
                    />
                  </label>
                </>
              )}

              <label className="auth-field">
                <span>Email address</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                />
              </label>

              {step !== "forgot" && (
                <>
                  <label className="auth-field">
                    <span>{step === "register" ? "Create password" : "Password"}</span>
                    <span className="auth-password-wrap">
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete={step === "register" ? "new-password" : "current-password"}
                        minLength={8}
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="At least 8 characters"
                      />
                      <button
                        type="button"
                        className="auth-password-toggle"
                        onClick={() => setShowPassword((visible) => !visible)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </span>
                  </label>
                  {step === "register" && (
                    <label className="auth-field">
                      <span>Confirm password</span>
                      <input
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        minLength={8}
                        required
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        placeholder="Enter your password again"
                      />
                    </label>
                  )}
                </>
              )}

              {step === "login" && (
                <button type="button" className="auth-text-button auth-forgot" onClick={() => startAuth("forgot")}>
                  Forgot password?
                </button>
              )}

              <button type="submit" className="auth-primary-button">
                {step === "register" ? "Create account" : step === "forgot" ? "Continue" : "Sign in"}
              </button>
            </form>
          )}

          {step === "verify" && (
            <form className="auth-form" onSubmit={submitCode}>
              <div className="auth-otp" onPaste={handleCodePaste}>
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(element) => { codeInputs.current[index] = element; }}
                    inputMode="numeric"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    maxLength={1}
                    pattern="[0-9]"
                    aria-label={`Verification code digit ${index + 1}`}
                    value={digit}
                    onChange={(event) => updateCode(index, event.target.value)}
                    onKeyDown={(event) => handleCodeKeyDown(index, event.key)}
                  />
                ))}
              </div>
              <p className="auth-helper">You can paste a 6-digit code into any box.</p>
              <button type="submit" className="auth-primary-button">Verify email</button>
              <button
                type="button"
                className="auth-text-button auth-resend"
                onClick={() => setNotice("Email delivery is not connected in this preview, so a new code was not sent.")}
              >
                Resend code
              </button>
            </form>
          )}

          {step === "new-password" && (
            <form className="auth-form" onSubmit={submitNewPassword}>
              <label className="auth-field">
                <span>New password</span>
                <input
                  name="newPassword"
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 8 characters"
                />
              </label>
              <label className="auth-field">
                <span>Confirm new password</span>
                <input
                  name="confirmNewPassword"
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Enter your password again"
                />
              </label>
              <button type="submit" className="auth-primary-button">Reset password</button>
            </form>
          )}

          {step === "complete" && (
            <div className="auth-complete">
              <span className="auth-complete-icon"><ShieldCheck size={25} /></span>
              <p>Email verification preview complete.</p>
              <button type="button" className="auth-primary-button" onClick={() => startAuth("login")}>
                Continue to sign in
              </button>
            </div>
          )}

          {step === "forgot" && (
            <button type="button" className="auth-text-button auth-back-link" onClick={() => startAuth("login")}>
              Back to sign in
            </button>
          )}
        </section>

        <aside className="auth-privacy">
          <span className="auth-privacy-icon"><LockKeyhole size={16} /></span>
          <p>
            <strong>Your privacy comes first.</strong> This preview does not save or send your details.
            Real sign-in, email codes, and password changes need a secure backend.
          </p>
        </aside>
        <p className="auth-guest-note">
          Need help now? <Link to="/">Emergency and support tools are available without signing in.</Link>
        </p>
      </main>

      {isPasswordStep && (
        <p className="auth-footer">One2Many · Support that keeps you in control</p>
      )}
    </div>
  );
}
