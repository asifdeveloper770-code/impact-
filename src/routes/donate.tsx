import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, ArrowLeft, ArrowRight, Check, CreditCard, Shield, Zap, Award } from "lucide-react";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate — Finezza Futsal Center" },
      { name: "description", content: "Make a donation to help build the Finezza Futsal Center. Every contribution brings us closer to our goal." },
      { property: "og:title", content: "Donate — Finezza Futsal Center" },
      { property: "og:description", content: "Help build a permanent home for youth futsal in Gladstone, Oregon." },
    ],
  }),
  component: DonatePage,
});

const TIERS = [
  { name: "Bronze Supporter", amount: 200, color: "from-amber-700 to-amber-500", desc: "Name on donor wall + social shoutout" },
  { name: "Silver Supporter", amount: 300, color: "from-slate-400 to-slate-200", desc: "Bronze perks + limited-edition sticker pack" },
  { name: "Gold Supporter", amount: 500, color: "from-yellow-500 to-yellow-300", desc: "Silver perks + custom Finezza scarf" },
  { name: "Platinum Supporter", amount: 800, color: "from-slate-200 to-white", desc: "Gold perks + VIP facility preview invite" },
  { name: "Champions Circle", amount: 1000, special: true, color: "from-primary to-primary-glow", desc: "All perks + lifetime member discount + naming rights opportunity" },
];

const PRESET_AMOUNTS = [50, 100, 200, 300, 500, 1000];

// Replace with your real payment link (Stripe Payment Link, PayPal.Me, GoFundMe, etc.)
const EXTERNAL_PAYMENT_URL = "";

