import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

function getProjects() {
  const dir = path.join(process.cwd(), "content", "projects");
  const files = fs.readdirSync(dir);

  const projects = files.map((filename) => {
    const slug = filename.replace(".md", "");

    const filePath = path.join(dir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");

    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
    };
  });

  // Sort newest first
  projects.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return projects;
}

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <main className="min-h-screen bg-black text-white px-8 py-20">
      <h1 className="text-4xl text-blue-400 mb-12">
        Projects
      </h1>

      {projects.map((project) => (
        <Link
          key={project.slug}
          href={`/projects/${project.slug}`}
          className="block mb-8 border-b border-gray-800 pb-6 hover:bg-gray-900/30 transition-colors"
        >
          <h2 className="text-2xl text-white hover:text-blue-400 transition-colors">
            {project.title}
          </h2>

          <p className="text-sm text-gray-400 mt-2">
            {new Date(project.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </Link>
      ))}
    </main>
  );
}
