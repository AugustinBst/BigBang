import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. LES EXCEPTIONS VITALES (Sinon ton app casse)
  // - /login : Il faut bien pouvoir se connecter
  // - /api/auth : Pour que GitHub puisse te répondre (callback)
  // - /_next : Pour charger le CSS et le JS de la page de login
  // - /favicon.ico : Pour éviter des erreurs 404 bêtes
  if (
    pathname === '/login' ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // 2. LE CHECK (Binaire)
  // On vérifie si un cookie de session NextAuth existe.
  // On vérifie les deux noms possibles (dev vs prod/https).
  const hasSession =
    request.cookies.has('next-auth.session-token') ||
    request.cookies.has('__Secure-next-auth.session-token');

  // 3. LA SANCTION
  // Pas de cookie ? -> Redirection immédiate vers /login
  if (!hasSession) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si on est là, c'est qu'on est connecté.
  return NextResponse.next();
}

// 4. L'OPTIMISATION
// On empêche le proxy de s'exécuter sur des fichiers statiques inutiles pour gagner des ms.
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};