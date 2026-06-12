import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroCourt from "@/assets/hero-court.jpg";
import teamPhoto from "@/assets/team.jpg";
import warehousePhoto from "@/assets/warehouse.jpg";
import actionPhoto from "@/assets/action.jpg";
import trainingPhoto from "@/assets/training.jpg";
import celebratePhoto from "@/assets/celebrate.jpg";
import Judah from "@/assets/Judah Daycare Post 2.png";
import sasa from "@/assets/sssss.png";
import Untitled from "@/assets/Untitled.jpg";
import WhatsApp6 from "@/assets/WhatsApp Image 2026-06-11 at 9.23.29 PM (6).jpeg";
import WhatsApp7 from "@/assets/WhatsApp Image 2026-06-11 at 9.23.29 PM (7).jpeg";
import WhatsApp8 from "@/assets/WhatsApp Image 2026-06-11 at 9.23.29 PM (8).jpeg";
import WhatsApp from "@/assets/WhatsApp Image 2026-06-11 at 9.23.29 PM.jpeg";
import WhatsApp1 from "@/assets/WhatsApp Image 2026-06-11 at 9.23.30 PM (1).jpeg";
import WhatsApp2 from "@/assets/WhatsApp Image 2026-06-11 at 9.23.30 PM (2).jpeg";
import Untitled111 from "@/assets/Untitled111.png";
import Untitledsss from "@/assets/Untitledsss.png";
import Untitledssssw from "@/assets/Untitledssssw.png";
import Untitledwww from "@/assets/Untitledwww.png";
import WhatsApp3 from "@/assets/WhatsApp Image 2026-06-11 at 9.23.28 PM (1).jpeg";
import WhatsApp4 from "@/assets/WhatsApp Image 2026-06-11 at 9.23.28 PM (2).jpeg";
import WhatsApp5 from "@/assets/WhatsApp Image 2026-06-11 at 9.23.28 PM.jpeg";
import WhatsApp9 from "@/assets/WhatsApp Image 2026-06-11 at 9.23.29 PM (1).jpeg";
import WhatsApp10 from "@/assets/WhatsApp Image 2026-06-11 at 9.23.29 PM (2).jpeg";
import WhatsApp11 from "@/assets/WhatsApp Image 2026-06-11 at 9.23.29 PM (3).jpeg";
import WhatsApp12 from "@/assets/WhatsApp Image 2026-06-11 at 9.23.29 PM (4).jpeg";
import WhatsApp13 from "@/assets/WhatsApp Image 2026-06-11 at 9.23.29 PM (5).jpeg";

