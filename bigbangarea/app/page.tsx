import Arena from './components/Arena/Arena'; // Vérifie bien le chemin vers ton fichier
import GithubProfile from './components/Arena/GithubProfile';

export default function Home() {
  return (
    <main style={{ backgroundColor: '#332', minHeight: '100vh', color: 'white' }}>
      <div className="absolute top-4 right-4 z-10">
        <GithubProfile />
      </div>
      <Arena />
    </main>
  );
}