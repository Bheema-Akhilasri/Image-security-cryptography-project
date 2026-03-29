import { useState, useCallback, useId } from "react";
import { Upload, X } from "lucide-react";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  label?: string;
  acceptedTypes?: string;
  previewUrl?: string | null;
  onClear?: () => void;
}

const ImageUpload = ({
  onImageSelect,
  label = "Upload Image",
  acceptedTypes = "image/*",
  previewUrl,
  onClear,
}: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  // ✅ unique id for each component instance
  const inputId = useId();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files.length > 0 && files[0].type.startsWith("image/")) {
        onImageSelect(files[0]);
      }
    },
    [onImageSelect]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        onImageSelect(files[0]);
      }
    },
    [onImageSelect]
  );

  if (previewUrl) {
    return (
      <div className="relative rounded-xl overflow-hidden border border-border">
        <img
          src={previewUrl}
          alt="Preview"
          className="w-full h-64 object-contain bg-muted"
        />
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute top-2 right-2 p-2 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-opacity"
            aria-label="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`upload-zone cursor-pointer ${
        isDragging ? "border-primary bg-secondary" : ""
      }`}
      onClick={() => document.getElementById(inputId)?.click()}
    >
      <input
        type="file"
        accept={acceptedTypes}
        onChange={handleFileChange}
        className="hidden"
        id={inputId}
      />

      <div className="flex flex-col items-center gap-3 pointer-events-none">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
          <Upload className="w-8 h-8 text-primary" />
        </div>

        <div className="text-center">
          <p className="font-medium text-foreground">{label}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Drag and drop or click to browse
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Supports: PNG, JPG, JPEG, GIF
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
