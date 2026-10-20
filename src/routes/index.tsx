import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  ChevronRight,
  Clock3,
  HeartHandshake,
  LockKeyhole,
  MapPin,
  ShieldCheck,
  Siren,
  UserRound,
} from "lucide-react";
import { AppNavigation } from "@/components/AppShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "One2Many — Your safety, your choice" },
      {
        name: "description",
        content:
          "Find support, plan a check-in, and explore safer ways to get help in South Africa.",
      },
      { property: "og:title", content: "One2Many — Your safety, your choice" },
      {
        property: "og:description",
        content: "Discreet support and safety tools for your next step.",
      },
    ],
  }),
  component: Home,
});

const quickActions = [
  {
    to: "/timer",
    icon: Clock3,
    label: "Check-in timer",
    detail: "Set a time to check in with someone you trust",
    tone: "lavender",
  },
  {
    to: "/support",
    icon: HeartHandshake,
    label: "Find support",
    detail: "Explore helplines and support services",
    tone: "mint",
  },
  {
    to: "/vault",
    icon: BookOpen,
    label: "Private notes",
    detail: "Keep a note for yourself, only if it feels safe",
    tone: "peach",
  },
] as const;

function Home() {
  return (
    <div className="home-screen">
      <header className="home-header">
        <Link to="/" className="brand-lockup" aria-label="One2Many home">
          <span className="brand-mark" aria-hidden="true">
            <span>2</span>
          </span>
          <span className="brand-name">one2many</span>
        </Link>
        <Link to="/verify" className="privacy-status auth-entry">
          <UserRound size={14} />
          Sign in
        </Link>
      </header>

      <main className="home-content">
        <div className="welcome-line">
          <div>
            <p className="eyebrow">A little support, when you need it</p>
            <h1>
              Your safety.
              <br />
              Your choice.
            </h1>
          </div>
          <div className="welcome-flower" aria-hidden="true">
            ✳
          </div>
        </div>

        <section className="emergency-card" aria-labelledby="emergency-title">
          <div className="emergency-card-copy">
            <span className="emergency-kicker">
              <span className="live-dot" /> HERE FOR YOU
            </span>
            <h2 id="emergency-title">Need help right now?</h2>
            <p>If you’re in immediate danger, call emergency services.</p>
          </div>
          <a
            className="emergency-call"
            href="tel:112"
            aria-label="Call emergency services on 112"
          >
            <Siren size={19} />
            <span>Call 112</span>
            <ChevronRight size={16} />
          </a>
          <div className="emergency-footnote">
            <MapPin size={14} />
            <span>South Africa · Free from a mobile phone</span>
          </div>
        </section>

        <section className="section-block" aria-labelledby="quick-actions-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">TAKE THE NEXT STEP</p>
              <h2 id="quick-actions-title">Here when you need us</h2>
            </div>
            <ShieldCheck
              size={19}
              className="heading-icon"
              aria-hidden="true"
            />
          </div>
          <div className="action-list">
            {quickActions.map(({ to, icon: Icon, label, detail, tone }) => (
              <Link key={to} to={to} className="action-card">
                <span className={`action-icon ${tone}`}>
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <span className="action-copy">
                  <span className="action-label">{label}</span>
                  <span className="action-detail">{detail}</span>
                </span>
                <ChevronRight size={18} className="action-arrow" />
              </Link>
            ))}
          </div>
        </section>

        <Link to="/support" className="support-banner">
          <span className="support-banner-icon">
            <HeartHandshake size={19} />
          </span>
          <span>
            <strong>Talk to someone who can help</strong>
            <span>GBV Command Centre · 0800 428 428 · 24/7</span>
          </span>
          <ChevronRight size={18} />
        </Link>

        <div className="privacy-note">
          <LockKeyhole size={15} />
          <p>
            <strong>Your privacy matters.</strong> You are in control of what you
            share and when.
          </p>
        </div>
        <p className="disclaimer">
          One2Many is a support tool, not a replacement for emergency services.
        </p>
      </main>
      <AppNavigation />
    </div>
  );
}
