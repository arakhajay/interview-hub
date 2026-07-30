'use client';

import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, ArrowRight, Loader2, Sparkles, X } from 'lucide-react';
import { parseResumeFile } from '@/lib/parser';
import { ResumeData } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface FileUploaderProps {
  onSuccess?: (parsedData: ResumeData, rawText: string) => void;
  compact?: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onSuccess, compact = false }) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [parsedResult, setParsedResult] = useState<ResumeData | null>(null);
  const [rawTextContent, setRawTextContent] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFile = async (file: File) => {
    if (!file) return;
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!['pdf', 'docx', 'doc', 'txt'].includes(ext || '')) {
      alert('Please upload a PDF, DOCX, or TXT resume file.');
      return;
    }

    setFileName(file.name);
    setParsing(true);
    try {
      const { structured, rawText } = await parseResumeFile(file);
      setParsedResult(structured);
      setRawTextContent(rawText);

      // Save in localStorage immediately for review & builder
      if (typeof window !== 'undefined') {
        localStorage.setItem('magic_prompt_uploaded_resume_text', rawText);
        localStorage.setItem('magic_prompt_uploaded_file_name', file.name);
        localStorage.setItem('magic_prompt_active_resume', JSON.stringify(structured));
      }

      setShowConfirmModal(true);
      if (onSuccess) onSuccess(structured, rawText);
    } catch {
      alert('Error reading file format.');
    } finally {
      setParsing(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleConfirm = (target: 'review' | 'builder') => {
    setShowConfirmModal(false);
    if (target === 'review') router.push('/review');
    else router.push('/builder');
  };

  return (
    <>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? 'border-indigo-500 bg-indigo-500/10 scale-[1.01]'
            : 'border-slate-700/80 bg-slate-900/50 hover:border-indigo-500/50 hover:bg-slate-900/80'
        } ${compact ? 'py-6' : 'py-10'}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.doc,.txt"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />

        <div className="flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3 shadow-lg shadow-indigo-500/10">
            {parsing ? <Loader2 className="w-6 h-6 animate-spin text-indigo-400" /> : <Upload className="w-6 h-6" />}
          </div>

          <h4 className="text-base font-bold text-white mb-1">
            {parsing ? 'Parsing Resume & Extracting Content...' : 'Upload Your Resume File'}
          </h4>
          <p className="text-xs text-slate-400 max-w-sm mb-3">
            Drag & drop your PDF, DOCX, or TXT file here. AI will analyze your real resume and compute live ATS scores.
          </p>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-800 text-[10px] font-semibold text-slate-300 border border-slate-700">PDF</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-800 text-[10px] font-semibold text-slate-300 border border-slate-700">DOCX</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-800 text-[10px] font-semibold text-slate-300 border border-slate-700">Max 10MB</span>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && parsedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="relative w-full max-w-2xl glass-panel bg-slate-900 border border-slate-700 p-6 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Extracted Resume Content</h3>
                <p className="text-xs text-slate-400">Uploaded File: {fileName}</p>
              </div>
            </div>

            {/* Extracted Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 font-semibold uppercase text-[10px]">Detected Name</span>
                <p className="text-sm font-bold text-white mt-0.5">{parsedResult.personalInfo.fullName}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 font-semibold uppercase text-[10px]">Contact Info</span>
                <p className="text-sm font-semibold text-indigo-300 mt-0.5">{parsedResult.personalInfo.email}</p>
                <p className="text-slate-400">{parsedResult.personalInfo.phone}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 md:col-span-2">
                <span className="text-slate-400 font-semibold uppercase text-[10px]">Extracted Text Preview</span>
                <p className="text-slate-300 mt-1 font-mono text-[11px] line-clamp-3 bg-slate-950 p-2 rounded border border-slate-800">
                  {rawTextContent}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => handleConfirm('builder')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition"
              >
                Edit in AI Resume Builder
              </button>
              <button
                onClick={() => handleConfirm('review')}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition"
              >
                <Sparkles className="w-4 h-4" /> Run Real AI ATS Audit <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
