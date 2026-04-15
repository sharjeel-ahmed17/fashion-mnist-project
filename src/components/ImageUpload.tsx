import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  previewURL: string | null;
  onImageSelect: (file: File) => void;
  onImageRemove: () => void;
}

const ImageUpload = ({ previewURL, onImageSelect, onImageRemove }: ImageUploadProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onImageSelect(acceptedFiles[0]);
      }
    },
    [onImageSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [] },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {previewURL ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-2xl border border-glass-border">
              <img
                src={previewURL}
                alt="Upload preview"
                className="w-full h-64 object-contain bg-secondary/30"
              />
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onImageRemove();
                  }}
                  className="p-3 rounded-xl bg-destructive/80 backdrop-blur-sm transition-transform hover:scale-110"
                >
                  <X className="w-5 h-5 text-destructive-foreground" />
                </button>
              </div>
            </div>
            <div
              {...getRootProps()}
              className="mt-3 text-center cursor-pointer"
            >
              <input {...getInputProps()} />
              <p className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Click to replace image
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              {...getRootProps()}
              className={`upload-zone flex flex-col items-center justify-center min-h-[220px] ${
                isDragActive ? "upload-zone-active" : ""
              }`}
            >
              <input {...getInputProps()} />
              <motion.div
                animate={isDragActive ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  {isDragActive ? (
                    <ImageIcon className="w-8 h-8 text-primary" />
                  ) : (
                    <Upload className="w-8 h-8 text-primary" />
                  )}
                </div>
              </motion.div>
              <p className="font-heading font-medium text-foreground mb-1">
                {isDragActive ? "Drop your image here" : "Drag & drop an image"}
              </p>
              <p className="text-sm text-muted-foreground">
                or click to browse · JPG, PNG
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageUpload;
