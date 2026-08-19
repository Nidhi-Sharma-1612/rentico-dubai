import BackLink from "../../BackLink";
import ArticleForm from "../ArticleForm";

export default function NewArticlePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <BackLink href="/admin/articles" label="All articles" />
        <h1 className="mt-2 text-2xl font-bold text-navy-900">New Article</h1>
      </div>
      <ArticleForm />
    </div>
  );
}
