

// "use client";

// import { useState, useEffect } from "react";
// import { Search, Bell, User, Menu, X } from "lucide-react";

// export default function Navbar({ onSearch }) {
//   const [query, setQuery] = useState("");
//   const [dark, setDark] = useState(true);
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     document.documentElement.classList.add("dark");
//   }, []);

//   const toggleTheme = () => {
//     setDark(!dark);
//     document.documentElement.classList.toggle("dark");
//   };

//   const handleSearch = () => {
//     if (query.trim()) onSearch(query);
//   };

//   return (
//     <nav className="px-4 sm:px-6 py-4 
//     bg-white/80 dark:bg-[#020617]/80 backdrop-blur-md 
//     border-b border-gray-200 dark:border-gray-800 shadow-sm relative">

//       {/* MOBILE LOGO */}
//       <div className="lg:hidden flex justify-center mb-3">
//         <h1 className="text-xl font-bold text-blue-600 cursor-pointer 
//         hover:scale-110 hover:text-blue-500 transition duration-300">
//           MarketMind
//         </h1>
//       </div>

//       {/* MAIN ROW */}
//       <div className="flex items-center justify-between gap-3">

//         {/* DESKTOP LOGO */}
//         <h1 className="hidden lg:block text-2xl font-bold text-blue-600 cursor-pointer 
//         hover:scale-110 hover:text-blue-500 transition duration-300">
//           MarketMind
//         </h1>

//         {/* SEARCH (FIXED WIDTH ON SMALL) */}
//         <div className="group relative flex items-center px-4 py-2 rounded-xl 
//         flex-1 max-w-[180px] sm:max-w-[250px] lg:w-[35%]
//         bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700
//         transition-transform duration-300

//         hover:scale-[1.02] hover:shadow-md hover:bg-gray-200 dark:hover:bg-gray-700

//         focus-within:scale-[1.02] focus-within:shadow-md 
//         focus-within:bg-gray-300 dark:focus-within:bg-gray-700
//         ">

//           <div className="absolute inset-0 rounded-xl pointer-events-none">
//             <div className="absolute inset-0 rounded-xl border-2 border-transparent 
//             bg-[linear-gradient(120deg,transparent,rgba(59,130,246,0.6),transparent)] 
//             bg-[length:200%_200%] animate-[shine_3s_linear_infinite] opacity-0 
//             group-hover:opacity-100 focus-within:opacity-100"></div>
//           </div>

//           <Search className="w-4 h-4 text-gray-400 mr-2 z-10 group-hover:text-blue-500 transition" />

//           <input
//             type="text"
//             placeholder="Try AAPL, TSLA, TCS..."
//             className="bg-transparent outline-none flex-1 text-gray-900 dark:text-white 
//             placeholder-gray-500 dark:placeholder-gray-400
//             focus:placeholder-gray-300 z-10 text-sm"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//           />
//         </div>

//         {/* NAV LINKS */}
//         <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
//           {["Home", "Dashboard", "Watchlist", "Markets"].map((item) => (
//             <span
//               key={item}
//               className="cursor-pointer text-gray-900 dark:text-gray-300 
//               hover:text-blue-500 dark:hover:text-blue-400 transition-transform duration-300"
//             >
//               {item}
//             </span>
//           ))}
//         </div>

//         {/* RIGHT */}
//         <div className="flex items-center gap-1 shrink-0">

//           <Bell className="w-5 h-5 cursor-pointer text-gray-700 dark:text-gray-300 
//           hover:text-blue-500 dark:hover:text-blue-400 transition" />

//           <button
//             onClick={toggleTheme}
//             className="px-2 sm:px-3 py-1.5 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 shadow-sm 
//             hover:bg-gray-200 dark:hover:bg-gray-600 
//             hover:scale-105 transition cursor-pointer text-sm"
//           >
//             {dark ? "☀️" : "🌙"}
//           </button>

//           <button className="px-2 sm:px-3 py-1.5 rounded-lg text-gray-900 dark:text-gray-300 
//           hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer text-sm">
//             Login
//           </button>

