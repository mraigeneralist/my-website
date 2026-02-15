import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

type ContentItem = {
  title: string;
  date: string;
  slug: string;
  type: "Article" | "Project";
};

function getContent(type: "articles" | "projects"): ContentItem[] {
  const dir = path.join(process.cwd(), "content", type);

  const files = fs.readdirSync(dir);

  return files.map((filename) => {
    const slug = filename.replace(".md", "");
    const filePath = path.join(dir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");

    const { data } = matter(fileContents);

    return {
      title: data.title,
      date: data.date,
      slug,
      type: type === "articles" ? "Article" : "Project",
    };
  });
}

export default function Home() {
  const articles = getContent("articles");
  const projects = getContent("projects");

  const allContent = [...articles, ...projects].sort(
    (a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="min-h-screen bg-black text-white px-8 py-20">
      <h1 className="text-4xl text-emerald-400 mb-12">
        Recently Published
      </h1>

      {allContent.map((item) => (
        <div
          key={item.slug}
          className="mb-10 border-b border-gray-800 pb-6"
        >
          <div className="flex items-center gap-4">
            <Link
              href={`/${item.type.toLowerCase()}s/${item.slug}`}
              className="text-2xl text-white hover:text-emerald-400 transition"
            >
              {item.title}
            </Link>

            {/* TAG BADGE */}
            <span
              className={`px-3 py-1 text-xs rounded-full border ${
                item.type === "Article"
                  ? "border-purple-400 text-purple-400"
                  : "border-blue-400 text-blue-400"
              }`}
            >
              {item.type}
            </span>
          </div>

          <p className="text-gray-400 text-sm mt-2">
            {new Date(item.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      ))}
    </main>
  );
}
