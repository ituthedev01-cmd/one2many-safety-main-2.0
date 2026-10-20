import { Link } from "@tanstack/react-router";
import { BookOpen, Clock3, HeartHandshake, House } from "lucide-react";
import type { ReactNode } from "react";

const tabs = [
  { to: "/", label: "Home", Icon: House },
  { to: "/timer", label: "Check in", Icon: Clock3 },
  { to: "/vault", label: "Notes", Icon: BookOpen },
  { to: "/support", label: "Support", Icon: HeartHandshake },
] as const;

export function AppShell({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <div className="app-shell">
      <header className="page-header">
        <Link to="/" className="brand-lockup" aria-label="One2Many home">
          <span className="brand-mark" aria-hidden="true">
            <span>2</span>
          </span>
          <span className="brand-name">one2many</span>
        </Link>
        <p className="page-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
      </header>
      <main className="page-content">{children}</main>
      <AppNavigation />
    </div>
  );
}

export function AppNavigation() {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {tabs.map(({ to, label, Icon }) => (
        <Link
          key={to}
          to={to}
          activeOptions={{ exact: true }}
          className="nav-item"
          activeProps={{ className: "nav-item nav-item-active" }}
        >
          <Icon size={20} strokeWidth={1.8} />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}
