import { DocumentViewer } from "@/components/DocumentViewer";
import fs from "fs";
import path from "path";

export const dynamic = 'force-static';

// Function to generate static params so paths like `/materials/CP` work in App Router
export async function generateStaticParams() {
  const materialsDir = path.join(process.cwd(), 'src', 'app', 'materials');
  try {
    const directories = fs.readdirSync(materialsDir, { withFileTypes: true })
      .filter(dirent => (dirent.isDirectory() || dirent.isSymbolicLink()) && dirent.name !== '[slug]')
      .map(dirent => dirent.name);

    return directories.map((slug) => ({
      slug,
    }));
  } catch {
    return [];
  }
}

export default async function MaterialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const localDir = path.join(process.cwd(), 'src', 'app', 'materials', slug);

  let markdownContent: string | null = null;
  let hasPdf = false;

  // Build-time: Markdown을 src/app/materials/{slug}/ 에서 읽어서 렌더링
  try {
    const files = fs.readdirSync(localDir);
    // GHA에서 생성한 main.md 가 있는지 확인
    const mdFile = files.find(f => f === 'main.md' || f.endsWith('.md') || f.endsWith('.mdx'));
    if (mdFile) {
        markdownContent = fs.readFileSync(path.join(localDir, mdFile), "utf8");
    }

    // Public submission repo may omit bundled PDFs on purpose.
    const publicPdfPath = path.join(process.cwd(), 'public', 'materials', `${slug}.pdf`);
    hasPdf = fs.existsSync(publicPdfPath);

  } catch (e) {
    console.error("Path processing error:", e);
  }

  const pdfUrl = hasPdf ? `/materials/${slug}.pdf` : undefined;
  const title = slug.toUpperCase() + " / Academic Report";

  return (
    <div className="min-h-screen font-sans antialiased pt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <DocumentViewer 
            title={title} 
            markdownContent={markdownContent} 
            pdfUrl={pdfUrl} 
          />
        </div>
      </div>
    </div>
  );
}
