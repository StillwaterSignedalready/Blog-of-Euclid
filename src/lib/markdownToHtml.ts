import { marked } from "marked";

export default async function markdownToHtml(markdown: string) {
  const innerHTML = marked.parse(markdown)
  return innerHTML;
}
