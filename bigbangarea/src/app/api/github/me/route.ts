import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function GET() {
    try {
        const {data: user} = await octokit.rest.users.getAuthenticated();

        const { data: repos } = await octokit.rest.repos.listForAuthenticatedUser({
            visibility: 'public',
            per_page: 5,
            sort: 'updated'
        });

        return NextResponse.json({
            user,
            repos
        });

    } catch (error) {
    console.error("Erreur GitHub API:", error);
    return NextResponse.json({ error: "Impossible de parler à GitHub" }, { status: 500 });
  }
}