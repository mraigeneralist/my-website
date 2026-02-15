import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function ArticlesPage() {
  const dir = path.join(process.cwd(), "content", "articles");
  const files = fs.readdirSync(dir);

  const articles = files
    .map((filename) => {
      const slug = filename.replace(".md", "");
      const filePath = path.join(dir, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  return (
    <main className="min-h-screen bg-black text-white px-8 py-20">
      {/* Purple Title */}
      <h1 className="text-4xl text-purple-400 mb-12">
        Articles
      </h1>

      {articles.map((article) => (
        <div key={article.slug} className="mb-10">
          <Link
            href={`/articles/${article.slug}`}
            className="text-2xl text-white hover:text-purple-400 transition-colors"
          >
            {article.title}
          </Link>

          <p className="text-gray-400 text-sm mt-2">
            {new Date(article.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div className="border-b border-gray-800 mt-6"></div>
        </div>
      ))}
    </main>
  );
}