function DonatePage() {
  const [step, setStep] = useState<"amount" | "details" | "payment">("amount");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isMonthly, setIsMonthly] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const finalAmount = selectedAmount ?? (customAmount ? parseInt(customAmount) || 0 : 0);

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomChange = (val: string) => {
    if (/^\d*$/.test(val)) {
      setCustomAmount(val);
      setSelectedAmount(null);
    }
  };

  const canProceed = finalAmount > 0;

  const getTierForAmount = (amount: number) => {
    for (let i = TIERS.length - 1; i >= 0; i--) {
      if (amount >= TIERS[i].amount) return TIERS[i];
    }
    return null;
  };

  const matchedTier = getTierForAmount(finalAmount);

  const buildPaymentUrl = () => {
    if (EXTERNAL_PAYMENT_URL) return EXTERNAL_PAYMENT_URL;
    // Fallback: generic PayPal donate (user can replace)
    return `https://www.paypal.com/donate/?business=your-paypal@email.com&amount=${finalAmount}&currency_code=USD`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-[var(--font-sans)] antialiased">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center font-bold text-primary-foreground transition-transform group-hover:scale-110">F</div>
            <span className="font-[var(--font-display)] tracking-widest text-lg">FINEZZA</span>
          </Link>
          <div className="text-xs text-muted-foreground uppercase tracking-widest">Secure Donation</div>
        </div>
      </header>

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-medium tracking-wider uppercase mb-6">
              <Heart className="w-3.5 h-3.5" /> Help Build the Future
            </div>
            <h1 className="font-[var(--font-display)] text-5xl md:text-6xl mb-4">
              Make a <span className="text-primary">Donation</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Every dollar brings us closer to opening the Finezza Futsal Center. Select an amount, fill in your details, and complete your contribution securely.
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {(["amount", "details", "payment"] as const).map((s, i) => (
              <div key={s} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  step === s
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                    : (["details", "payment"].includes(step) && (s === "amount" || (s === "details" && step === "payment")))
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {(["details", "payment"].includes(step) && (s === "amount" || (s === "details" && step === "payment"))) ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    i + 1
                  )}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${step === s ? "text-foreground" : "text-muted-foreground"}`}>
                  {s === "amount" ? "Amount" : s === "details" ? "Your Details" : "Payment"}
                </span>
                {i < 2 && <div className={`w-12 h-px ${["details", "payment"].includes(step) && i === 0 ? "bg-primary/40" : ["payment"].includes(step) && i === 1 ? "bg-primary/40" : "bg-border"}`} />}
              </div>
            ))}
          </div>

          {/* STEP 1: AMOUNT */}
          {step === "amount" && (
            <div className="space-y-8 animate-[fadeUp_0.5s_ease-out]">
              {/* Preset amounts */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {PRESET_AMOUNTS.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountSelect(amount)}
                    className={`relative p-5 rounded-2xl border text-left transition-all hover:-translate-y-0.5 ${
                      selectedAmount === amount
                        ? "border-primary bg-primary/10 shadow-[var(--shadow-glow)]"
                        : "border-border bg-surface hover:border-primary/50"
                    }`}
                  >
                    <div className="font-[var(--font-display)] text-3xl text-foreground">${amount}</div>
                    <div className="text-xs text-muted-foreground mt-1">USD</div>
                    {selectedAmount === amount && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                  </button>
                ))}
                {/* Custom amount */}
                <div className={`relative p-5 rounded-2xl border text-left transition-all ${
                  customAmount ? "border-primary bg-primary/10" : "border-border bg-surface"
                }`}>
                  <div className="font-[var(--font-display)] text-3xl text-foreground flex items-baseline gap-1">
                    $<input
                      type="text"
                      inputMode="numeric"
                      value={customAmount}
                      onChange={(e) => handleCustomChange(e.target.value)}
                      placeholder="Other"
                      className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/50 font-[var(--font-display)]"
                    />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Custom amount</div>
                </div>
              </div>

              {/* Monthly toggle */}
              <div className="flex items-center justify-between p-5 rounded-2xl border border-border bg-surface">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-semibold text-sm">Make it monthly</div>
                    <div className="text-xs text-muted-foreground">Sustained support helps us plan long-term</div>
                  </div>
                </div>
                <button
                  onClick={() => setIsMonthly(!isMonthly)}
                  className={`relative w-12 h-7 rounded-full transition-colors ${isMonthly ? "bg-primary" : "bg-muted"}`}
                >
                  <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${isMonthly ? "left-6" : "left-1"}`} />
                </button>
              </div>

              {/* Tier preview */}
              {matchedTier && (
                <div className="p-5 rounded-2xl border border-primary/30 bg-primary/5 animate-[fadeUp_0.3s_ease-out]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${matchedTier.color} flex items-center justify-center`}>
                      <Heart className="w-4 h-4 text-background" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{matchedTier.name}</div>
                      <div className="text-xs text-muted-foreground">{matchedTier.desc}</div>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => canProceed && setStep("details")}
                disabled={!canProceed}
                className="w-full py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:shadow-[var(--shadow-glow)] hover:scale-[1.02] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Continue <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* STEP 2: DETAILS */}
          {step === "details" && (
            <div className="space-y-6 animate-[fadeUp_0.5s_ease-out]">
              <div className="p-6 rounded-2xl border border-border bg-surface">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Donation Amount</div>
                    <div className="font-[var(--font-display)] text-3xl text-primary">${finalAmount.toLocaleString()}{isMonthly && "/mo"}</div>
                  </div>
                  <button onClick={() => setStep("amount")} className="text-sm text-primary hover:underline">Change</button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message (optional)</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="A few words of encouragement..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                    />
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="w-5 h-5 rounded border-border bg-background text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-muted-foreground">Make this donation anonymous</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("amount")}
                  className="px-6 py-4 rounded-full border border-border hover:border-primary transition-all flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={() => donorName && donorEmail && setStep("payment")}
                  disabled={!donorName || !donorEmail}
                  className="flex-1 py-4 rounded-full bg-primary text-primary-foreground font-bold hover:shadow-[var(--shadow-glow)] hover:scale-[1.02] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Continue <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT */}
          {step === "payment" && (
            <div className="space-y-6 animate-[fadeUp_0.5s_ease-out]">
              <div className="p-8 rounded-3xl border border-primary/30 bg-surface text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <div className="font-[var(--font-display)] text-4xl text-foreground mb-1">${finalAmount.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground mb-6">{isMonthly ? "Monthly donation" : "One-time donation"} · {isAnonymous ? "Anonymous" : donorName}</div>

                <div className="space-y-3 mb-6 text-left">
                  <div className="flex justify-between text-sm py-2 border-b border-border">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${finalAmount.toLocaleString()}.00</span>
                  </div>
                  <div className="flex justify-between text-sm py-2">
                    <span className="text-muted-foreground">Processing fee</span>
                    <span className="font-medium text-primary">Covered by us</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold py-2">
                    <span>Total</span>
                    <span className="text-primary">${finalAmount.toLocaleString()}.00</span>
                  </div>
                </div>

                {matchedTier && (
                  <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 mb-6 text-left">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${matchedTier.color} flex items-center justify-center`}>
                        <Award className="w-4 h-4 text-background" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{matchedTier.name} unlocked!</div>
                        <div className="text-xs text-muted-foreground">{matchedTier.desc}</div>
                      </div>
                    </div>
                  </div>
                )}

                <a
                  href={buildPaymentUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:shadow-[var(--shadow-glow)] hover:scale-[1.02] transition-all"
                >
                  <CreditCard className="w-5 h-5" />
                  {EXTERNAL_PAYMENT_URL ? "Complete Secure Payment" : "Complete Payment via PayPal"}
                </a>

                {!EXTERNAL_PAYMENT_URL && (
                  <p className="text-xs text-muted-foreground mt-4">
                    Replace the payment link in the code with your Stripe, PayPal, or GoFundMe URL. <Link to="/" className="text-primary hover:underline">← Back to home</Link>
                  </p>
                )}
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-4 h-4" /> Your information is never shared. Secure connection.
              </div>

              <button
                onClick={() => setStep("details")}
                className="mx-auto block px-6 py-3 rounded-full border border-border hover:border-primary transition-all text-sm"
              >
                <ArrowLeft className="w-4 h-4 inline mr-1" /> Go Back
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 text-center">
        <p className="text-xs text-muted-foreground">
          Finezza Futsal Center is a community project. All contributions go directly to facility development.
        </p>
      </footer>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
