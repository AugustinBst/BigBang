import Arena from "./Arena/Arena";
import GithubLogin from "./Arena/GithubLogin";
import GithubProfile from "./Arena/GithubProfile";


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