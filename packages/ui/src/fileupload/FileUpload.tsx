"use client";

import React, { useRef, useState, useEffect } from "react";
import "./fileupload.css";

export interface UploadedFileItem {
  id?: string;
  name: string;
  size?: number; // in bytes
  type?: string;
  status?: "uploading" | "completed" | "error";
  progress?: number;
  url?: string;
}

export interface FileUploadProps {
  onFilesSelected?: (files: File[]) => void;
  onRemoveFile?: (file: UploadedFileItem | File, index: number) => void;
  onRetryFile?: (file: UploadedFileItem | File, index: number) => void;
  uploadedFiles?: (UploadedFileItem | File)[];
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // in bytes
  maxFiles?: number;
  disabled?: boolean;
  label?: string;
  helperText?: string;
  className?: string;
}

const formatSize = (bytes?: number) => {
  if (!bytes || bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

export function FileUpload({
  onFilesSelected,
  onRemoveFile,
  onRetryFile,
  uploadedFiles,
  multiple = false,
  accept,
  maxSize,
  maxFiles,
  disabled = false,
  label = "Click or drag files to upload",
  helperText,
  className = "",
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [localFiles, setLocalFiles] = useState<(UploadedFileItem | File)[]>(
    uploadedFiles ?? [],
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (uploadedFiles) {
      setLocalFiles(uploadedFiles);
    }
  }, [uploadedFiles]);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const valid = Array.from(files).filter(
      (f) => !maxSize || f.size <= maxSize,
    );
    const newFiles = multiple ? [...localFiles, ...valid] : valid;

    const limited = maxFiles ? newFiles.slice(0, maxFiles) : newFiles;
    setLocalFiles(limited);
    onFilesSelected?.(valid);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (disabled) return;
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (idx: number) => {
    const target = localFiles[idx];
    const updated = localFiles.filter((_, i) => i !== idx);
    setLocalFiles(updated);
    if (target) {
      onRemoveFile?.(target, idx);
    }
  };

  return (
    <div className={`gy-fileupload ${className}`}>
      <div
        className={[
          "gy-fileupload-zone",
          dragActive ? "gy-fileupload-zone--drag-active" : "",
          disabled ? "gy-fileupload-zone--disabled" : "",
        ]
          .filter(Boolean)
          .join(" ")}
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
        <svg
          className="gy-fileupload-icon"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
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

      {localFiles.length > 0 && (
        <div className="gy-fileupload-list">
          {localFiles.map((item, i) => {
            const isFile = item instanceof File;
            const fileName = isFile ? item.name : item.name;
            const fileSize = isFile ? item.size : item.size;
            const status = isFile ? "completed" : (item.status ?? "completed");
            const progress = !isFile ? (item.progress ?? 50) : undefined;

            return (
              <div
                key={`${fileName}-${i}`}
                className={`gy-fileupload-item gy-fileupload-item--${status}`}
              >
                <div className="gy-fileupload-item-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                    <polyline points="13 2 13 9 20 9"></polyline>
                  </svg>
                </div>
                <div className="gy-fileupload-item-info">
                  <div className="gy-fileupload-item-header">
                    <span className="gy-fileupload-item-name" title={fileName}>
                      {fileName}
                    </span>
                    {status === "completed" && (
                      <span className="gy-fileupload-status-badge gy-fileupload-status-badge--success">
                        Uploaded
                      </span>
                    )}
                    {status === "uploading" && (
                      <span className="gy-fileupload-status-badge gy-fileupload-status-badge--uploading">
                        {progress}%
                      </span>
                    )}
                    {status === "error" && (
                      <span className="gy-fileupload-status-badge gy-fileupload-status-badge--error">
                        Failed
                      </span>
                    )}
                  </div>
                  {status === "uploading" && (
                    <div className="gy-fileupload-progress-bar">
                      <div
                        className="gy-fileupload-progress-fill"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                  <span className="gy-fileupload-item-size">
                    {formatSize(fileSize)}
                  </span>
                </div>
                {status === "error" && (
                  <button
                    type="button"
                    className="gy-fileupload-item-retry"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRetryFile?.(item, i);
                    }}
                    aria-label="Retry upload"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="23 4 23 10 17 10"></polyline>
                      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                    </svg>
                    <span>Retry</span>
                  </button>
                )}
                <button
                  type="button"
                  className="gy-fileupload-item-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(i);
                  }}
                  aria-label="Remove file"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
