"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function GithubLogin() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Chargement...</p>;

  if (session) {
    return (
      <div className="flex flex-col items-end gap-2 bg-black/50 p-4 rounded-lg">
        <img
          src={session.user?.image ?? ""}
          alt="Avatar"
          className="w-10 h-10 rounded-full border-2 border-green-500"
        />
        <p className="text-sm">Salut, {session.user?.name}</p>
        <button
          onClick={() => signOut()}
          className="text-xs bg-red-900 px-2 py-1 rounded"
        >
          Déconnexion
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("github")}
      className="bg-white text-black px-4 py-2 rounded-md font-bold hover:bg-gray-200 transition"
    >
      Se connecter avec GitHub
    </button>
  );
}