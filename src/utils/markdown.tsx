import React from 'react';

/**
 * Lightweight, safe Markdown renderer for structured AI counselor chat answers
 */
export function renderFormattedContent(content: string): React.ReactNode {
  if (!content) return null;

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  let inList = false;
  let listItems: React.ReactNode[] = [];

  const flushList = () => {
    if (inList && listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="my-2 space-y-1 pl-4 list-disc text-slate-700">
          {listItems}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  const formatInline = (text: string): React.ReactNode => {
    // Replace **bold** with <strong>
    const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="px-1.5 py-0.5 rounded bg-slate-100 text-indigo-700 font-mono text-[11px] border border-slate-200">
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={i} className="italic text-slate-600">{part.slice(1, -1)}</em>;
      }
      return part;
    });
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      elements.push(<div key={`sp-${idx}`} className="h-1.5" />);
      return;
    }

    // Dividers
    if (trimmed === '---' || trimmed === '___') {
      flushList();
      elements.push(<hr key={`hr-${idx}`} className="my-2.5 border-slate-200" />);
      return;
    }

    // H3 Heading
    if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={`h3-${idx}`} className="text-sm font-extrabold text-slate-900 mt-2 mb-1 tracking-tight">
          {formatInline(trimmed.slice(4))}
        </h3>
      );
      return;
    }

    // H4 Heading
    if (trimmed.startsWith('#### ')) {
      flushList();
      elements.push(
        <h4 key={`h4-${idx}`} className="text-xs font-bold text-indigo-900 mt-2 mb-0.5">
          {formatInline(trimmed.slice(5))}
        </h4>
      );
      return;
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      flushList();
      elements.push(
        <blockquote key={`bq-${idx}`} className="my-2 pl-3 py-1 border-l-2 border-indigo-500 bg-indigo-50/50 rounded-r-lg text-slate-700 italic text-[11.5px]">
          {formatInline(trimmed.slice(2))}
        </blockquote>
      );
      return;
    }

    // Unordered list item
    if (trimmed.startsWith('- ') || trimmed.startsWith('• ') || trimmed.startsWith('* ')) {
      inList = true;
      const bulletText = trimmed.replace(/^[-•*]\s+/, '');
      listItems.push(
        <li key={`li-${idx}`} className="leading-relaxed">
          {formatInline(bulletText)}
        </li>
      );
      return;
    }

    // Numbered list item
    const numberedMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
    if (numberedMatch) {
      flushList();
      elements.push(
        <div key={`num-${idx}`} className="flex items-start gap-2 my-1 leading-relaxed">
          <span className="font-bold text-indigo-600 shrink-0 text-[11px]">{numberedMatch[1]}.</span>
          <div className="flex-1 text-slate-700">{formatInline(numberedMatch[2])}</div>
        </div>
      );
      return;
    }

    flushList();
    elements.push(
      <p key={`p-${idx}`} className="my-1 leading-relaxed text-slate-700">
        {formatInline(trimmed)}
      </p>
    );
  });

  flushList();
  return <div className="space-y-0.5">{elements}</div>;
}
