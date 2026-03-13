import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DREAMS_FILE = path.join(process.cwd(), "data", "dreams.json");

export async function POST(request: Request) {
  try {
    const { dream } = await request.json();
    if (!dream || typeof dream !== "string") {
      return NextResponse.json({ error: "Missing dream text" }, { status: 400 });
    }

    const entry = { text: dream.trim(), timestamp: new Date().toISOString() };

    // Ensure data directory exists
    await fs.mkdir(path.dirname(DREAMS_FILE), { recursive: true });

    // Read existing dreams or start fresh
    let dreams: typeof entry[] = [];
    try {
      const raw = await fs.readFile(DREAMS_FILE, "utf-8");
      dreams = JSON.parse(raw);
    } catch {
      // File doesn't exist yet
    }

    dreams.push(entry);
    await fs.writeFile(DREAMS_FILE, JSON.stringify(dreams, null, 2));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to save dream" }, { status: 500 });
  }
}
