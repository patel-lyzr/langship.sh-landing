"use client";

import { useEffect } from "react";
import Link from "next/link";
import { TopNav } from "@/components/top-nav";
import { GITHUB_REPO_URL, GITHUB_REPO_LABEL } from "@/lib/links";

const STYLES = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* Palette mirrors the /home theme (brown-on-cream with a copper accent) so
   the manifesto and the product page feel like the same product.
   The .letter card stays a printed-page light surface in BOTH modes — only
   the page chrome around it flips. To make a light/light pairing readable,
   the light-mode --paper is bumped near-white and the page bg is a warm
   off-white, with the existing drop-shadow giving the letter lift.
   The --green/--paper/--ink names are kept (referenced throughout); the
   page-chrome colours are funnelled through --page-* vars so html.light can
   swap them in one place. */
.langship-root {
  /* letter card — light surface, dark ink. Tweaked per-mode below. */
  --ink: #1a120c;          /* deep brown ink for the letter card */
  --paper: #E9DECF;        /* warm cream letter surface (dark mode) */
  --paper-shadow: #D6C7B0; /* slightly deeper cream for the letter drop shadow */
  --letter-shadow: rgba(0,0,0,0.6); /* ambient shadow under the letter card */

  /* page chrome — everything outside the letter card */
  --page-bg: #13100E;          /* page background */
  --page-surface: #1B1715;     /* raised surfaces (terminal, feat cards) */
  --page-fg: #E9DECF;          /* primary text on the page bg */
  --page-muted: #9B8E7E;       /* secondary text */
  --page-dim: #5a4d40;         /* tertiary / scroll-hint / footer url */
  --hairline: rgba(255,255,255,0.07);      /* 1px dividers on dark */
  --hairline-soft: rgba(255,255,255,0.05);
  --overlay: rgba(255,255,255,0.04);       /* faint hover wash */
  --term-bg: #1B1715;          /* terminal body bg (= --page-surface) */
  --term-bar: #1a1a1a;         /* terminal title bar */
  --term-cmd: #d3c7b6;         /* typed command text */
  --term-meta: #6e6055;        /* prompt, title, comp-table headers */
  --feat-bg: #13100E;          /* feature card bg (= --page-bg) */
  --feat-bg-hover: #1B1715;
  --table-grid: rgba(255,255,255,0.06);    /* features grid gaps + borders */
  --table-td: #b3a695;         /* comp-table cell text */
  --table-rule: rgba(233,222,207,0.06);    /* comp-table row rule */
  --table-row-hover: rgba(255,255,255,0.02);
  --feat-desc-fg: #8a7a6a;
  --btn-border: rgba(255,255,255,0.18);
  --btn-border-hover: rgba(255,255,255,0.32);
  --noise-opacity: 0.6;        /* grain layer opacity */

  /* shared accents — same both modes */
  --green: #D08758;        /* copper accent — matches /home --accent */
  --green-dim: #8C5230;    /* darker copper for hover/dim states */
  --red: #d97757;          /* warm error tone, not pure red */
  --ok: #8FB069;           /* "yes" / success green (dark mode) */
  --muted: var(--page-muted);   /* back-compat alias used throughout */
  --letter-font: 'Fraunces', Georgia, serif;
  --mono: 'JetBrains Mono', monospace;
  --serif: 'Fraunces', serif;

  background: var(--page-bg);
  color: var(--page-fg);
  font-family: var(--mono);
  font-size: 16px;
  line-height: 1.7;
  overflow-x: hidden;
  min-height: 100vh;
  position: relative;
}

/* Light mode — warm printed-paper look. Page goes to a soft off-white, the
   letter card to near-white so it still reads as a separate sheet, and the
   dark-only rgba(255,255,255,…) hairlines/overlays flip to dark-on-light. */
