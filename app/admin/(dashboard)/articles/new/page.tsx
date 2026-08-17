import ArticleForm from "../ArticleForm";

export default function NewArticlePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-navy-900">New Article</h1>
      <ArticleForm />
    </div>
  );
}
