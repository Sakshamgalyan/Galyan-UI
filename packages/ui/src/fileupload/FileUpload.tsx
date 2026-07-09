'use client';

import React, { useRef, useState } from 'react';
import './fileupload.css';

export interface FileUploadProps {
  onFilesSelected?: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // in bytes
  maxFiles?: number;
  disabled?: boolean;
  label?: string;
  helperText?: string;
  className?: string;
}

const formatSize = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

export function FileUpload({
  onFilesSelected,
  multiple = false,
  accept,
  maxSize,
  maxFiles,
  disabled = false,
  label = 'Click or drag files to upload',
  helperText,
  className = '',
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const valid = Array.from(files).filter(f => !maxSize || f.size <= maxSize);
    const newFiles = multiple ? [...selectedFiles, ...valid] : valid;
    
    const limited = maxFiles ? newFiles.slice(0, maxFiles) : newFiles;
    if (!multiple) limited.splice(1);

    setSelectedFiles(limited);
    onFilesSelected?.(limited);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (disabled) return;
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (idx: number) => {
    const updated = selectedFiles.filter((_, i) => i !== idx);
    setSelectedFiles(updated);
    onFilesSelected?.(updated);
  };

  return (
    <div className={`gy-fileupload ${className}`}>
      <div
        className={[
          'gy-fileupload-zone',
          dragActive ? 'gy-fileupload-zone--drag-active' : '',
          disabled ? 'gy-fileupload-zone--disabled' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={() => !disabled && inputRef.current?.click()}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          className="gy-fileupload-input"
          multiple={multiple}
          accept={accept}
          disabled={disabled}
          onChange={(e) => handleFiles(e.target.files)}
        />
        <svg className="gy-fileupload-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
        <div className="gy-fileupload-text">{label}</div>
        {(helperText || maxSize) && (
          <div className="gy-fileupload-subtext">
            {helperText} {maxSize && `(Max ${formatSize(maxSize)})`}
          </div>
        )}
      </div>

      {selectedFiles.length > 0 && (
        <div className="gy-fileupload-list">
          {selectedFiles.map((f, i) => (
            <div key={`${f.name}-${i}`} className="gy-fileupload-item">
              <div className="gy-fileupload-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                  <polyline points="13 2 13 9 20 9"></polyline>
                </svg>
              </div>
              <div className="gy-fileupload-item-info">
                <span className="gy-fileupload-item-name" title={f.name}>{f.name}</span>
                <span className="gy-fileupload-item-size">{formatSize(f.size)}</span>
              </div>
              <button
                type="button"
                className="gy-fileupload-item-remove"
                onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                aria-label="Remove file"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
