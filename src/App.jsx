import { useState, useEffect, useRef, createContext, useContext } from "react";

// ── Design Theme Constants ──────────────────────────────────────
const DARK = {
    bg0: "#03020a",
    bg1: "#07051a",
    bg2: "#0d0a28",
    acc: "#6c5ce7",
    acc2: "#a29bfe",
    neon: "#00cec9",
    gold: "#fdcb6e",
    rose: "#fd79a8",
    txt: "#f0eeff",
    muted: "#8b87c0",
    glass: "rgba(255,255,255,0.04)",
    glassBorder: "rgba(255,255,255,0.09)",
    glassHover: "rgba(255,255,255,0.08)",
    shadow: "rgba(0,0,0,0.5)",
    orb1: "rgba(108,92,231,0.18)",
    orb2: "rgba(0,206,201,0.12)",
    orb3: "rgba(253,121,168,0.08)",
    navBg: "rgba(3,2,10,0.75)",
    inputBg: "rgba(255,255,255,0.06)",
};

const LIGHT = {
    bg0: "#f8f9ff",
    bg1: "#ffffff",
    bg2: "#f0f2ff",
    acc: "#6c5ce7",
    acc2: "#5a4fcf",
    neon: "#00b8b5",
    gold: "#e17c1c",
    rose: "#e8448e",
    txt: "#1a0e5c",
    muted: "#6b609e",
    glass: "rgba(255,255,255,0.7)",
    glassBorder: "rgba(255,255,255,0.9)",
    glassHover: "rgba(255,255,255,0.85)",
    shadow: "rgba(108,92,231,0.12)",
    orb1: "rgba(108,92,231,0.12)",
    orb2: "rgba(0,206,201,0.08)",
    orb3: "rgba(253,121,168,0.08)",
    navBg: "rgba(248,249,255,0.85)",
    inputBg: "rgba(255,255,255,0.8)",
};

const ThemeCtx = createContext();
const useTheme = () => useContext(ThemeCtx);

// ── Components ───────────────────────────────────────────────────

function JustBuyLogo({ size = 32, theme }) {
    const t = theme === "dark" ? DARK : LIGHT;
    // Use unique ID to prevent SVG gradient clipping when used multiple times
    const gradId = `logoGrad-${size}`;
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", userSelect: "none" }}>
            <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="12" fill={`url(#${gradId})`} />
                <defs>
                    <linearGradient id={gradId} x1="0" y1="0" x2="40" y2="40">
                        <stop offset="0%" stopColor="#6c5ce7" />
                        <stop offset="100%" stopColor="#00cec9" />
                    </linearGradient>
                </defs>
                <path d="M11 11h5v14c0 2.5-1.5 4-4 4s-4-1.5-4-1.5l2-1s.8.5 2 .5c.8 0 1.2-.5 1.2-1.5V11z" fill="#fff" />
                <path d="M20 11h5.5c2.2 0 3.8 1.4 3.8 3.4s-.7 2.5-1.1 2.5 1.1 1.6 1.1 3-1.8 3.8-4.4 3.8H20V11zm2.5 5h3c1 0 1.5-.6 1.5-1.4s-.5-1.4-1.5-1.4h-3v2.8zm0 5.5h3c1 0 1.5-.6 1.5-1.6s-.5-1.6-1.5-1.6h-3v3.2z" fill="#fff" />
            </svg>
            <span className="outfit" style={{ fontWeight: 800, fontSize: size * 0.6, letterSpacing: "-0.03em", color: t.txt }}>
                Just<span style={{ color: "#6c5ce7" }}>Buy</span>
            </span>
        </div>
    );
}