html.light .langship-root {
  --paper: #FBF7EF;            /* near-white letter surface */
  --paper-shadow: #E4D9C5;
  --letter-shadow: rgba(40,28,16,0.18);

  --page-bg: #ECE3D2;          /* warm off-white page */
  --page-surface: #F5EFE2;     /* raised surfaces, slightly lighter than bg */
  --page-fg: #2A1E12;          /* dark brown primary text */
  --page-muted: #6B5C49;       /* secondary */
  --page-dim: #998A75;         /* tertiary */
  --hairline: rgba(26,18,12,0.14);
  --hairline-soft: rgba(26,18,12,0.10);
  --overlay: rgba(26,18,12,0.04);
  --term-bg: #221C16;          /* terminal stays a dark glass panel — a light
                                   terminal would read wrong, so we keep it
                                   dark in both modes for the "it's a shell"
                                   read. Its inner colours are dark-mode ones. */
  --term-bar: #181410;
  --term-cmd: #d3c7b6;
  --term-meta: #8A7B66;
  --feat-bg: #F5EFE2;
  --feat-bg-hover: #EDE4D2;
  --table-grid: rgba(26,18,12,0.10);
  --table-td: #5C4E3D;
  --table-rule: rgba(26,18,12,0.10);
  --table-row-hover: rgba(26,18,12,0.03);
  --feat-desc-fg: #7A6B58;
  --ok: #5F8B3C;               /* darker green so "✓" reads on off-white */
  --red: #B4502E;              /* deeper warm-red so "✗" reads on off-white */
  --btn-border: rgba(26,18,12,0.22);
  --btn-border-hover: rgba(26,18,12,0.40);
  --noise-opacity: 0.35;       /* grain reads heavier on light — dial it down */
}

.langship-root::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 0;
  opacity: var(--noise-opacity);
}

/* Manifesto nav rules removed — we now use the shared <TopNav /> component
   from /home, so the same chrome appears on both routes. The previous
   .nav-logo / .nav-cta classes are no longer referenced. */

.hero { position: relative; min-height: calc(100vh - 73px); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 4rem 2rem; text-align: center; z-index: 1; }
.hero-eyebrow { font-family: var(--mono); font-size: 0.72rem; letter-spacing: 0.25em; color: var(--green); text-transform: uppercase; margin-bottom: 2rem; opacity: 0; animation: fadeUp 0.6s ease forwards 0.2s; }
.envelope { font-size: 3rem; margin-bottom: 1.5rem; opacity: 0; animation: fadeUp 0.6s ease forwards 0.4s; filter: grayscale(0.3); }
.hero h1 { font-family: var(--letter-font); font-size: clamp(3.5rem, 10vw, 7rem); font-weight: 700; color: var(--page-fg); line-height: 1.05; margin-bottom: 1rem; opacity: 0; animation: fadeUp 0.7s ease forwards 0.5s; }
.hero-sub { font-family: var(--letter-font); font-size: clamp(1.2rem, 3vw, 1.6rem); color: var(--page-muted); font-weight: 400; max-width: 600px; line-height: 1.7; opacity: 0; animation: fadeUp 0.7s ease forwards 0.7s; }
.hero-sub em { color: var(--page-fg); font-style: italic; font-weight: 600; }
.hero-aside { display: inline-block; margin-top: 0.25rem; font-size: 0.9em; color: var(--green); font-style: italic; }
.scroll-hint { position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%); font-size: 0.7rem; letter-spacing: 0.2em; color: var(--page-dim); text-transform: uppercase; opacity: 0; animation: fadeIn 1s ease forwards 1.5s; }
.scroll-hint::after { content: ''; display: block; width: 1px; height: 40px; background: linear-gradient(to bottom, var(--page-dim), transparent); margin: 0.75rem auto 0; animation: pulse 2s ease-in-out infinite; }

.letter-wrap { position: relative; z-index: 1; max-width: 780px; margin: 0 auto; padding: 0 1.5rem; }
.letter { background: var(--paper); color: var(--ink); padding: 4rem 4rem 3.5rem; border-radius: 3px; position: relative; margin: 4rem 0; box-shadow: 0 1px 0 var(--paper-shadow), 0 4px 0 var(--paper-shadow), 0 8px 24px var(--letter-shadow, rgba(0,0,0,0.6)); }
.letter::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(0,0,0,0.04) 60px, rgba(0,0,0,0.04) 61px); }
.letter::after { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(transparent, transparent 39px, rgba(0,0,0,0.04) 39px, rgba(0,0,0,0.04) 40px); pointer-events: none; border-radius: 3px; }
/* Whole letter is italic Fraunces — reads as personal correspondence, not
   a brochure. Emphasis (<em>) stays italic but bumps weight so it doesn't
   flatten into the surrounding italic. */
