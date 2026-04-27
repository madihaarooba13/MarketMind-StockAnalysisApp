"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session } = useSession();

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [gender, setGender] = useState("other");
  const [dob, setDob] = useState("");
  const [location, setLocation] = useState("India 🇮🇳");
  const [mobile, setMobile] = useState("");
  const [bio, setBio] = useState("");
  const [market, setMarket] = useState("NSE");
  const [currency, setCurrency] = useState("INR");

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/user/${session.user.email}`)
        .then(res => res.json())
        .then(data => {
          setName(data.name || "");
          setGender(data.gender || "other");
          setDob(data.dob?.split("T")[0] || "");
          setLocation(data.location || "India 🇮🇳");
          setMobile(data.mobile || "");
          setBio(data.bio || "");
          setMarket(data.preferences?.market || "NSE");
          setCurrency(data.preferences?.currency || "INR");
        });
    }
  }, [session]);

  const isValidMobile = (num) => {
    if (!num) return true;
    return /^[0-9]{10}$/.test(num);
  };

  const handleSave = async () => {
    if (!name || !dob) {
      toast.error("Name & DOB required ❌");
      return;
    }

    if (!isValidMobile(mobile)) {
      toast.error("Invalid mobile number ❌");
      return;
    }

    const res = await fetch("/api/user/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: session.user.email,
        name,
        gender,
        dob,
        location,
        mobile,
        bio,
        preferences: { market, currency },
      }),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Profile updated ✅");
      setIsEditing(false);
    } else {
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex justify-center items-center bg-[#020617] text-white px-4 py-20">
        <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

          <h2 className="text-2xl mb-6 text-center">Your Profile</h2>

          {/* EMAIL */}
          <p className="text-sm text-gray-400">Email</p>
          <p className="mb-4">{session?.user?.email}</p>

          {/* NAME */}
          <Input label="Name *" value={name} setValue={setName} disabled={!isEditing} />

          {/* GENDER */}
          <Dropdown label="Gender" value={gender} setValue={setGender} disabled={!isEditing}
            options={["male", "female", "other"]} />

          {/* DOB */}
          <Input label="DOB *" type="date" value={dob} setValue={setDob} disabled={!isEditing} />

          {/* LOCATION */}
          <Dropdown label="Location"
            value={location}
            setValue={setLocation}
            disabled={!isEditing}
            options={["India 🇮🇳", "USA 🇺🇸", "UK 🇬🇧", "Canada 🇨🇦", "Australia 🇦🇺"]}
          />

          {/* MOBILE */}
          <Input label="Mobile" value={mobile} setValue={setMobile} disabled={!isEditing} />

          {/* BIO */}
          <div className="mt-3">
            <label className="text-sm text-gray-400">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell something about yourself..."
              disabled={!isEditing}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-blue-500"
            />
          </div>

          {/* PREF */}
          <Dropdown label="Market" value={market} setValue={setMarket} disabled={!isEditing}
            options={["NSE", "US"]} />

          <Dropdown label="Currency" value={currency} setValue={setCurrency} disabled={!isEditing}
            options={["INR", "USD"]} />

          {/* BUTTON */}
          <div className="mt-6">
            {isEditing ? (
              <div className="flex gap-3">
                <button onClick={handleSave}
                  className="flex-1 bg-blue-500 py-2 rounded-xl hover:scale-[1.02] transition">
                  Save
                </button>

                <button onClick={() => setIsEditing(false)}
                  className="flex-1 border border-white/20 py-2 rounded-xl">
                  Cancel
                </button>
              </div>
            ) : (
              <button onClick={() => setIsEditing(true)}
                className="w-full bg-white/10 py-2 rounded-xl">
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

/* INPUT */
function Input({ label, value, setValue, disabled, type = "text" }) {
  return (
    <div className="mt-3">
      <label className="text-sm text-gray-400">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        className="w-full mt-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-blue-500"
      />
    </div>
  );
}

/* DROPDOWN */
function Dropdown({ label, value, setValue, disabled, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div className="mt-3 relative" ref={ref}>
      <label className="text-sm text-gray-400">{label}</label>

      <div
        onClick={() => !disabled && setOpen(!open)}
        className="w-full mt-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 cursor-pointer"
      >
        {value}
      </div>

      {open && (
        <div className="absolute z-50 w-full mt-2 bg-[#020617] border border-white/10 rounded-xl shadow-lg animate-fadeIn">
          {options.map((opt, i) => (
            <div
              key={i}
              onClick={() => {
                setValue(opt);
                setOpen(false);
              }}
              className="px-3 py-2 hover:bg-blue-500/20 cursor-pointer"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}