import {
  MapPin, Phone, Mail, Globe, Heart, Trophy, Users, Calendar,
  Target, Sparkles, Building2, Rocket, ArrowRight, GraduationCap,
  Dumbbell, Home as HomeIcon, Award, ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Finezza Futsal Center — Building a Home for Futsal" },
      { name: "description", content: "Help build a permanent home for youth futsal in Gladstone, Oregon. Join us in raising $30,000 for the Finezza Futsal Center." },
      { property: "og:title", content: "Finezza Futsal Center — Building a Home for Futsal" },
      { property: "og:description", content: "Help build a permanent home for youth futsal in Gladstone, Oregon. Fundraising goal: $30,000." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

// ---- CONFIG: update these values anytime ----
const FUNDRAISING_GOAL = 45000;
const RAISED_AMOUNT = 15000; // update this to reflect current total
// Replace with your real payment URL in src/routes/donate.tsx
// -------------------------------------------------

function useCountUp(target: number, duration = 1800) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return { value, ref };
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!els || !els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-revealed");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Index() {
  const { value: raised, ref: counterRef } = useCountUp(RAISED_AMOUNT);
  const pct = Math.min(100, (RAISED_AMOUNT / FUNDRAISING_GOAL) * 100);
  const pageRef = useReveal<HTMLDivElement>();
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-background text-foreground font-[var(--font-sans)] antialiased overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center font-bold text-primary-foreground transition-transform group-hover:scale-110">F</div>
            <span className="font-[var(--font-display)] tracking-widest text-lg">FINEZZA</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#story" className="hover:text-primary transition-colors">Story</a>
            <a href="#impact" className="hover:text-primary transition-colors">Impact</a>
            <a href="#fundraising" className="hover:text-primary transition-colors">Fundraising</a>
            <a href="#timeline" className="hover:text-primary transition-colors">Journey</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </nav>
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:scale-105 hover:shadow-[var(--shadow-glow)] transition-all"
          >
            <Heart className="w-4 h-4 fill-current" /> Donate
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <img
          src={heroCourt}
          alt="Indoor futsal court at night"
          className="absolute inset-0 w-full h-full object-cover animate-[kenburns_22s_ease-in-out_infinite_alternate]"
          style={{ transform: `translateY(${scrollY * 0.25}px) scale(1.1)` }}
          width={1920} height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
        {/* floating glow blobs */}
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-primary/20 blur-3xl animate-[float_9s_ease-in-out_infinite]" aria-hidden />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-primary/15 blur-3xl animate-[float_11s_ease-in-out_infinite_reverse]" aria-hidden />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center w-full">
          <div className="space-y-8 animate-[fadeUp_1s_ease-out]">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-medium tracking-wider uppercase">
              <MapPin className="w-3.5 h-3.5" /> Gladstone, Oregon
            </div>
            <h1 className="font-[var(--font-display)] text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
              Building a home <br />
              for <span className="text-primary">futsal.</span> <br />
              Building a future <br />
              for our <span className="text-primary">community.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              For over a decade we've borrowed gyms, fields, and garages. Now we're creating a permanent home where young athletes can train year-round, build character, and chase bigger dreams.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/donate"
                className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-primary text-primary-foreground font-bold hover:shadow-[var(--shadow-glow)] hover:scale-105 transition-all"
              >
                <Heart className="w-5 h-5 fill-current" />
                Donate Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#story"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-border hover:border-primary hover:text-primary transition-all"
              >
                Our Story
              </a>
            </div>
          </div>

          {/* Stat card */}
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full" aria-hidden />
            <div className="relative rounded-3xl border border-primary/30 bg-surface/80 backdrop-blur-xl p-8 shadow-[var(--shadow-card)]">
              <div className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">Fundraising Goal</div>
              <div className="font-[var(--font-display)] text-6xl md:text-7xl text-primary leading-none">
                ${FUNDRAISING_GOAL.toLocaleString()}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                To build the future Finezza Futsal Center — a state-of-the-art permanent training facility.
              </p>
              <div ref={counterRef} className="mt-6 pt-6 border-t border-border">
                <div className="flex items-baseline justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Raised so far</span>
                  <span className="text-primary font-semibold">{Math.round((raised / FUNDRAISING_GOAL) * 100)}%</span>
                </div>
                <div className="font-[var(--font-display)] text-4xl text-foreground mb-3">
                  <span>${raised.toLocaleString()}</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--gradient-primary)] transition-all duration-[1800ms] ease-out shadow-[var(--shadow-glow)]"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE GALLERY */}
      <section aria-label="Gallery" className="relative py-6 border-y border-border bg-surface/30 overflow-hidden">
        <div className="flex gap-6 animate-[marquee_38s_linear_infinite] w-max">
          {[Untitled, Untitled111, Untitledsss, Untitledssssw, Untitledwww, WhatsApp, WhatsApp1, WhatsApp2, WhatsApp3,WhatsApp4, WhatsApp5,  WhatsApp6, WhatsApp7, WhatsApp8,WhatsApp9, WhatsApp10, WhatsApp11, WhatsApp12, WhatsApp13, Judah, sasa].map((src, i) => (
            <div key={i} className="relative h-44 w-72 md:h-56 md:w-96 rounded-2xl overflow-hidden border border-border group">
              <img src={src} alt="" loading="lazy" className="w-full h-full object-fit transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div data-reveal>
            <div className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">2011 — Where it all started</div>
            <h2 className="font-[var(--font-display)] text-5xl md:text-6xl mb-6">One coach. One dream. One garage.</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              FutebolTraining was founded in 2011 inside a garage on Laurelwood Avenue with a simple mission: to help players develop confidence, technical excellence, and a lifelong passion for the game.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-3">
              What began as individual technical training has grown into a player development platform that has impacted more than 3,000 athletes throughout the Portland area and beyond. Many players came to us lacking confidence, experience, or opportunities. Through dedicated coaching, mentorship, and a commitment to individual growth, we helped them develop the skills, mindset, and belief needed to pursue their goals both on and off the field.</p>
            <p className="text-muted-foreground leading-relaxed">
              In 2016, Finezza was established to expand that vision through high-quality futsal training and competitive opportunities for youth throughout the region. Our goal was to provide year-round programming, increase access to player development, and create pathways for athletes to compete and succeed at higher levels of the game.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4" data-reveal>
            {[
              { icon: Trophy, label: "500+", sub: "Athletes Served" },
              { icon: Calendar, label: "12+", sub: "Years of Programming" },
              { icon: Users, label: "Multiple", sub: "Teams & Age Groups" },
              { icon: Sparkles, label: "Year-Round", sub: "Development" },
            ].map((s, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl border border-border bg-surface hover:bg-surface-elevated hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
              >
                <s.icon className="w-7 h-7 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <div className="font-[var(--font-display)] text-3xl text-foreground">{s.label}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Featured action image */}
        <div className="max-w-7xl mx-auto mt-20 relative group rounded-3xl overflow-hidden border border-border" data-reveal>
          <img src={actionPhoto} alt="Futsal action under green stadium lights" loading="lazy" width={1280} height={1600} className="w-full h-[420px] md:h-[560px] object-cover transition-transform duration-[1500ms] group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-12">
            <div className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3">Where dreams take flight</div>
            <h3 className="font-[var(--font-display)] text-4xl md:text-6xl max-w-2xl leading-tight">Every kick. Every sprint. <span className="text-primary">Every dream.</span></h3>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-24 px-6 bg-surface/40 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">A Safe Haven. A Stronger Community. A Better Future.</div>
            <h2 className="font-[var(--font-display)] text-5xl md:text-6xl">Why <span className="text-primary">Finezza Futsal Center?</span></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
            <img
              src={warehousePhoto}
              alt="Future Finezza Futsal Center warehouse"
              loading="lazy" width={1280} height={800}
              className="rounded-2xl border border-border w-full"
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe every player deserves a chance to develop their potential, pursue their dreams, and experience the joy of the game. Our story is about more than soccer or futsal—it is about building confidence, creating opportunities, strengthening communities, and inspiring the next generation through sport.
              <br />
              Today, <span className="text-foreground font-semibold">Finezza and FutebolTraining </span>proudly serve families throughout Portland, Gladstone, Hillsboro, Vancouver, Lake Oswego, West Linn, Milwaukie, Clackamas, Oregon City, and surrounding communities. We strive to provide a welcoming environment where players of all backgrounds and ability levels can learn, grow, and thrive.  </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { icon: Target, label: "Futsal Training" },
              { icon: Dumbbell, label: "Indoor Soccer" },
              { icon: Trophy, label: "Camps & Clinics" },
              { icon: Users, label: "Team Training" },
              { icon: HomeIcon, label: "Rentals" },
              { icon: Heart, label: "Community Events" },
              { icon: GraduationCap, label: "Youth Programs" },
            ].map((f, i) => (
              <div key={i} className="p-5 rounded-xl border border-border bg-background hover:border-primary hover:text-primary text-center transition-all hover:-translate-y-1">
                <f.icon className="w-6 h-6 mx-auto mb-3 text-primary" />
                <div className="text-xs font-semibold uppercase tracking-wider">{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FUNDRAISING / DONATION LEVELS */}
      <section id="fundraising" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-10 mb-16">
            <div className="lg:col-span-3">
              <div className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">Our Fundraising Goal</div>
              <div className="font-[var(--font-display)] text-7xl md:text-8xl text-primary leading-none mb-4">
                ${FUNDRAISING_GOAL.toLocaleString()}
              </div>
              <p className="text-muted-foreground text-lg mb-8">
                Your support will help us build the future Finezza Futsal Center.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">${RAISED_AMOUNT.toLocaleString()} raised of ${FUNDRAISING_GOAL.toLocaleString()}</span>
                  <span className="text-primary font-semibold">{Math.round(pct)}%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-[var(--gradient-primary)] rounded-full shadow-[var(--shadow-glow)]" style={{ width: `${pct}%` }} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$0</span><span>$15,000</span><span>$30,000</span>
                </div>
              </div>
              <p className="mt-8 italic text-primary">Every dollar brings us closer to our goal!</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
                {[
                  { icon: Building2, label: "Phase 1", sub: "Warehouse Renovation" },
                  { icon: Rocket, label: "Phase 2", sub: "Facility Launch" },
                  { icon: Users, label: "Phase 3", sub: "Expanded Programming" },
                  { icon: Award, label: "Phase 4", sub: "Permanent Facility" },
                ].map((p, i) => (
                  <div key={i} className="p-4 rounded-xl border border-border bg-surface text-center">
                    <p.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                    <div className="text-xs font-bold uppercase">{p.label}</div>
                    <div className="text-[11px] text-muted-foreground mt-1">{p.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 rounded-3xl border border-border bg-surface p-8">
              <div className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-6 text-center">Donation Levels</div>
              <div className="space-y-3">
                {[
                  { name: "Bronze Supporter", amount: 200, color: "from-amber-700 to-amber-500" },
                  { name: "Silver Supporter", amount: 300, color: "from-slate-400 to-slate-200" },
                  { name: "Gold Supporter", amount: 500, color: "from-yellow-500 to-yellow-300" },
                  { name: "Platinum Supporter", amount: 800, color: "from-slate-200 to-white" },
                  { name: "Champions Circle", amount: 1000, special: true, color: "from-primary to-primary-glow" },
                ].map((d) => (
                  <Link
                    to="/donate"
                    key={d.name}
                    className={`group flex items-center justify-between p-4 rounded-xl border transition-all hover:-translate-y-0.5 ${d.special
                      ? "border-primary bg-primary/10 hover:bg-primary/20"
                      : "border-border bg-background hover:border-primary"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${d.color} flex items-center justify-center`}>
                        <Award className="w-5 h-5 text-background" />
                      </div>
                      <div className="font-semibold text-sm uppercase tracking-wide">{d.name}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-[var(--font-display)] text-xl text-primary">
                        ${d.amount}{d.special && "+"}
                      </span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section id="impact" className="py-24 px-6 bg-surface/40 border-y border-border">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 space-y-6" data-reveal>
            <div className="text-primary text-xs font-bold tracking-[0.2em] uppercase">The Impact</div>
            <h2 className="font-[var(--font-display)] text-5xl md:text-6xl">Changing lives <br />on and off the court.</h2>
            {[
              "A safe, positive space for year-round futsal, indoor soccer development, camps, clinics, tournaments, rentals and community events.",
              "A community hub where young people develop leadership, discipline, teamwork, respect, and strong character.",
              "A place where kids belong, grow, and achieve their dreams.",
            ].map((t, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <Heart className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <p className="text-muted-foreground pt-1.5">{t}</p>
              </div>
            ))}
          </div>
          <div className="order-1 lg:order-2 relative group" data-reveal>
            <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-60 group-hover:opacity-100 transition-opacity rounded-full" aria-hidden />
            <img
              src={celebratePhoto}
              alt="Young futsal team celebrating"
              loading="lazy" width={1024} height={1024}
              className="relative rounded-3xl border border-border w-full transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <img
              src={trainingPhoto}
              alt="Player training"
              loading="lazy" width={1920} height={1080}
              className="absolute -bottom-10 -left-10 w-2/3 rounded-2xl border-4 border-background shadow-[var(--shadow-card)] hidden md:block transition-transform duration-700 group-hover:-translate-y-2"
            />
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section id="timeline" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <div className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">From a garage to a legacy</div>
            <h2 className="font-[var(--font-display)] text-5xl md:text-6xl">Our <span className="text-primary">Journey</span></h2>
          </div>
          <div className="relative">
            <div className="absolute left-0 right-0 top-12 h-px bg-border hidden md:block" />
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
              {[
                { year: "2011", icon: HomeIcon, label: "Garage Training Begins" },
                { year: "2014", icon: Award, label: "ADF Portland Founded" },
                { year: "2015–2019", icon: Users, label: "Club Growth & Impact" },
                { year: "2020", icon: Sparkles, label: "Pandemic & Outdoor Training" },
                { year: "2021–2025", icon: Trophy, label: "Expansion Throughout Metro" },
                { year: "2026", icon: Rocket, label: "Finezza Futsal Center Launch" },
                { year: "Future", icon: Building2, label: "Permanent State-of-the-Art Facility" },
              ].map((m, i) => (
                <div key={i} className="group text-center relative">
                  <div className="relative mx-auto w-24 h-24 rounded-full bg-surface border-2 border-border flex items-center justify-center mb-4 group-hover:border-primary group-hover:scale-110 transition-all">
                    <m.icon className="w-9 h-9 text-primary" />
                  </div>
                  <div className="font-[var(--font-display)] text-xl text-primary">{m.year}</div>
                  <div className="text-xs text-muted-foreground mt-2 uppercase tracking-wide">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA / CONTACT */}
      <section id="contact" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-primary)] opacity-[0.07]" />
        <div className="relative max-w-6xl mx-auto rounded-3xl border border-primary/40 bg-surface p-10 md:p-16 shadow-[var(--shadow-card)]">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">Help us build the future</div>
              <h2 className="font-[var(--font-display)] text-5xl md:text-6xl mb-6 leading-tight">
                From a garage<br />to a <span className="text-primary">legacy.</span>
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Together, we can create a lasting home for futsal and our community.
                <span className="block mt-2 text-primary font-semibold">Launch Goal: End of July 2026</span>
              </p>
              <Link
                to="/donate"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold hover:scale-105 hover:shadow-[var(--shadow-glow)] transition-all"
              >
                <Heart className="w-5 h-5 fill-current" /> Donate to the Center
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-5">
              <div className="text-xs uppercase tracking-widest text-primary font-bold">Founder & Director</div>
              <div className="font-[var(--font-display)] text-3xl">Joaquim Capuia</div>
              {[
                { icon: Phone, label: "503-875-9456", href: "tel:+15038759456" },
                { icon: Mail, label: "joaquim@adfportland.com", href: "mailto:joaquim@adfportland.com" },
                { icon: Globe, label: "www.adfportland.com", href: "https://www.adfportland.com" },
                { icon: MapPin, label: "Gladstone, Oregon" },
              ].map((c, i) => (
                <a
                  key={i}
                  href={c.href || "#"}
                  className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border hover:border-primary hover:translate-x-1 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <c.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <span className="text-sm">{c.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10 px-6 text-center">
        <div className="font-[var(--font-display)] text-2xl tracking-widest mb-2">FINEZZA <span className="text-primary">FUTSAL CENTER</span></div>
        <p className="text-xs text-muted-foreground uppercase tracking-widest">
          Building a home for futsal. Building a future for our community.
        </p>
      </footer>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes kenburns {
          0% { transform: scale(1.1) translate(0,0); }
          100% { transform: scale(1.2) translate(-2%, -1%); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-30px) translateX(20px); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        [data-reveal] { opacity: 0; transform: translateY(40px); transition: opacity .9s ease-out, transform .9s cubic-bezier(.2,.7,.2,1); }
        [data-reveal].is-revealed { opacity: 1; transform: translateY(0); }
      `}</style>
    </div>
  );
}
