import React, { useEffect, useState } from "react";
import type { Profile } from "../../../models/profile.models";

export function Profile() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    fetch("/profile.json")
      .then((res) => res.json())
      .then((data: Profile) => setProfile(data));
  }, []);

  if (!profile) {
    return <div className="text-white">Cargando perfil...</div>;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://www.pixground.com/wp-content/uploads/2025/08/Minimalist-Red-And-Black-Spider-man-Splatter-Wallpaper-1081x608.jpg')", // Spiderman wallpaper
      }}
    >
      <div className="bg-black bg-opacity-70 rounded-xl shadow-2xl p-8 w-full max-w-lg text-center border border-red-600">
        <img
          src={profile.image}
          alt={profile.name}
          className="w-32 h-32 rounded-full border-4 border-red-600 mx-auto mb-6 transform hover:scale-105 transition-transform duration-300"
        />
        <h1 className="text-4xl font-extrabold text-red-500 mb-2 tracking-wide">
          {profile.name}
        </h1>
        <p className="text-gray-300 text-lg mb-4 italic">{profile.description}</p>
        <p className="text-sm text-gray-400 mb-6">
          <span className="font-semibold text-red-400">Email:</span> {profile.email}
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg shadow-md transition-colors duration-300">
            Seguir
          </button>
          <button className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-lg shadow-md transition-colors duration-300">
            Mensaje
          </button>
        </div>
      </div>
    </div>
  );
}


