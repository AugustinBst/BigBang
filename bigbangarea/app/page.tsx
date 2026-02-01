import Arena from './components/Arena/Arena'; // Vérifie bien le chemin vers ton fichier

export default function Home() {
  return (
    <main style={{ backgroundColor: '#332', minHeight: '100vh', color: 'white' }}>
      <h1>Mon Écosystème de Dev</h1>
      <Arena />
    </main>
  );
}