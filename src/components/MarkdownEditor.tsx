'use client';

import React, { useRef, useState } from 'react';
import { 
  Bold, 
  Italic, 
  Heading1, 
  Heading2, 
  List, 
  ListOrdered, 
  Quote, 
  Link as LinkIcon, 
  Image as ImageIcon,
  Table
} from 'lucide-react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const insertText = (before: string, after: string = '', defaultText: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    const selectedText = value.substring(start, end);
    const textToInsert = selectedText || defaultText;
    
    const newText = value.substring(0, start) + before + textToInsert + after + value.substring(end);
    
    onChange(newText);
    
    // Attempt to restore focus after state updates
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + textToInsert.length
      );
    }, 0);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      const uploadData = new FormData();
      uploadData.append('file', file);
      uploadData.append('bucket', 'blogs'); // Storing in blogs bucket

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to upload image');
      }

      // Insert image markdown
      insertText('![', `](${data.url})`, file.name);
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload image');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="w-full border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#6b8af6] focus-within:border-[#6b8af6] transition-all bg-white flex flex-col">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 flex-shrink-0">
        <button
          type="button"
          onClick={() => insertText('**', '**', 'bold text')}
          className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"
          title="Bold"
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onClick={() => insertText('_', '_', 'italic text')}
          className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"
          title="Italic"
        >
          <Italic size={16} />
        </button>
        <div className="w-px h-5 bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => insertText('\n# ', '\n', 'Heading 1')}
          className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"
          title="Heading 1"
        >
          <Heading1 size={16} />
        </button>
        <button
          type="button"
          onClick={() => insertText('\n## ', '\n', 'Heading 2')}
          className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"
          title="Heading 2"
        >
          <Heading2 size={16} />
        </button>
        <div className="w-px h-5 bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => insertText('\n- ', '\n', 'List item')}
          className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"
          title="Bulleted List"
        >
          <List size={16} />
        </button>
        <button
          type="button"
          onClick={() => insertText('\n1. ', '\n', 'List item')}
          className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </button>
        <button
          type="button"
          onClick={() => insertText('\n> ', '\n', 'Quote')}
          className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"
          title="Quote"
        >
          <Quote size={16} />
        </button>
        <div className="w-px h-5 bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => insertText('[', '](https://...)', 'link text')}
          className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"
          title="Link"
        >
          <LinkIcon size={16} />
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors disabled:opacity-50 flex items-center gap-1"
          title="Insert Image"
        >
          <ImageIcon size={16} />
          {isUploading && <span className="text-xs">Uploading...</span>}
        </button>
        <button
          type="button"
          onClick={() => insertText('\n| Column 1 | Column 2 |\n| -------- | -------- |\n| Cell 1   | Cell 2   |\n| Cell 3   | Cell 4   |\n')}
          className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"
          title="Insert Table"
        >
          <Table size={16} />
        </button>
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleImageUpload} 
        />
      </div>

      {/* Editor Area */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Write your markdown content here..."}
        className="w-full p-4 min-h-[400px] flex-grow outline-none font-mono text-sm text-gray-800 resize-y"
      />
    </div>
  );
}
