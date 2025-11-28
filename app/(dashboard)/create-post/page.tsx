"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Image as ImageIcon, Video, Paperclip, X, FileText } from "lucide-react";

type MediaType = 'image' | 'video' | 'file';

interface Attachment {
  type: MediaType;
  url: string;
  name: string;
}

export default function CreatePostPage() {
  const [content, setContent] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [uploadType, setUploadType] = useState<MediaType>('image');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; 
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  const handleUploadClick = (type: MediaType) => {
    setUploadType(type);
    setTimeout(() => {
      fileInputRef.current?.click();
    }, 0);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      let type: MediaType = 'file';
      
      if (file.type.startsWith('image/')) type = 'image';
      else if (file.type.startsWith('video/')) type = 'video';
      
      setAttachments((prev) => [...prev, { type, url: previewUrl, name: file.name }]);
      setIsMenuOpen(false);
      event.target.value = "";
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center pt-16 px-4 pb-32">
      <div className="w-full max-w-3xl flex flex-col h-full relative">
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Create a post
        </h1>

        {attachments.length > 0 && (
          <div className={`grid gap-2 mb-6 ${
            attachments.length === 1 ? 'grid-cols-1' : 
            attachments.length === 2 ? 'grid-cols-2' : 
            'grid-cols-2 md:grid-cols-3'
          }`}>
            {attachments.map((file, index) => (
              <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-100 group flex items-center justify-center">
                
                {/* Preview Logic */}
                {file.type === 'image' ? (
                  <img src={file.url} alt="preview" className="object-cover w-full h-full" />
                ) : (
                  <div className="flex flex-col items-center text-gray-500 p-4 text-center">
                    <FileText size={40} className="mb-2 text-gray-400" />
                    <span className="text-sm font-medium truncate w-full max-w-[150px]">{file.name}</span>
                  </div>
                )}

                {/* Remove Button */}
                <button 
                  onClick={() => setAttachments(files => files.filter((_, i) => i !== index))}
                  className="absolute top-2 right-2bg-[#0f4c4f] hover:bg-[#0b3a3c] hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* --- 2. TEXT CONTENT (Bottom) --- */}
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind"
          className="w-full resize-none border-none focus:ring-0 outline-none text-lg text-gray-700 placeholder:text-gray-400 bg-transparent leading-relaxed overflow-hidden"
          rows={1} 
        />

        {/* --- 3. STICKY BOTTOM TOOLBAR --- */}
        <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-sm z-50">
          <div className="max-w-3xl mx-auto px-4 py-6 flex justify-between items-center">
            
            {/* EXPANDABLE MENU LOGIC */}
            <div className="flex items-center gap-2 transition-all">
              {isMenuOpen ? (
                <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-4 duration-200">
                  
                  {/* Close Button */}
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100"
                  >
                    <X size={20} />
                  </button>
                  
                  {/* Image Option */}
                  <button 
                    onClick={() => handleUploadClick('image')} 
                    className="text-grey-700 hover:bg-green-50 p-2 rounded-full transition-colors"
                  >
                    <ImageIcon size={24} />
                  </button>

                  {/* Video Option */}
                  <button 
                    onClick={() => handleUploadClick('video')} 
                    className="text-black-400 hover:bg-green-50 p-2 rounded-full transition-colors"
                  >
                    <Video size={24} />
                  </button>

                  <button 
                    onClick={() => handleUploadClick('file')} 
                    className="text-black-4000 hover:bg-green-50 p-2 rounded-full transition-colors"
                  >
                    <Paperclip size={24} />
                  </button>

                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept={
                      uploadType === 'image' ? "image/*" : 
                      uploadType === 'video' ? "video/*" : 
                      ".pdf,.doc,.docx,.txt" 
                    }
                    onChange={handleFileChange}
                  />
                </div>
              ) : (
                <button 
                  onClick={() => setIsMenuOpen(true)}
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors text-gray-600"
                >
                  <Plus size={24} strokeWidth={1.5} />
                </button>
              )}
            </div>

            <Button 
              className="bg-[#0f4c4f] hover:bg-[#0b3a3c] text-white rounded-full px-8 py-2 font-medium"
            >
              Post
            </Button>
          </div>
        </div>

      </div>
    </main>
  );
}