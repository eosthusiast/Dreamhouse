import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function POST(request: Request) {
  try {
    const { dream } = await request.json();
    if (!dream || typeof dream !== "string") {
      return NextResponse.json({ error: "Missing dream text" }, { status: 400 });
    }

    const entry = { text: dream.trim(), timestamp: new Date().toISOString() };

    await redis.lpush("dreams", JSON.stringify(entry));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to save dream" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const dreams = await redis.lrange("dreams", 0, -1);
    const parsed = dreams.map((d) =>
      typeof d === "string" ? JSON.parse(d) : d
    );
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ error: "Failed to fetch dreams" }, { status: 500 });
  }
}
