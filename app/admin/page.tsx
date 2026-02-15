"use client";

import { useState } from "react";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleSave() {
    const res = await fetch("/api/save-article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      alert("Article saved!");
      setTitle("");
      setContent("");
    } else {
      alert("Error saving article");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white px-8 py-20">
      <h1 className="text-4xl text-purple-400 mb-10">
        Write Article
      </h1>

      <input
        type="text"
        placeholder="Article Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-4 bg-gray-900 border border-gray-700 mb-6 text-white"
      />

      <textarea
        placeholder="Write your markdown here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={20}
        className="w-full p-4 bg-gray-900 border border-gray-700 text-white"
      />

      <button
        onClick={handleSave}
        className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-500"
      >
        Save Article
      </button>
    </main>
  );
}
