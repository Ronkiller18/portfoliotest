// ─── home.js — home page only ─────────────────────────────

const facts = {
  1:  "Once spent 6 hours debugging a typo in a variable name.",
  2:  "Wrote 55 automated tests for LockBox before calling it done.",
  3:  "First vulnerability found: a stored XSS in a practice lab.",
  4:  "Prefers dark mode so strongly it's the default in every project.",
  5:  "Built a password manager because subscriptions for basic tools feel wrong.",
  6:  "Can explain PBKDF2 key derivation without looking it up.",
  7:  "Tests payloads in Burp Suite before writing the fix.",
  8:  "Believes client-side auth checks are basically decoration.",
  9:  "Once rebuilt an entire CSS file because it was too cramped to read.",
  10: "Thinks about how a feature could be exploited before how it works.",
  11: "Uses Tailscale instead of opening ports to the internet.",
  12: "Wrote a sync engine with last-write-wins conflict resolution from scratch.",
  13: "Favorite encryption library: Python's cryptography package.",
  14: "Has strong opinions about constant-time string comparison.",
  15: "Builds tools for personal use first, polish second.",
  16: "Reads CWE references for fun, not just for projects.",
  17: "Believes a good README is part of the actual deliverable.",
  18: "Tracks down root causes instead of patching symptoms.",
  19: "Thinks atomic file writes should be the default everywhere.",
  20: "Critical hit — always double-checks for SQL injection, just in case."
};

let rolling = false;
let rollCount = 0;

function rollDie() {
  if (rolling) return;
  rolling = true;

  const dieEl    = document.getElementById('die');
  const numEl    = document.getElementById('dieNum');
  const factEl   = document.getElementById('factText');
  const countEl  = document.getElementById('rollCount');

  // Start spin
  dieEl.classList.remove('die-land');
  dieEl.classList.add('die-spin');
  numEl.classList.add('die-num-blur');

  let ticks = 0;
  const iv = setInterval(() => {
    numEl.textContent = Math.ceil(Math.random() * 20);
    ticks++;

    if (ticks > 10) {
      clearInterval(iv);

      const result = Math.ceil(Math.random() * 20);
      numEl.textContent = result;

      // Switch to land animation
      dieEl.classList.remove('die-spin');
      dieEl.classList.add('die-land');
      numEl.classList.remove('die-num-blur');

      // Fact fade-in after settle
      setTimeout(() => {
        factEl.classList.remove('fact-placeholder');
        factEl.style.opacity = '0';
        factEl.textContent = facts[result];
        factEl.animate(
          [{ opacity: 0, transform: 'translateY(4px)' },
           { opacity: 1, transform: 'translateY(0)' }],
          { duration: 280, easing: 'ease', fill: 'forwards' }
        );

        rollCount++;
        if (countEl) countEl.textContent = `Rolled ${rollCount} time${rollCount !== 1 ? 's' : ''}`;

        rolling = false;
      }, 420);
    }
  }, 65);
}