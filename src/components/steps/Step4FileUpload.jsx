import { useRef, useState } from 'react';

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 5;

export default function Step4FileUpload({
  onNext,
  onPrev,
  files,
  onAddFile,
  onRemoveFile,
}) {
  const fileInputRef = useRef();
  const [uploadError, setUploadError] = useState('');

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    setUploadError('');

    selectedFiles.forEach((file) => {
      if (files.length >= MAX_FILES) {
        setUploadError(`Maximum ${MAX_FILES} files allowed`);
        return;
      }

      if (!ALLOWED_TYPES.includes(file.type)) {
        setUploadError(
          `File type not allowed: ${file.name}. Allowed: JPG, PNG, GIF, PDF, DOCX, XLSX, TXT`
        );
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setUploadError(
          `File too large: ${file.name}. Maximum 10MB per file.`
        );
        return;
      }

      onAddFile(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = Array.from(e.dataTransfer.files || []);
    const input = fileInputRef.current;
    if (input) {
      const dataTransfer = new DataTransfer();
      droppedFiles.forEach((file) => dataTransfer.items.add(file));
      input.files = dataTransfer.files;
      handleFileSelect({ target: input });
    }
  };

  const getFileExtension = (filename) => {
    return filename.split('.').pop().toUpperCase();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Upload supporting evidence
      </h2>
      <p className="text-gray-600 mb-6">
        Photos, documents, or any files that support your report (required).
      </p>

      {uploadError && (
        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6">
          {uploadError}
        </div>
      )}

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 mb-6 cursor-pointer hover:border-green-500 hover:bg-green-50 transition"
      >
        <div className="text-4xl mb-3">📁</div>
        <h3 className="font-bold text-gray-900 mb-2">Drop files here</h3>
        <p className="text-sm text-gray-600 mb-4">
          or click to browse (JPG, PNG, GIF, PDF, DOCX, XLSX, TXT - max 10MB each)
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          accept={ALLOWED_TYPES.join(',')}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          Select Files
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-700">
          <strong>ℹ️ Tip:</strong> Upload screenshots, emails, documents, photos,
          or any evidence supporting your complaint.
        </p>
      </div>

      {files.length > 0 && (
        <div className="mb-8">
          <h3 className="font-bold text-gray-900 mb-4">
            Uploaded Files ({files.length}/{MAX_FILES})
          </h3>
          <div className="space-y-3">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-xs font-bold text-gray-600">
                    {getFileExtension(file.name)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-600">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveFile(index)}
                  className="text-red-600 hover:text-red-800 font-bold"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={onPrev}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={files.length === 0}
          className={`flex-1 font-bold py-3 px-6 rounded-lg transition-colors ${
            files.length === 0
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
