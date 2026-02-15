import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const date = new Date().toISOString().split("T")[0];

    const fileContent = `---
title: "${title}"
date: "${date}"
---

${content}
`;

    const filePath = path.join(
      process.cwd(),
      "content",
      "articles",
      `${slug}.md`
    );

    fs.writeFileSync(filePath, fileContent);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
