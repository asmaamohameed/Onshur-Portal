import React, { useState, useRef, useCallback } from 'react';
import { Icon } from '../common/Icon';
import { FileUploadService, type UploadedFile } from '../../services/fileUploadService';

interface FileUploadProps {
  title: string;
  description: string;
  maxFiles?: number;
  uploadedFiles: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
  onError: (message: string) => void;
  className?: string;
}

export default function FileUpload({
  title,
  description,
  maxFiles = 5,
  uploadedFiles,
  onFilesChange,
  onError,
  className = ''
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  }, []);

  const handleFiles = useCallback(async (files: File[]) => {
    if (uploadedFiles.length + files.length > maxFiles) {
      onError(`You can only upload up to ${maxFiles} files.`);
      return;
    }

    setIsUploading(true);
    try {
      // For now, we'll simulate file upload since we don't have the applicationId
      // In the actual implementation, this would be handled by the parent component
      const newFiles: UploadedFile[] = files.map(file => ({
        name: file.name,
        url: URL.createObjectURL(file), // Temporary URL for preview
        size: file.size
      }));

      onFilesChange([...uploadedFiles, ...newFiles]);
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Failed to upload files');
    } finally {
      setIsUploading(false);
    }
  }, [uploadedFiles, maxFiles, onFilesChange, onError]);

  const removeFile = useCallback((index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  }, [uploadedFiles, onFilesChange]);

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-500 mt-1">Max {maxFiles} files, 10MB each</p>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragOver 
            ? 'border-brand-500 bg-brand-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.zip"
        />
        
        <div className="space-y-3">
          <Icon 
            set="fa" 
            name="FaCloudUploadAlt" 
            className="mx-auto text-gray-400" 
            size={48} 
          />
          
          {isUploading ? (
            <div className="space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500 mx-auto"></div>
              <p className="text-sm text-gray-600">Uploading...</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-600">
                Drag your file(s) or{' '}
                <button
                  type="button"
                  onClick={openFileDialog}
                  className="text-brand-500 hover:text-brand-600 font-medium"
                >
                  browse
                </button>
              </p>
              <p className="text-xs text-gray-500">
                Max 10 MB files are allowed
              </p>
            </>
          )}
        </div>
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">Uploaded Files:</h4>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Icon set="fa" name="FaFile" className="text-gray-400" size={16} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {FileUploadService.formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Icon set="fa" name="FaTimes" size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 