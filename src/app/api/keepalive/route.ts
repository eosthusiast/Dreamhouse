import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

// Called daily by Vercel Cron (see vercel.json) so the free Upstash database
// sees regular traffic and isn't archived for inactivity.
export async function GET(request: Request) {
  // Vercel sends `Authorization: Bearer $CRON_SECRET` on cron requests.
  // Without the secret configured, refuse everything.
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const at = new Date().toISOString();
    await redis.set("keepalive:last", at);
    return NextResponse.json({ ok: true, at });
  } catch {
    return NextResponse.json({ error: "Redis unreachable" }, { status: 500 });
  }
}
