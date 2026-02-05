import Arena from './src/Arena/Arena'; // Vérifie bien le chemin vers ton fichier
import GithubLogin from './src/Arena/GithubLogin';
import GithubProfile from './src/Arena/GithubProfile';

export default function Home() {
  return (
    <main style={{ backgroundColor: '#332', minHeight: '100vh', color: 'white' }}>
      <div className="absolute top-4 right-4 z-10">
        <GithubProfile />
      </div>
      <Arena />
      <GithubLogin/>
    </main>
  );
}