function PhoneMockup() {
    const { t } = useTheme();
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        let current = 0;
        const target = 1450.75;
        const interval = setInterval(() => {
            if (current < target) {
                current += target / 60;
                setBalance(Math.min(current, target).toLocaleString(undefined, { minimumFractionDigits: 2 }));
            } else {
                clearInterval(interval);
            }
        }, 16);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="phone-mockup reveal" style={{ animation: "float 6s ease-in-out infinite" }}>
            <div className="phone-screen">
                <div style={{ background: "linear-gradient(180deg, #6c5ce7 0%, #07051a 100%)", padding: "40px 20px 20px", color: "#fff" }}>
                    <div style={{ fontSize: "0.7rem", opacity: 0.7, marginBottom: 4 }}>Total Balance</div>
                    <div className="outfit" style={{ fontSize: "1.8rem", fontWeight: 800 }}>GHS {balance}</div>
                    <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
                        <div style={{ padding: "6px 12px", background: "rgba(255,255,255,0.1)", borderRadius: 10, fontSize: "0.6rem" }}>Add Money</div>
                        <div style={{ padding: "6px 12px", background: "rgba(255,255,255,0.1)", borderRadius: 10, fontSize: "0.6rem" }}>Send</div>
                    </div>
                </div>
                <div style={{ padding: 20 }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, marginBottom: 15, color: "var(--txt)" }}>Quick Services</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                        {[
                            { s: 'Bundles', i: '/assets/logos/mtn.png' },
                            { s: 'Airtime', i: '/assets/logos/telecel.png' },
                            { s: 'ECG', i: '/assets/logos/ecg.png' },
                            { s: 'Water', i: '💧' },
                            { s: 'DStv', i: '/assets/logos/dstv.png' },
                            { s: 'More', i: '➕' }
                        ].map(item => (
                            <div key={item.s} style={{ textAlign: "center" }}>
                                <div style={{ width: 44, height: 44, background: "var(--bg2)", borderRadius: 12, margin: "0 auto 6px", border: "1px solid var(--glassBorder)", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 8 }}>
                                    {item.i.includes('/') ? <img src={item.i} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <span style={{ fontSize: '1.2rem' }}>{item.i}</span>}
                                </div>
                                <div style={{ fontSize: "0.6rem", color: "var(--muted)" }}>{item.s}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ flex: 1, background: "var(--bg1)", padding: 20 }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, marginBottom: 15, color: "var(--txt)" }}>Recent Activity</div>
                    {[
                        { t: 'MTN Bundle', a: '- GHS 50.00' },
                        { t: 'Wallet Credit', a: '+ GHS 200.00' },
                        { t: 'ECG Tokens', a: '- GHS 100.00' }
                    ].map((tx, i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: "0.7rem" }}>
                            <span style={{ color: "var(--txt)" }}>{tx.t}</span>
                            <span style={{ fontWeight: 700, color: tx.a.startsWith('+') ? '#00b8b5' : 'var(--txt)' }}>{tx.a}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const TICK = [
    { icon: "/assets/logos/mtn.png", label: "MTN MoMo" },
    { icon: "/assets/logos/telecel.png", label: "Telecel Cash" },
    { icon: "/assets/logos/at.png", label: "ATMoney" },
    { icon: "💳", label: "Visa & Mastercard" },
    { icon: "🏦", label: "All Major Banks" },
    { icon: "/assets/logos/ecg.png", label: "ECG Prepaid" },
    { icon: "💧", label: "Ghana Water" },
    { icon: "/assets/logos/dstv.png", label: "DStv & GOtv" }
];

function Navbar() {
    const { t, theme, toggle } = useTheme();
    return (
        <nav className="glass-nav" style={{ position: "sticky", top: 0, zIndex: 1000, height: 72 }}>
            <div className="container" style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <JustBuyLogo size={36} theme={theme} />
                <div className="desktop-nav" style={{ display: "flex", gap: 32, alignItems: "center" }}>
                    {['Features', 'How it Works', 'Business', 'Contact'].map(item => (
                        <button key={item} className="nl outfit" style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.txt, opacity: 0.8, fontSize: "0.9rem" }}>{item}</button>
                    ))}
                    <div style={{ width: 1, height: 20, background: t.glassBorder }}></div>
                    <button onClick={toggle} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem" }}>
                        {theme === "dark" ? "☀️" : "🌙"}
                    </button>
                    <button className="grad-btn outfit" style={{ padding: "10px 24px", borderRadius: 12, fontWeight: 700, fontSize: "0.9rem" }}>
                        Get Started
                    </button>
                </div>
            </div>
        </nav>
    );
}

function SectionHead({ badge, title, desc, center = true }) {
    const { t } = useTheme();
    return (
        <div style={{ textAlign: center ? "center" : "left", marginBottom: 64 }} className="reveal">
            <div className="badge outfit" style={{ color: t.acc, marginBottom: 16 }}>{badge}</div>
            <h2 className="outfit" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: t.txt, marginBottom: 20, lineHeight: 1.1 }}>{title}</h2>
            {desc && <p style={{ color: t.muted, fontSize: "1.1rem", maxWidth: 600, margin: center ? "0 auto" : 0 }}>{desc}</p>}
        </div>
    );
}

