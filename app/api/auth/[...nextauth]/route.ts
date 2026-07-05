/**
 * Mock Google OAuth simulation endpoint.
 *
 * Follows the NextAuth.js callback pattern:
 *   POST /api/auth/signin/google  → mock OAuth sign-in
 *   POST /api/auth/session/update → persist profile edits
 *   POST /api/auth/signout        → clear session
 *   GET  /api/auth/session         → fetch current session
 *
 * Persistence is driven by the client via localStorage (lib/auth.ts).
 * This route acts as the server-side "OAuth provider" that returns
 * the canonical user record on each sign-in event.
 */

import { NextResponse } from "next/server";
import type { MockUser } from "@/lib/auth";

/* ── Default mock user (server-side mirror) ────────────── */

const DEFAULT_USER: MockUser = {
  name: "Dhani Akmal",
  email: "dhani.akmal@laptoppintar.id",
  avatarInitials: "DA",
  username: "dhani",
  major: "S1 Sistem Informasi",
  provider: "google",
  image: null,
};

/* ── JWT / Session callback simulation ────────────────── */

function buildSessionPayload(user: MockUser) {
  const now = Date.now();
  return {
    user,
    expires: new Date(now + 30 * 24 * 60 * 60 * 1000).toISOString(),
    accessToken: `mock_jwt_${now}_${user.email}`,
  };
}

/* ── Route handlers ───────────────────────────────────── */

export async function GET() {
  return NextResponse.json({
    message: "Mock OAuth session endpoint. Use POST to interact.",
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const action = body?.action as string | undefined;

    switch (action) {
      /**
       * "signin" — Simulates Google OAuth callback.
       *
       * The client sends its locally-stored user record (if any).
       * - If the client has a persisted record → return it as-is
       *   (simulates: "the DB already has this user, return their profile").
       * - If the client sends nothing → return the default seed record
       *   (simulates: "first-time Google login, create new user").
       *
       * jwt callback simulation:
       *   The returned `user` is what gets encoded into the JWT.
       */
      case "signin": {
        const existingUser = body?.existingUser as MockUser | undefined;
        const user = existingUser ?? DEFAULT_USER;
        const session = buildSessionPayload(user);
        return NextResponse.json({ ok: true, session });
      }

      /**
       * "update" — Simulates the session callback after profile mutation.
       *
       * The client sends the updated user fields.
       * Server echoes back the merged record (the "latest state").
       * jwt callback: encode the updated user into the token.
       * session callback: expose the updated user to the client.
       */
      case "update": {
        const incoming = body?.user as Partial<MockUser> | undefined;
        if (!incoming) {
          return NextResponse.json({ ok: false, error: "Missing 'user' payload" }, { status: 400 });
        }
        const merged: MockUser = { ...DEFAULT_USER, ...incoming };
        const session = buildSessionPayload(merged);
        return NextResponse.json({ ok: true, session });
      }

      /**
       * "signout" — Clears the server-side session.
       *
       * In a real NextAuth flow this invalidates the JWT.
       * Here we just acknowledge; the client clears localStorage.
       */
      case "signout": {
        return NextResponse.json({ ok: true, session: null });
      }

      default:
        return NextResponse.json(
          { ok: false, error: `Unknown action: ${action ?? "(none)"}` },
          { status: 400 }
        );
    }
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}
