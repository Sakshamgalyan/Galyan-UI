"use client";

import React, { useRef, useState, useEffect } from "react";
import { Tooltip } from "../tooltip/Tooltip";
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

export type FileUploadVariant = "default" | "glassmorphic" | "glass";

export interface FileUploadProps {
  /** Visual variant */
  variant?: FileUploadVariant;
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
  simulateUpload?: boolean;
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
  variant = "default",
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
  simulateUpload = true,
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

  const startSimulatedUpload = (fileObj: UploadedFileItem) => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 25) + 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setLocalFiles((prev) =>
          prev.map((f) =>
            (f as UploadedFileItem).id === fileObj.id
              ? { ...f, status: "completed", progress: 100 }
              : f,
          ),
        );
      } else {
        setLocalFiles((prev) =>
          prev.map((f) =>
            (f as UploadedFileItem).id === fileObj.id
              ? { ...f, status: "uploading", progress: currentProgress }
              : f,
          ),
        );
      }
    }, 200);
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const valid = Array.from(files).filter(
      (f) => !maxSize || f.size <= maxSize,
    );

    const itemsToAdd: (UploadedFileItem | File)[] = valid.map((f) => {
      if (simulateUpload) {
        const item: UploadedFileItem = {
          id: `${f.name}-${Date.now()}-${Math.random()}`,
          name: f.name,
          size: f.size,
          type: f.type,
          status: "uploading",
          progress: 0,
        };
        setTimeout(() => startSimulatedUpload(item), 50);
        return item;
      }
      return f;
    });

    const newFiles = multiple ? [...localFiles, ...itemsToAdd] : itemsToAdd;
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

  const variantClass = variant && variant !== "default" ? `gy-fileupload--${variant}` : "";

  return (
    <div className={["gy-fileupload", variantClass, className].filter(Boolean).join(" ")}>
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
        <div className="gy-fileupload-zone-icon">
          <svg
            width="28"
            height="28"
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
        </div>
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
            const progress = !isFile ? (item.progress ?? 0) : 100;

            return (
              <div
                key={`${fileName}-${i}`}
                className={`gy-fileupload-item gy-fileupload-item--${status}`}
              >
                <div className="gy-fileupload-item-icon">
                  <svg
                    width="18"
                    height="18"
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
                  <div className="gy-fileupload-item-top">
                    <Tooltip content={fileName} position="top" maxWidth={300}>
                      <span className="gy-fileupload-item-name">
                        {fileName}
                      </span>
                    </Tooltip>
                  </div>

                  {status === "uploading" ? (
                    <div className="gy-fileupload-progress-wrapper">
                      <div className="gy-fileupload-progress-bar">
                        <div
                          className="gy-fileupload-progress-fill"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="gy-fileupload-item-meta">
                        <span className="gy-fileupload-item-size">
                          {formatSize(fileSize)}
                        </span>
                        <span className="gy-fileupload-item-progress-text">
                          {progress}%
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="gy-fileupload-item-meta">
                      <span className="gy-fileupload-item-size">
                        {formatSize(fileSize)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="gy-fileupload-item-actions">
                  {status === "completed" && (
                    <span className="gy-fileupload-status-badge gy-fileupload-status-badge--success">
                      ✓ Uploaded
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

                  {status === "error" && (
                    <Tooltip content="Retry file upload" position="top">
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
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="23 4 23 10 17 10"></polyline>
                          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                        </svg>
                        <span>Retry</span>
                      </button>
                    </Tooltip>
                  )}

                  <Tooltip content="Remove file" position="top">
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
                  </Tooltip>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
