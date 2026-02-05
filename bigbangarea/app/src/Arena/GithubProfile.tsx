"use client";
import { useEffect, useState } from "react";
export default function GithubProfile() {

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 2. La fonction qui appelle TA route (pas celle de GitHub directement)
        async function fetchData() {
          try {
            // C'est ici l'appel magique vers ton fichier route.ts
            const response = await fetch('/api/github/me');
            const json = await response.json();

            console.log("Données reçues du backend :", json); // Regarde ta console navigateur !
            setData(json);
          } catch (error) {
            console.error("Erreur fetch:", error);
          } finally {
            setLoading(false);
          }
        }

        fetchData();
      }, []);

    if (loading) return <div className="text-white">Chargement du profil GitHub...</div>;
    if (!data) return <div className="text-red-500">Erreur de chargement</div>;

    return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 text-white w-64">
      <div className="flex items-center gap-4 mb-4">
        <img
            src={data.user.avatar_url}
            alt="Avatar"
            className="w-12 h-12 rounded-full border-2 border-green-500"
        />
        <div>
          <h3 className="font-bold">{data.user.login}</h3>
          <p className="text-sm text-gray-400">{data.user.followers} Followers</p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs uppercase text-gray-500 font-bold">Derniers Repos :</p>
        {data.repos.map((repo: any) => (
          <div key={repo.id} className="text-sm truncate">
            ⭐ {repo.stargazers_count} - {repo.name}
          </div>
        ))}
      </div>
    </div>
  );
}
