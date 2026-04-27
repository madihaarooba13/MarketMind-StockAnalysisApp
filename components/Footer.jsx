"use client";

import Link from "next/link";

export default function Footer() {
  const getMarketStatus = () => {
    const now = new Date();

    const istTime = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );

    const day = istTime.getDay();

    // weekend closed
    if (day === 0 || day === 6) return false;

    const hours = istTime.getHours();
    const minutes = istTime.getMinutes();

    const current = hours * 60 + minutes;

    const open = 9 * 60 + 15;
    const close = 15 * 60 + 30;

    return current >= open && current <= close;
  };
  return (
    <footer className="mt-24 border-t border-gray-200 dark:border-white/10 bg-gray-50 text-gray-900 dark:bg-[#020617] dark:text-white">

      <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-12">

        {/* 🔥 LEFT - BRAND */}
        <div>
          <h2 className="text-2xl font-semibold tracking-wide">
            MarketMind
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-sm mt-3 leading-relaxed max-w-xs">
            Smart stock insights with clean UI & real-time experience.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-3 mt-6">

            {/* GITHUB */}
            <a
              href="https://github.com/madihaarooba13"
              target="_blank"
              className="group p-3 rounded-xl bg-white border border-gray-200 shadow-sm 
dark:bg-white/5 dark:border-white/10 dark:border-white/10 hover:border-white/20 hover:bg-white/10 transition"
            >
              <svg
                className="w-5 h-5 text-gray-700 dark:text-white group-hover:text-gray-900 dark:text-white transition"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 008 10.94c.58.1.79-.25.79-.56v-2.17c-3.26.71-3.95-1.57-3.95-1.57-.53-1.35-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.73 1.26 3.4.96.1-.76.41-1.26.74-1.55-2.6-.3-5.34-1.3-5.34-5.79 0-1.28.46-2.33 1.2-3.15-.12-.3-.52-1.5.12-3.13 0 0 .97-.31 3.2 1.2a11.1 11.1 0 015.82 0c2.23-1.5 3.2-1.2 3.2-1.2.64 1.63.24 2.83.12 3.13.75.82 1.2 1.87 1.2 3.15 0 4.5-2.75 5.48-5.36 5.78.42.36.8 1.08.8 2.18v3.23c0 .31.2.67.8.56A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
              </svg>
            </a>

            {/* LINKEDIN */}
            <a
              href="https://www.linkedin.com/in/madiha-arooba-88300330a/"
              target="_blank"
              className="group p-3 rounded-xl bg-white border border-gray-200 shadow-sm 
dark:bg-white/5 dark:border-white/10 dark:border-white/10 hover:border-white/20 hover:bg-white/10 transition"
            >
              <svg
                className="w-5 h-5 text-gray-700 dark:text-white group-hover:text-gray-900 dark:text-white transition"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1 5 2.12 5 3.5zM.22 8.98h4.56V24H.22zM8.98 8.98h4.37v2.05h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.48 3.04 5.48 6.99V24h-4.56v-6.87c0-1.64-.03-3.75-2.28-3.75-2.28 0-2.63 1.78-2.63 3.63V24H8.98z" />
              </svg>
            </a>

          </div>

          <p className="text-xs text-gray-500 mt-5">
            Built with ❤️ by Madiha
          </p>
        </div>

        {/* 🔥 MIDDLE - LINKS */}
        <div>
          <p className="text-sm font-medium mb-3 text-gray-900 dark:text-white">Explore</p>

          <div className="flex flex-col gap-2 text-gray-600 dark:text-gray-400 text-sm">
            <Link href="/" className="hover:text-gray-900 dark:text-white transition">
              Home
            </Link>
            <Link href="/markets" className="hover:text-gray-900 dark:text-white transition">
              Markets
            </Link>
            <Link href="/watchlist" className="hover:text-gray-900 dark:text-white transition">
              Watchlist
            </Link>
          </div>
        </div>

        {/* 🔥 RIGHT - STATUS CARD */}
        <div>
          <p className="text-sm font-medium mb-3 text-gray-900 dark:text-white">Market Status</p>

          <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm 
dark:bg-white/5 dark:border-white/10 dark:border-white/10 flex items-center justify-between">

            <div className="flex items-center gap-2 text-sm">
              {/* <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-green-400">Open</span> */}
              <span
                className={`w-2 h-2 rounded-full animate-pulse ${getMarketStatus() ? "bg-green-400" : "bg-red-400"
                  }`}
              ></span>

              <span
                className={`${getMarketStatus() ? "text-green-400" : "text-red-400"
                  }`}
              >
                {getMarketStatus() ? "Open" : "Closed"}
              </span>
            </div>

            <span className="text-xs text-gray-500">
              Live
            </span>
          </div>
        </div>

      </div>

      {/* 🔥 BOTTOM */}
      <div className="border-t border-gray-200 dark:border-white/10 text-center text-xs text-gray-500 py-5">
        © {new Date().getFullYear()} MarketMind — All rights reserved
      </div>
    </footer>
  );
}