//           <User className="w-5 sm:w-6 h-5 sm:h-6 cursor-pointer text-gray-700 dark:text-gray-300 
//           hover:text-blue-500 dark:hover:text-blue-400 transition" />

//           <button
//             className="block lg:hidden ml-1"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? <X /> : <Menu />}
//           </button>
//         </div>
//       </div>

//       {/* MOBILE MENU */}
//       {menuOpen && (
//         <div className="absolute top-full left-0 w-full mt-2 px-4 py-4 
//         bg-white dark:bg-[#020617] border-t border-gray-200 dark:border-gray-800 
//         flex flex-col gap-4 text-sm font-medium lg:hidden">

//           {["Home", "Dashboard", "Watchlist", "Markets"].map((item) => (
//             <span
//               key={item}
//               className="cursor-pointer text-gray-900 dark:text-gray-300 
//               hover:text-blue-500 dark:hover:text-blue-400 transition"
//             >
//               {item}
//             </span>
//           ))}
//         </div>
//       )}
//     </nav>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { Search, Bell, User, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);

  // import { signIn, signOut, useSession } from "next-auth/react";

  const { data: session } = useSession();

  // const handleLogin = async (provider) => {
  //   toast.loading("Logging in...");

  //   await signIn(provider, { callbackUrl: "/?login=success" });

  //   toast.dismiss();
  //   toast.success("Login successful 🎉");
  // };

  const handleLogin = async (provider) => {
    await signIn(provider, { callbackUrl: "/?login=success" });
  };

  // const handleLogout = async () => {
  //   toast.loading("Logging out...");

  //   await signOut({ callbackUrl: "/" });

  //   toast.dismiss();
  //   toast.success("Logged out successfully 👋");
  // };

  const getColorFromEmail = (email) => {
    const colors = [
      "bg-red-500",
      "bg-green-500",
      "bg-blue-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
    ];

    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/?logout=success" });
  };

  useEffect(() => {
  if (menuOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}, [menuOpen]);
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  // const handleSearch = () => {
  //   if (query.trim()) onSearch(query);
  // };

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/stock/${query.toUpperCase()}`);
    }
  };
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Watchlist", path: "/watchlist" },
    { name: "Markets", path: "/markets" },
  ];

  const handleHomeClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 py-4
bg-white/90 dark:bg-[#020617]/90 backdrop-blur-md
border-b border-gray-200 dark:border-gray-800">

      {/* 🔥 MOBILE LOGO */}
      {/* <div className="lg:hidden flex justify-center mb-3">
        <h1 className="text-xl font-bold text-blue-600 cursor-pointer 
        hover:scale-110 hover:text-blue-500 transition duration-300">
          MarketMind
        </h1>
      </div> */}
      <div className="lg:hidden flex justify-center mb-3">
        <Link href="/" onClick={handleHomeClick}>
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer 
    hover:scale-110 hover:text-blue-500 transition duration-300">
            MarketMind
          </h1>
        </Link>
      </div>

      {/* 🔥 MAIN ROW */}
      <div className="flex items-center justify-between gap-2">

        {/* DESKTOP LOGO */}
        {/* <h1 className="hidden lg:block text-2xl font-bold text-blue-600 cursor-pointer 
        hover:scale-110 hover:text-blue-500 transition duration-300">
          MarketMind
        </h1> */}
        <Link href="/" onClick={handleHomeClick}>
          <h1 className="hidden lg:block text-2xl font-bold text-blue-600 cursor-pointer 
  hover:scale-110 hover:text-blue-500 transition duration-300">
            MarketMind
          </h1>
        </Link>

        {/* 🔥 SEARCH (ORIGINAL STYLE + FIXED SIZE) */}
        <div className="group relative flex items-center px-4 py-2 rounded-xl 
        flex-1 min-w-[100px] max-w-[180px] sm:max-w-[300px] lg:w-[35%] sm:max-w-[300px] lg:w-[35%]
        bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-sm
        transition-transform duration-300

        hover:shadow-md hover:bg-gray-200 dark:hover:bg-gray-700

       focus-within:shadow-md 
focus-within:ring-2 focus-within:ring-blue-400
        ">

          {/* 🔥 SHINE EFFECT BACK */}
          <div className="absolute inset-0 rounded-xl pointer-events-none">
            <div className="absolute inset-0 rounded-xl border-2 border-transparent 
            bg-[linear-gradient(120deg,transparent,rgba(59,130,246,0.6),transparent)] 
            bg-[length:200%_200%] animate-[shine_3s_linear_infinite] opacity-0 
            group-hover:opacity-100 focus-within:opacity-100"></div>
          </div>

          <Search className="w-4 h-4 text-gray-400 mr-2 z-10 group-hover:text-blue-500 transition" />

          <input
            type="text"
            placeholder="Try AAPL, TSLA..."
           className="bg-transparent outline-none flex-1 pr-10 text-gray-900 dark:text-white 
placeholder-gray-500 dark:placeholder-gray-400
focus:placeholder-gray-300 z-10 text-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          <button
  onClick={handleSearch}
  className="absolute right-2 p-1.5 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition z-10"
>
  <Search size={16} />
</button>
        </div>

        {/* 🔥 NAV LINKS (SAME LINE DESKTOP) */}
        {/* <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {["Home", "Dashboard", "Watchlist", "Markets"].map((item) => (
            <span
              key={item}
              className="cursor-pointer text-gray-900 dark:text-gray-300 
              hover:text-blue-500 dark:hover:text-blue-400 transition-transform duration-300"
            >
              {item}
            </span>
          ))}
        </div> */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={item.name === "Home" ? handleHomeClick : undefined}
              className="cursor-pointer text-gray-900 dark:text-gray-300 
      hover:text-blue-500 dark:hover:text-blue-400 transition-transform duration-300"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* 🔥 RIGHT */}
        <div className="flex items-center gap-2 shrink-0">

          {/* <Bell className="w-5 h-5 cursor-pointer text-gray-700 dark:text-gray-300 
          hover:text-blue-500 dark:hover:text-blue-400 transition" /> */}
          <Bell
            onClick={() => toast("No notifications yet 🔔")}
            className="w-5 h-5 cursor-pointer text-gray-700 dark:text-gray-300 
  hover:text-blue-500 dark:hover:text-blue-400 transition"
          />

          <button
            onClick={toggleTheme}
            className="px-2 sm:px-3 py-1.5 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 shadow-sm 
            hover:bg-gray-200 dark:hover:bg-gray-600 
            hover:scale-105 transition cursor-pointer text-sm"
          >
            {dark ? "☀️" : "🌙"}
          </button>

          {/* hide on small */}
          {!session ? (
            <button
              onClick={() => signIn(undefined, { callbackUrl: "/?login=success" })}
              className="block px-2 py-1.5 rounded-lg 
text-gray-900 dark:text-gray-300 
hover:bg-gray-200 dark:hover:bg-gray-700 transition text-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="hidden sm:block px-2 sm:px-3 py-1.5 rounded-lg 
    text-gray-900 dark:text-gray-300 
    hover:bg-gray-200 dark:hover:bg-gray-700 transition text-sm"
            >
              Logout
            </button>
          )}

          {/* <User className="hidden sm:block w-5 sm:w-6 h-5 sm:h-6 cursor-pointer text-gray-700 dark:text-gray-300 
          hover:text-blue-500 dark:hover:text-blue-400 transition" /> */}

          <div className="relative block">
            <div className="relative ">
              {session ? (
                <div
                  onClick={() => setProfileOpen(!profileOpen)}
                  className={`w-7 h-7 flex items-center justify-center rounded-full 
      text-white font-semibold cursor-pointer 
      ${getColorFromEmail(session.user.email)}`}
                >
                  {session.user.email[0].toUpperCase()}
                </div>
              ) : (
                <User className="w-6 h-6 cursor-pointer" />
              )}

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-xl 
    bg-[#020617] border border-white/10 shadow-lg p-4 z-50">

                  <p className="text-sm text-gray-400 mb-2">Signed in as</p>
                  <p className="text-white text-sm break-words mb-3">
                    {session?.user?.email}
                  </p>

                  <button
                    onClick={() => router.push("/profile")}
                    className="w-full text-left text-sm px-3 py-2 rounded-lg hover:bg-white/10"
                  >
                    Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-sm px-3 py-2 rounded-lg text-red-400 hover:bg-white/10 mt-2"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* hamburger */}
          <button
            className="block lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

     

      {/* 🔥 MOBILE MENU */}
      {/* 🔥 MOBILE MENU */}
<div
  className={`fixed inset-0 z-[999] transition-all duration-300
  ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
>
  {/* 🌑 BACKDROP (FULL SCREEN CLICK CLOSE) */}
  <div
    onClick={() => setMenuOpen(false)}
    className={`absolute inset-0 bg-black/70 backdrop-blur-sm
    transition-opacity duration-300
    ${menuOpen ? "opacity-100" : "opacity-0"}`}
  />

  {/* 💙 DRAWER */}
  <div
   onClick={(e) => e.stopPropagation()}
    className={`absolute top-0 right-0 h-screen w-[90%] max-w-sm
    bg-[#020617]
    border-l border-blue-500/20
    shadow-2xl shadow-blue-500/20
    p-6 pt-8 flex flex-col
    transform transition-transform duration-300 ease-out
    ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
    
    /* 👇 SWIPE CLOSE LOGIC */
    onTouchStart={(e) => (window.startX = e.touches[0].clientX)}
    onTouchEnd={(e) => {
      const endX = e.changedTouches[0].clientX;
      if (endX - window.startX > 80) {
        setMenuOpen(false); // swipe right → close
      }
    }}
  >

    {/* 🔥 HEADER */}
    <div className="flex items-center justify-between mb-6 pb-4 border-b border-blue-500/20">

      <div className="flex items-center gap-3">
        {session ? (
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
            {session.user.email[0].toUpperCase()}
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
            <User className="text-white" />
          </div>
        )}

        <div>
          <p className="text-white text-sm font-medium">
            {session ? session.user.email.split("@")[0] : "Guest"}
          </p>
          <p className="text-xs text-blue-300/70">
            {session ? session.user.email : "Not logged in"}
          </p>
        </div>
      </div>

      <button onClick={() => setMenuOpen(false)}>
        <X className="text-white" />
      </button>
    </div>

    {/* 🚀 NAV ITEMS (BOX STYLE 🔥) */}
    <div className="flex flex-col gap-3">
      {navLinks.map((item) => (
        <Link
          key={item.name}
          href={item.path}
          onClick={() => {
            setMenuOpen(false);
            if (item.name === "Home") handleHomeClick();
          }}
          className="flex items-center justify-between
          px-4 py-4 rounded-xl
          border border-blue-500/20
          text-gray-300
          hover:bg-blue-500/10 hover:border-blue-400
          transition-all duration-300 group"
        >
          {item.name}
          <span className="opacity-0 group-hover:opacity-100 transition">→</span>
        </Link>
      ))}
    </div>

    {/* ✨ SPACER */}
    <div className="flex-1" />

    {/* ⚡ ACTIONS */}
    <div className="flex flex-col gap-3 pt-4 border-t border-blue-500/20">
      {!session ? (
        <button
          onClick={() => signIn(undefined, { callbackUrl: "/?login=success" })}
          className="w-full bg-blue-500 hover:bg-blue-600
          text-white py-3 rounded-xl font-medium
          shadow-lg shadow-blue-500/30 transition"
        >
          🚀 Login
        </button>
      ) : (
        <>
          <button
            onClick={() => {
              setMenuOpen(false);
              router.push("/profile");
            }}
            className="px-4 py-4 rounded-xl border border-blue-500/20
            text-gray-300 hover:bg-blue-500/10 transition"
          >
            👤 Profile
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-4 rounded-xl border border-red-500/20
            text-red-400 hover:bg-red-500/10 transition"
          >
            🚪 Logout
          </button>
        </>
      )}
    </div>
  </div>
</div>
    </nav>
  );
}