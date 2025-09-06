import { useEffect, useRef } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

export default function GoogleTranslate() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // 1) Load the Google script once
    if (!document.getElementById("google-translate-script")) {
      const s = document.createElement("script");
      s.id = "google-translate-script";
      s.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      s.async = true;
      document.body.appendChild(s);
    }

    // 2) Init once Google is ready
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,si,ta",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );

      // 3) Wait for the real select (.goog-te-combo), then style/wrap it
      const target = document.getElementById("google_translate_element");
      if (!target) return;

      const observer = new MutationObserver(() => {
        const select =
          target.querySelector<HTMLSelectElement>(".goog-te-combo");
        if (!select) return;

        // --- Language persistence ---
        const savedLang = localStorage.getItem("selectedLang");
        if (savedLang) {
          select.value = savedLang;
          select.dispatchEvent(new Event("change"));
        }
        select.addEventListener("change", () => {
          localStorage.setItem("selectedLang", select.value);
        });

        // --- Clean up Google’s extra text around the select ---
        // The gadget often renders: "Select Language ▼"
        // We’ll hide the text spans but keep the select visible.
        const gadget = target.querySelector(".goog-te-gadget");
        if (gadget) {
          // Keep attribution available for compliance, but minimize visual noise
          // Hide inline label text
          gadget.querySelectorAll("span:not(.goog-te-combo)").forEach((el) => {
            (el as HTMLElement).style.display = "none";
          });
          // Remove default gadget font-size
          (gadget as HTMLElement).style.fontSize = "0";
        }

        // --- Build a styled shell around the native select ---
        // This keeps native behavior (keyboard, mobile pickers) but looks custom.
        if (!target.querySelector(".gt-shell")) {
          const shell = document.createElement("div");
          shell.className =
            "gt-shell relative inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 shadow-sm hover:shadow transition " +
            "bg-white text-sm text-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-700";

          // Optional label
          const label = document.createElement("span");
          label.className = "text-neutral-500 dark:text-neutral-400 text-xs";
          label.textContent = "Language";

          // Chevron
          const chevron = document.createElement("span");
          chevron.className =
            "pointer-events-none absolute right-3 text-neutral-400";
          chevron.innerHTML =
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 10l5 5 5-5z"/></svg>';

          // Style the native select to fill the shell invisibly
          select.classList.add("gt-native");
          select.style.opacity = "0";
          select.style.position = "absolute";
          select.style.inset = "0";
          select.style.width = "100%";
          select.style.height = "100%";
          select.style.cursor = "pointer";

          // Display current value text (so we can style it).
          const valueText = document.createElement("span");
          valueText.className = "gt-value";
          valueText.textContent =
            select.options[select.selectedIndex]?.text || "English";

          select.addEventListener("change", () => {
            valueText.textContent =
              select.options[select.selectedIndex]?.text || "English";
          });

          // Compose
          shell.appendChild(label);
          shell.appendChild(valueText);
          shell.appendChild(chevron);
          shell.appendChild(select); // native select on top (but transparent)
          target.appendChild(shell);
        }

        // Once we’ve styled it, we can stop observing
        observer.disconnect();
      });

      observer.observe(target, { childList: true, subtree: true });

      // 4) Optional: global CSS overrides for a bit more polish
      const style = document.createElement("style");
      style.innerHTML = `
        /* Hide top page offset that Google sometimes injects */
        body { top: 0 !important; }

        /* Keep the select visible but remove default chrome when not wrapped yet */
        #google_translate_element .goog-te-combo {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          background: transparent;
          border: none;
          padding: 0.5rem 2rem 0.5rem 0.25rem;
          font-size: 14px;
          line-height: 1.25rem;
        }

        /* Keep attribution minimally visible for compliance (small, subtle) */
        .goog-logo-link, .goog-te-gadget .goog-te-combo + div,
        .goog-te-gadget-simple img { display: none !important; }
        .goog-te-gadget { color: inherit !important; }

        /* Dark mode helpers if your site has dark mode */
        @media (prefers-color-scheme: dark) {
          .gt-shell { background: #0a0a0a; color: #e5e5e5; border-color: #3f3f46; }
        }
      `;
      document.head.appendChild(style);
    };

    return () => {
      // no-op; we intentionally keep the script and styles
    };
  }, []);

  // Wrapper where Google mounts the widget
  return (
    <div
      className="
    inline-block
    rounded-xl
    border border-neutral-300
    bg-green-200
    px-3 py-2
    shadow-sm
    hover:shadow
    transition
    dark:bg-green-900 dark:border-neutral-700
  "
    >
      <div id="google_translate_element" />
    </div>
  );
}
