import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content?: string;
  filePath?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, filePath }) => {
  const [markdown, setMarkdown] = useState<string>('');

  useEffect(() => {
    if (content) {
      setMarkdown(content);
    } else if (filePath) {
      fetch(filePath)
        .then(response => response.text())
        .then(md => setMarkdown(md));
    }
  }, [content, filePath]);

  // No need to sanitize since ReactMarkdown handles rendering safely
  return <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />;
};

export default MarkdownRenderer;