function App() {
    const [theme, setTheme] = useState("dark");
    const t = theme === "dark" ? DARK : LIGHT;

    useEffect(() => {
        const root = document.documentElement;
        Object.entries(t).forEach(([key, val]) => {
            root.style.setProperty(`--${key}`, val);
        });
        document.body.style.background = t.bg0;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('in');
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, [theme, t]);

    const toggle = () => setTheme(prev => prev === "dark" ? "light" : "dark");

    return (
        <ThemeCtx.Provider value={{ theme, toggle, t }}>
            <Navbar />

            <main>
                {/* HERO SECTION */}
                <section style={{ position: "relative", minHeight: "calc(100vh - 72px)", display: "flex", alignItems: "center", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                        <div className="orb" style={{ width: 600, height: 600, background: t.orb1, top: -200, left: -200 }}></div>
                        <div className="orb" style={{ width: 500, height: 500, background: t.orb2, bottom: -100, right: -100, animationDelay: "-5s" }}></div>
                    </div>

                    <div className="container" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 80, alignItems: "center", position: "relative", zIndex: 1 }}>
                        <div className="reveal">
                            <div className="badge outfit" style={{ color: t.neon, marginBottom: 24, padding: "8px 20px" }}>
                                <span style={{ width: 8, height: 8, borderRadius: "50%", background: t.neon, marginRight: 10, display: "inline-block", boxShadow: `0 0 10px ${t.neon}` }}></span>
                                Now Live in Ghana
                            </div>
                            <h1 className="outfit" style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", fontWeight: 900, color: t.txt, lineHeight: 1.05, marginBottom: 32, letterSpacing: "-0.04em" }}>
                                Digital Commerce & <br />
                                <span className="grad-text">Mobile Money</span>, <br />
                                Simplified.
                            </h1>
                            <p style={{ color: t.muted, fontSize: "1.2rem", maxWidth: 540, marginBottom: 48, lineHeight: 1.6 }}>
                                The smartest way to buy data, airtime, and pay bills. Powered by <strong>Korba Xchange</strong> for instant delivery across all networks.
                            </p>
                            <div style={{ display: "flex", gap: 20 }}>
                                <button className="grad-btn outfit" style={{ padding: "18px 40px", borderRadius: 16, fontSize: "1.1rem", fontWeight: 800 }}>
                                    ⬇ Download JustBuy App
                                </button>
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <div className="jakarta" style={{ fontSize: "0.9rem", color: t.txt }}> Dial <strong style={{ color: t.acc }}>*380*15#</strong> <br /><span style={{ opacity: 0.6 }}>Offline access</span></div>
                                </div>
                            </div>
                        </div>

                        <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                            <PhoneMockup />
                        </div>
                    </div>
                </section>

                {/* LOGO STRIP */}
                <div className="ticker-wrap" style={{ borderTop: `1px solid ${t.glassBorder}`, borderBottom: `1px solid ${t.glassBorder}`, background: t.glass }}>
                    <div className="ticker-track">
                        {[...TICK, ...TICK, ...TICK].map((item, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, opacity: 0.6 }}>
                                {item.icon.includes('/') ?
                                    <img src={item.icon} alt="" style={{ height: 24, filter: theme === 'dark' ? 'none' : 'grayscale(1)' }} /> :
                                    <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                                }
                                <span className="outfit" style={{ fontSize: "0.8rem", fontWeight: 700, color: t.txt }}>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FEATURES SECTION */}
                <section style={{ padding: "120px 0" }}>
                    <div className="container">
                        <SectionHead
                            badge="Why Choose Us"
                            title="Built for the Modern Ghanaian"
                            desc="Experience seamless financial services designed for speed, security, and absolute reliability."
                        />

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
                            {[
                                { i: '⚡', t: 'Instant Processing', d: 'Transactions are processed in real-time through the Korba API for zero delays.' },
                                { i: '🔒', t: 'Bank-Grade Security', d: 'Your data and funds are protected by industry-leading encryption and KYC verification.' },
                                { i: '📶', t: 'All-Network Ready', d: 'Works perfectly across MTN, Telecel, and AT Ghana networks without hassle.' },
                                { i: '💰', t: 'Wallet Credits', d: 'Receive instant refunds to your JustBuy wallet if a service delivery fails.' },
                                { i: '📊', t: 'Track Everything', d: 'Full transaction history and automated receipts for every purchase you make.' },
                                { i: '📵', t: 'Works Offline', d: 'No data? No problem. Use our USSD code *380*15# to access basic services.' }
                            ].map((f, idx) => (
                                <div key={idx} className="glass reveal" style={{ padding: 40, animationDelay: `${idx * 0.1}s` }}>
                                    <div style={{ fontSize: "2rem", marginBottom: 24 }}>{f.i}</div>
                                    <h3 className="outfit" style={{ fontSize: "1.25rem", fontWeight: 800, color: t.txt, marginBottom: 12 }}>{f.t}</h3>
                                    <p style={{ color: t.muted, fontSize: "0.95rem" }}>{f.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* USSD EXPERIENCE SECTION (High Impact) */}
                <section style={{ padding: "100px 0", background: "var(--bg2)" }}>
                    <div className="container">
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "center" }}>
                            <div className="reveal">
                                <SectionHead badge="Instant Access" title="Data bundles at your fingertips" center={false} />
                                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                                    {[
                                        { n: '1', t: 'Pick Your Network', d: 'Select between MTN, Telecel, or AT money.' },
                                        { n: '2', t: 'Choose Bundle', d: 'Weekly, Monthly, or the popular Big Time data.' },
                                        { n: '3', t: 'Pay & Receive', d: 'Confirm with MoMo PIN and get credited instantly.' }
                                    ].map(step => (
                                        <div key={step.n} style={{ display: "flex", gap: 20 }}>
                                            <div style={{ width: 48, height: 48, borderRadius: 16, background: t.acc, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, flexShrink: 0 }}>{step.n}</div>
                                            <div>
                                                <h4 className="outfit" style={{ color: t.txt, fontWeight: 700, fontSize: "1.1rem", marginBottom: 4 }}>{step.t}</h4>
                                                <p style={{ color: t.muted, fontSize: "0.9rem" }}>{step.d}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="glass reveal" style={{
                                padding: 60,
                                position: "relative",
                                background: theme === 'dark' ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.9)",
                                border: `1px solid ${t.glassBorder}`,
                                boxShadow: theme === 'dark' ? '0 40px 80px rgba(0,0,0,0.6)' : '0 20px 40px rgba(108,92,231,0.1)'
                            }}>
                                <div className="mono" style={{ color: theme === 'dark' ? "#00ff00" : "#6c5ce7", lineHeight: 1.8, fontSize: "1.1rem" }}>
                                    <div style={{ opacity: 0.7 }}>[ JustBuy Official USSD ]</div>
                                    <div style={{ color: t.txt, margin: "20px 0" }}>
                                        Select Service:<br />
                                        1. Buy Airtime<br />
                                        2. Buy Data Bundles<br />
                                        3. Pay Utility Bills<br />
                                        4. JustBuy Wallet<br />
                                        5. Settings
                                    </div>
                                    <div style={{ color: t.muted }}>Enter Choice: <span className="mono-cursor" style={{ background: theme === 'dark' ? "#00ff00" : "#6c5ce7", width: 10, height: 2, display: "inline-block", marginLeft: 4 }}></span></div>
                                </div>
                                <div style={{ position: "absolute", bottom: -20, right: 20, background: t.neon, color: "#000", padding: "12px 24px", borderRadius: 12, fontWeight: 800, boxShadow: `0 10px 20px ${t.neon}33` }}>Dial *380*15#</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA / FOOTER PREVIEW */}
                <section style={{ padding: "140px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
                    <div className="orb" style={{ width: 400, height: 400, background: t.acc, opacity: 0.15, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}></div>
                    <div className="container" style={{ position: "relative", zIndex: 1 }}>
                        <h2 className="outfit reveal" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, color: t.txt, marginBottom: 40 }}>Ready to JustBuy?</h2>
                        <div className="reveal" style={{ display: "flex", gap: 16, justifyContent: "center" }}>
                            <button className="grad-btn outfit" style={{ padding: "20px 48px", borderRadius: 20, fontSize: "1.2rem", fontWeight: 800 }}>Download on Android</button>
                        </div>
                        <p className="reveal" style={{ marginTop: 40, color: t.muted }}>Licensed & Powered by <strong>Halges Financial Technologies Ltd.</strong></p>
                    </div>
                </section>
            </main>

            <footer style={{ padding: "80px 0", background: t.bg1, borderTop: `1px solid ${t.glassBorder}` }}>
                <div className="container">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 60 }}>
                        <div>
                            <JustBuyLogo size={32} theme={theme} />
                            <p style={{ marginTop: 24, color: t.muted, fontSize: "0.9rem", lineHeight: 1.8 }}>The unified platform for digital commerce in Ghana. Buy airtime, data and pay bills across all networks securely.</p>
                        </div>
                        {['Services', 'About', 'Legal'].map(cat => (
                            <div key={cat}>
                                <h5 className="outfit" style={{ color: t.txt, fontWeight: 800, marginBottom: 24 }}>{cat}</h5>
                                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                                    {['Terms of Service', 'Privacy Policy', 'Security Info'].map(l => (
                                        <li key={l}><button style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', color: t.muted, padding: 0, fontSize: "0.9rem" }}>{l}</button></li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: 80, paddingTop: 40, borderTop: `1px solid ${t.glassBorder}`, textAlign: "center", color: t.muted, fontSize: "0.8rem" }}>
                        © {new Date().getFullYear()} JustBuy Ghana. All rights reserved.
                    </div>
                </div>
            </footer>
        </ThemeCtx.Provider>
    );
}

export default App;
