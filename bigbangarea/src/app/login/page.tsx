'use client';

import { signIn } from 'next-auth/react';
import { Github, Sparkles, Lock, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignIn = async () => {
    setIsLoading(true);
    await signIn('github', { callbackUrl: '/' });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-200 via-purple-300 to-slate-400 p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-96 w-96 animate-pulse rounded-full bg-cyan-100 blur-3xl" />
        <div className="absolute -right-1/4 top-1/3 h-96 w-96 animate-pulse rounded-full bg-cyan-100 blur-3xl animation-delay-2000" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Main card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Glow effect behind card */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-100 via-pink-300 to-blue-300 opacity-75 blur-xl" />

        <div className="relative rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl sm:p-12">
          {/* Icon header with animation */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-purple-200" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50">
                <Lock className="h-10 w-10 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          {/* Title section */}
          <div className="mb-8 text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
              <h1 className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                Bienvenue
              </h1>
              <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse animation-delay-1000" />
            </div>
            <p className="text-slate-300 text-sm sm:text-base">
              Connecte-toi pour accéder à ton espace
            </p>
          </div>

          {/* Info card */}
          <div className="mb-8 rounded-2xl border border-purple-500/20 bg-purple-500/10 p-4 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20">
                  <Lock className="h-4 w-4 text-purple-300" />
                </div>
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-purple-200">
                  Connexion sécurisée
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Authentification via GitHub pour une expérience rapide et sécurisée
                </p>
              </div>
            </div>
          </div>

          {/* Sign in button */}
          <button
            onClick={handleSignIn}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            disabled={isLoading}
            className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 p-[2px] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/50 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="relative flex items-center justify-center gap-3 rounded-[10px] bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 text-white transition-all duration-300">
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              {isLoading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  <span className="relative font-semibold">Connexion en cours...</span>
                </>
              ) : (
                <>
                  <Github className="relative h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                  <span className="relative font-semibold text-base">
                    Se connecter avec GitHub
                  </span>
                  <ArrowRight 
                    className={`relative h-5 w-5 transition-all duration-300 ${
                      isHovering ? 'translate-x-1' : ''
                    }`}
                  />
                </>
              )}
            </div>
          </button>

          {/* Footer text */}
          <div className="mt-8 text-center">
            <p className="text-xs text-slate-200">
              En te connectant, tu acceptes nos conditions d'utilisation
            </p>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-2 -left-2 h-24 w-24 rounded-full bg-purple-500/10 blur-2xl" />
          <div className="absolute -right-2 -top-2 h-24 w-24 rounded-full bg-pink-500/10 blur-2xl" />
        </div>

      </div>

      {/* Floating particles effect */}
      {mounted && (
        <div className="pointer-events-none absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white/20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
      )}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}