.letter-salutation { font-family: var(--letter-font); font-style: italic; font-size: 2.2rem; font-weight: 700; color: var(--ink); margin-bottom: 1.5rem; position: relative; z-index: 1; }
.letter p { font-family: var(--letter-font); font-style: italic; font-size: 1.45rem; line-height: 1.9; color: #2a2a2a; margin-bottom: 1.2rem; position: relative; z-index: 1; }
.letter p em { font-style: italic; font-weight: 700; color: #111; }
.letter .jab { color: #8C3A1F; font-weight: 700; font-style: italic; }
.letter .sign-off { font-family: var(--letter-font); font-style: italic; font-size: 1.6rem; font-weight: 700; color: var(--ink); margin-top: 2.5rem; position: relative; z-index: 1; }
.letter .heart { color: #111; }

.questions-wrap { max-width: 780px; margin: 0 auto; padding: 0 1.5rem; position: relative; z-index: 1; }
.questions-header { font-family: var(--letter-font); font-size: 1.1rem; color: var(--page-muted); margin-bottom: 2rem; display: flex; align-items: center; gap: 0.75rem; }
.questions-header::before, .questions-header::after { content: ''; flex: 1; height: 1px; background: var(--hairline); }
.q-list { list-style: none; display: flex; flex-direction: column; gap: 1rem; }
.q-item { display: flex; gap: 1rem; align-items: flex-start; opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
.q-item.visible { opacity: 1; transform: translateY(0); }
.q-num { font-family: var(--mono); font-size: 0.7rem; color: var(--green); min-width: 28px; padding-top: 0.15rem; letter-spacing: 0.05em; }
.q-text { font-family: var(--letter-font); font-size: 1.5rem; line-height: 1.4; color: var(--page-fg); }
.q-text code { font-family: var(--mono); font-size: 0.85em; color: var(--green); background: rgba(208,135,88,0.10); padding: 0.1em 0.3em; border-radius: 3px; }

.terminal { background: var(--term-bg); border: 1px solid var(--hairline); border-radius: 8px; overflow: hidden; margin: 4rem auto; max-width: 780px; position: relative; z-index: 1; }
.terminal-bar { background: var(--term-bar); border-bottom: 1px solid rgba(255,255,255,0.06); padding: 0.7rem 1rem; display: flex; align-items: center; gap: 0.5rem; }
.dot { width: 11px; height: 11px; border-radius: 50%; }
.dot-r { background: #ff5f57; } .dot-y { background: #febc2e; } .dot-g { background: #28c840; }
.terminal-title { font-size: 0.72rem; color: var(--term-meta); letter-spacing: 0.05em; margin-left: 0.5rem; }
.terminal-body { padding: 1.5rem 1.75rem; font-family: var(--mono); font-size: 0.82rem; line-height: 1.9; }
.t-comment { color: #5a4d40; } .t-prompt { color: var(--term-meta); margin-right: 0.5rem; } .t-cmd { color: var(--term-cmd); }
.t-ok { color: #8FB069; } .t-err { color: var(--red); } .t-muted { color: var(--term-meta); }
.t-line { display: flex; align-items: baseline; gap: 0.25rem; padding: 0.05rem 0; }
.blink { display: inline-block; width: 8px; height: 1em; background: var(--green); vertical-align: text-bottom; animation: blink 1.1s step-end infinite; }

.features-section { position: relative; z-index: 1; max-width: 900px; margin: 0 auto 6rem; padding: 0 1.5rem; }
.section-label { font-size: 0.7rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--green); margin-bottom: 1rem; }
.section-title { font-family: var(--letter-font); font-size: clamp(2rem, 5vw, 3rem); color: var(--page-fg); margin-bottom: 3rem; line-height: 1.2; }
.section-title em { font-style: italic; color: var(--page-muted); }
.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1px; background: var(--table-grid); border: 1px solid var(--table-grid); border-radius: 8px; overflow: hidden; }
.feat-card { background: var(--feat-bg); padding: 1.75rem 1.5rem; transition: background 0.2s; }
.feat-card:hover { background: var(--feat-bg-hover); }
.feat-icon { font-size: 1.3rem; margin-bottom: 0.75rem; }
.feat-name { font-family: var(--mono); font-size: 0.82rem; font-weight: 500; color: var(--green); margin-bottom: 0.4rem; letter-spacing: 0.02em; }
.feat-desc { font-size: 0.8rem; color: var(--feat-desc-fg); line-height: 1.6; }

.comparison-section { position: relative; z-index: 1; max-width: 780px; margin: 0 auto 6rem; padding: 0 1.5rem; }
.comp-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
.comp-table th { padding: 0.75rem 1rem; text-align: left; font-weight: 500; letter-spacing: 0.05em; font-size: 0.72rem; text-transform: uppercase; }
.comp-table th:first-child { color: var(--term-meta); }
.comp-table th:nth-child(2) { color: var(--term-meta); text-align: center; }
.comp-table th:nth-child(3) { color: var(--green); text-align: center; }
.comp-table td { padding: 0.9rem 1rem; border-top: 1px solid var(--table-rule); color: var(--table-td); }
.comp-table td:first-child { font-family: var(--mono); font-size: 0.78rem; }
.comp-table td:nth-child(2), .comp-table td:nth-child(3) { text-align: center; }
.comp-table tr:hover td { background: var(--table-row-hover); }
.yes { color: var(--ok, #8FB069); font-size: 1rem; } .no { color: var(--red); font-size: 0.75rem; letter-spacing: 0.05em; } .paid { color: var(--page-muted); font-size: 0.7rem; letter-spacing: 0.05em; }

.letter .checklist { list-style: none; margin: 1.5rem 0; position: relative; z-index: 1; }
.letter .checklist li { font-family: var(--letter-font); font-style: italic; font-size: 1.35rem; color: #2a2a2a; padding: 0.4rem 0; display: flex; align-items: baseline; gap: 0.75rem; }
.letter .checklist li .ck { color: var(--green); font-size: 1rem; }

.cta-section { position: relative; z-index: 1; text-align: center; padding: 6rem 2rem 8rem; max-width: 680px; margin: 0 auto; }
.cta-pre { font-family: var(--letter-font); font-size: 1.1rem; color: var(--page-muted); margin-bottom: 1rem; }
.cta-title { font-family: var(--letter-font); font-size: clamp(2.5rem, 7vw, 4.5rem); font-weight: 700; color: var(--page-fg); line-height: 1.1; margin-bottom: 1rem; }
.cta-sub { font-family: var(--mono); font-size: 0.8rem; color: var(--term-meta); margin-bottom: 2.5rem; letter-spacing: 0.05em; }
.cta-sub span { color: var(--green); }
.star-btn { display: inline-flex; align-items: center; gap: 0.75rem; background: var(--green); color: #fff; text-decoration: none; font-family: var(--mono); font-weight: 500; font-size: 0.9rem; padding: 0.9rem 2rem; border-radius: 4px; transition: transform 0.2s, box-shadow 0.2s; animation: glow-pulse 3s ease-in-out infinite; }
.star-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(208,135,88,0.40); }
.star-btn .star-icon { font-size: 1rem; }
.cta-fine { margin-top: 1.25rem; font-size: 0.72rem; color: var(--page-dim); letter-spacing: 0.05em; }

/* Enter button — opens the product landing on /home. Sits inline with the
   primary CTA. Slightly more reserved than the GitHub star so it reads as
   "see the product" rather than "the only thing to click". */
.enter-btn {
  display: inline-flex; align-items: center; gap: 0.6rem;
  margin-left: 0.75rem;
  font-family: var(--mono); font-weight: 500; font-size: 0.9rem;
  padding: 0.9rem 1.75rem; border-radius: 4px;
  background: transparent; color: var(--page-fg);
  border: 1px solid var(--btn-border, rgba(255,255,255,0.18)); text-decoration: none;
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
}
.enter-btn:hover { background: var(--overlay); border-color: var(--btn-border-hover, rgba(255,255,255,0.32)); transform: translateY(-2px); }

.langship-root footer { border-top: 1px solid var(--hairline-soft); padding: 2.5rem; text-align: center; position: relative; z-index: 1; }
.footer-sign { font-family: var(--letter-font); font-size: 2rem; color: var(--page-fg); margin-bottom: 0.5rem; }
.footer-url { font-family: var(--mono); font-size: 0.75rem; color: var(--page-dim); letter-spacing: 0.1em; }

@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeIn { to { opacity: 1; } }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
@keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
@keyframes glow-pulse { 0%, 100% { box-shadow: 0 0 0 rgba(208,135,88,0); } 50% { box-shadow: 0 0 24px rgba(208,135,88,0.35); } }

.reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.65s ease, transform 0.65s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }

.tape { position: absolute; top: -14px; left: 50%; transform: translateX(-50%) rotate(-1.5deg); width: 70px; height: 28px; background: rgba(255,240,180,0.35); border-radius: 2px; z-index: 2; }

@media (max-width: 600px) {
  .letter { padding: 2.5rem 1.75rem 2rem; }
  .letter p { font-size: 1.2rem; }
  .letter-salutation { font-size: 1.8rem; }
  .langship-root nav { padding: 0.75rem 1.25rem; }
  .terminal-body { padding: 1rem 1rem; font-size: 0.76rem; }
  .enter-btn { margin-left: 0; margin-top: 0.75rem; }
}
`;

export default function ManifestoPage() {
  useEffect(() => {
    const items = document.querySelectorAll(".q-item, .reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const target = e.target as HTMLElement;
            const delay = target.classList.contains("q-item")
              ? Array.from(document.querySelectorAll(".q-item")).indexOf(target) * 120
              : 0;
            setTimeout(() => target.classList.add("visible"), delay);
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.15 },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="langship-root">
      {/* Inline styles: scoped under .langship-root so the manifesto can't leak
          into /home. dangerouslySetInnerHTML is the reliable form for raw CSS
          inside Next 15's app router. */}
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Same nav as /home — but section links point at /home#… so a reader
          who clicks "Pipeline" on the letter lands on the matching section
          of the product page, not nowhere. */}
      <TopNav linkBase="/home" />

      <section className="hero">
        <p className="hero-eyebrow">Open Source · Framework Agnostic · Actually Free</p>
        <div className="envelope">✉</div>
        <h1>Dear LangChain,</h1>
        <p className="hero-sub">
          Deployment. Governance. Audit logs. Rollbacks. CI/CD.
          <br />
          <em>You paywalled all of it.</em>
          <br />
          So we open-sourced all of it.
          <br />
          <span className="hero-aside">You're welcome.</span>
        </p>
        <div className="scroll-hint">read on</div>
      </section>

      <div className="letter-wrap">
        <div className="letter reveal">
          <div className="tape"></div>
          <p className="letter-salutation">Dear LangChain,</p>
          <p>
            Heading to Interrupt 2026? We'll be there too. <em>Sort of.</em>
          </p>
          <p>
            Look — you genuinely did something incredible. You made building
            agents accessible. You built the verbs. You built the graphs. You
            built the chains. You handed a generation of developers a superpower
            in <em>four lines of Python.</em>
          </p>
          <p>We took notes. We took a lot of notes.</p>
          <p>
            Then Friday came. The agent needed to ship. With SSO. With approvals.
            With audit logs. With tenant isolation. With a self-hosted control
            plane that wasn't an Enterprise sales call.
          </p>
          <p className="jab">And suddenly the docs got very, very quiet.</p>
          <p>
            Audit logs became a pricing page. Self-hosting the control plane
            became a sales call. Governance became an{" "}
            <em>Enterprise tier conversation.</em>
          </p>
          <p>We have a few questions. If you have a sec.</p>
          <p className="sign-off">
            — Langship <span className="heart">🖤</span>
          </p>
        </div>
      </div>

      <div className="questions-wrap">
        <p className="questions-header">Quick questions</p>
        <ul className="q-list">
          <li className="q-item">
            <span className="q-num">01.</span>
            <span className="q-text">How do we deploy without your platform?</span>
          </li>
          <li className="q-item">
            <span className="q-num">02.</span>
            <span className="q-text">
              Why is <code>git push</code> a paid feature now?
            </span>
          </li>
          <li className="q-item">
            <span className="q-num">03.</span>
            <span className="q-text">
              What if we want approval gates, audit logs, and rollbacks — without
              a sales call?
            </span>
          </li>
          <li className="q-item">
            <span className="q-num">04.</span>
            <span className="q-text">What if we use CrewAI on Tuesdays?</span>
          </li>
          <li className="q-item">
            <span className="q-num">05.</span>
            <span className="q-text">
              Also — when exactly did shipping to production become an enterprise
              feature?
            </span>
          </li>
        </ul>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 1.5rem" }}>
        <div className="terminal reveal">
          <div className="terminal-bar">
            <div className="dot dot-r"></div>
            <div className="dot dot-y"></div>
            <div className="dot dot-g"></div>
            <span className="terminal-title">langchain_deploy_check.sh</span>
          </div>
          <div className="terminal-body">
            <div className="t-line">
              <span className="t-comment"># Okay let's see how we ship this thing to prod</span>
            </div>
            <div className="t-line" style={{ marginTop: "0.5rem" }}>
              <span className="t-prompt">$</span>
              <span className="t-cmd">
                langgraph deploy my-agent --self-hosted-control-plane
              </span>
            </div>
            <div className="t-line">
              <span className="t-err">
                Error: self-hosted LangSmith requires an Enterprise license key.
              </span>
            </div>
            <div className="t-line" style={{ marginTop: "1rem" }}>
              <span className="t-prompt">$</span>
              <span className="t-cmd">langgraph audit-logs --tail</span>
            </div>
            <div className="t-line">
              <span className="t-err">
                Error: audit logs are available on Enterprise plans. Contact
                sales.
              </span>
            </div>
            <div className="t-line" style={{ marginTop: "1rem" }}>
              <span className="t-prompt">$</span>
              <span className="t-cmd">
                langgraph deploy my-agent --runtime bedrock-agentcore
              </span>
            </div>
            <div className="t-line">
              <span className="t-err">
                Error: unsupported runtime. Use LangSmith Deployment.
              </span>
            </div>
            <div className="t-line" style={{ marginTop: "1rem" }}>
              <span className="t-prompt">$</span>
              <span className="t-cmd">open https://langchain.com/pricing</span>
            </div>
            <div className="t-line">
              <span className="t-muted">Opening browser...</span>
            </div>
            <div className="t-line">
              <span className="t-muted"># 👀 oh. oh no.</span>
            </div>
            <div className="t-line" style={{ marginTop: "1.25rem" }}>
              <span className="t-prompt">$</span>
              <span className="t-cmd">
                pip install &quot;git+https://github.com/open-gitagent/langship.sh.git#subdirectory=langship-cli&quot;
              </span>
            </div>
            <div className="t-line">
              <span className="t-ok">✓ installed langship 0.1.0</span>
            </div>
            <div className="t-line" style={{ marginTop: "0.75rem" }}>
              <span className="t-prompt">$</span>
              <span className="t-cmd">langship login --api-url https://langship.your-co.internal</span>
            </div>
            <div className="t-line">
              <span className="t-prompt">$</span>
              <span className="t-cmd">langship pipelines push .langship/pipelines/prod.yaml</span>
            </div>
            <div className="t-line">
              <span className="t-ok">✓ updated pipeline prod-deploy</span>
            </div>
            <div className="t-line" style={{ marginTop: "0.75rem" }}>
              <span className="t-prompt">$</span>
              <span className="t-cmd">langship agents trigger my-agent</span>
            </div>
            <div className="t-line">
              <span className="t-muted">▶ build → scan → eval → approval → deploy(bedrock-agentcore)</span>
            </div>
            <div className="t-line">
              <span className="t-ok">
                ✓ deployed · https://bedrock-agentcore.us-east-1.amazonaws.com/runtimes/.../invocations
                <span className="blink"></span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="letter-wrap">
        <div className="letter reveal">
          <div className="tape" style={{ left: "30%", transform: "rotate(1.2deg)" }}></div>
          <p className="letter-salutation">Anyway. We built one.</p>
          <p>
            It does all of this. It is open source. It is free. <em>Just so you know.</em>
          </p>
          <ul className="checklist">
            <li>
              <span className="ck">✓</span> Drag-and-drop CI/CD pipelines. Visual
              canvas. Git is the source of truth.
            </li>
            <li>
              <span className="ck">✓</span> Deploy to Kubernetes, AWS Bedrock
              AgentCore, or GCP Vertex. Same definition.
            </li>
            <li>
              <span className="ck">✓</span> Environments are first-class. Dev,
              staging, prod — each with their own pipeline.
            </li>
            <li>
              <span className="ck">✓</span> Approval gates, eval gates, audit
              logs, rollback. As nodes. Not as invoices.
            </li>
            <li>
              <span className="ck">✓</span> Governance and tenant isolation that
              applies uniformly across every runtime.
            </li>
            <li>
              <span className="ck">✓</span> LangChain, LangGraph, LlamaIndex,
              CrewAI, AutoGen, Pydantic AI, raw SDK. All welcome.
            </li>
            <li>
              <span className="ck">✓</span> Self-hostable. Forever. No "contact
              sales" page. No per-agent tax. <em>Yours.</em>
            </li>
          </ul>
          <p>
            Think of us as Vercel, but for agents. Except we don't gate the
            interesting parts behind a growth plan.
          </p>
          <p>
            We're open-sourcing all three pillars — deployment, governance, and
            ops — because we believe{" "}
            <em>shipping your agent shouldn't require a procurement process.</em>
          </p>
          <p className="sign-off">
            — Langship <span className="heart">🖤</span>
            <br />
            <span style={{ fontSize: "1rem", color: "#9b8e7e", fontWeight: 400 }}>
              P.S. We support LangGraph too. No hard feelings.
            </span>
          </p>
        </div>
      </div>

      <div className="comparison-section reveal">
        <p className="section-label">The honest comparison</p>
        <p className="section-title">
          Things you <em>can't</em> do. And then things you can.
        </p>
        <table className="comp-table">
          <thead>
            <tr>
              <th>Capability</th>
              <th>
                LangSmith Deployment
                <br />
                <span
                  style={{
                    fontSize: "0.6rem",
                    color: "#5a4d40",
                    textTransform: "none",
                    letterSpacing: 0,
                  }}
                >
                  (formerly LangGraph Platform)
                </span>
              </th>
              <th>Langship (OSS)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Self-hosted control plane / governance</td>
              <td><span className="paid">enterprise</span></td>
              <td><span className="yes">✓</span></td>
            </tr>
            <tr>
              <td>One definition → Bedrock AgentCore + Vertex + K8s</td>
              <td><span className="no">✗</span></td>
              <td><span className="yes">✓</span></td>
            </tr>
            <tr>
              <td>Visual drag-and-drop CI/CD canvas</td>
              <td><span className="no">✗</span></td>
              <td><span className="yes">✓</span></td>
            </tr>
            <tr>
              <td>Approval + eval gates in pipeline</td>
              <td><span className="no">✗</span></td>
              <td><span className="yes">✓</span></td>
            </tr>
            <tr>
              <td>Audit logs + tenant isolation</td>
              <td><span className="paid">enterprise</span></td>
              <td><span className="yes">✓</span></td>
            </tr>
            <tr>
              <td>First-class non-LangGraph deploy (no Functional API wrapper)</td>
              <td><span className="no">✗</span></td>
              <td><span className="yes">✓</span></td>
            </tr>
            <tr>
              <td>One-command rollback with audit receipt across runtimes</td>
              <td><span className="no">✗</span></td>
              <td><span className="yes">✓</span></td>
            </tr>
            <tr>
              <td>GitOps-native (git as source of truth)</td>
              <td><span className="no">✗</span></td>
              <td><span className="yes">✓</span></td>
            </tr>
            <tr>
              <td>Open source license</td>
              <td><span className="no">✗</span></td>
              <td><span className="yes">Apache 2.0</span></td>
            </tr>
          </tbody>
        </table>
        <p
          style={{
            fontSize: "0.7rem",
            color: "#555",
            marginTop: "1rem",
            lineHeight: 1.6,
          }}
        >
          Sources:{" "}
          <a
            href="https://docs.langchain.com/langsmith/audit-logs"
            style={{ color: "#9b8e7e" }}
          >
            audit logs (Enterprise)
          </a>{" "}
          ·{" "}
          <a
            href="https://docs.langchain.com/langgraph-platform/self-hosted"
            style={{ color: "#9b8e7e" }}
          >
            self-hosted LangSmith (Enterprise add-on)
          </a>{" "}
          ·{" "}
          <a
            href="https://www.langchain.com/langgraph-platform-pricing"
            style={{ color: "#9b8e7e" }}
          >
            pricing
          </a>
        </p>
      </div>

      {/* Final action row — kept minimal so the manifesto closes on the
          comparison table's punch. Two buttons preserve the only paths out:
          star the repo, or step into the product page. */}
      <div className="cta-section reveal">
        <a
          className="star-btn"
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noreferrer"
        >
          <span className="star-icon">★</span> Star us on GitHub
        </a>
        <Link className="enter-btn" href="/home">
          See the product →
        </Link>
      </div>

      <footer>
        <p className="footer-url">
          langship.sh &nbsp;·&nbsp; {GITHUB_REPO_LABEL} &nbsp;·&nbsp; open source,
          forever
        </p>
      </footer>
    </div>
  );
}
