import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redis = Redis.fromEnv();

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 h"),
  prefix: "ratelimit:dreams",
});

const VALID_TYPES = ["dream", "dream-support"] as const;

export async function POST(request: Request) {
  try {
    // Rate limit by IP — 5 submissions per hour
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return NextResponse.json({ error: "Too many submissions. Try again later." }, { status: 429 });
    }

    const { dream, type = "dream" } = await request.json();
    if (!dream || typeof dream !== "string") {
      return NextResponse.json({ error: "Missing dream text" }, { status: 400 });
    }
    if (!VALID_TYPES.includes(type)) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    const entry = { text: dream.trim(), type, timestamp: new Date().toISOString() };

    await redis.lpush(type, JSON.stringify(entry));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to save dream" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.DREAMS_API_KEY}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    if (type && VALID_TYPES.includes(type as typeof VALID_TYPES[number])) {
      const entries = await redis.lrange(type, 0, -1);
      const parsed = entries.map((d) => typeof d === "string" ? JSON.parse(d) : d);
      return NextResponse.json(parsed);
    }

    // Return both lists
    const [dreams, supports] = await Promise.all([
      redis.lrange("dream", 0, -1),
      redis.lrange("dream-support", 0, -1),
    ]);
    return NextResponse.json({
      dream: dreams.map((d) => typeof d === "string" ? JSON.parse(d) : d),
      "dream-support": supports.map((d) => typeof d === "string" ? JSON.parse(d) : d),
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch dreams" }, { status: 500 });
  }
}
