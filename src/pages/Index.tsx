import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, Github, Brain } from "lucide-react";
import axios from "axios";
import ImageUpload from "@/components/ImageUpload";
import PredictionResult from "@/components/PredictionResult";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useToast } from "@/hooks/use-toast";

interface PredictionResponse {
  prediction: string;
  confidence: number;
}

const API_URL = import.meta.env.VITE_API_URL;

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const { toast } = useToast();

  const handleImageSelect = useCallback((file: File) => {
    setSelectedImage(file);
    setPreviewURL(URL.createObjectURL(file));
    setResult(null);
  }, []);

  const handleImageRemove = useCallback(() => {
    setSelectedImage(null);
    if (previewURL) URL.revokeObjectURL(previewURL);
    setPreviewURL(null);
    setResult(null);
  }, [previewURL]);

  const handlePredict = async () => {
    if (!selectedImage) return;
    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedImage);
      const response = await axios.post<PredictionResponse>(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);
    } catch {
      toast({
        title: "Prediction failed",
        description: "Could not reach the AI server. Make sure the backend is running.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-12 pb-6 text-center px-4"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold gradient-text">
              Fashion AI
            </h1>
          </div>
          <p className="text-muted-foreground max-w-md mx-auto text-lg">
            Upload an image and get instant fashion category predictions powered by deep learning
          </p>
        </motion.header>

        {/* Main */}
        <main className="flex-1 flex items-start justify-center px-4 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-lg space-y-6"
          >
            {/* Upload Card */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-primary" />
                <h2 className="font-heading font-semibold text-foreground">Upload Image</h2>
              </div>
              <ImageUpload
                previewURL={previewURL}
                onImageSelect={handleImageSelect}
                onImageRemove={handleImageRemove}
              />

              {/* Predict Button */}
              <AnimatePresence>
                {selectedImage && !loading && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-5"
                  >
                    <button
                      onClick={handlePredict}
                      className="glow-button w-full flex items-center justify-center gap-2"
                    >
                      <Zap className="w-5 h-5" />
                      Classify Image
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Results */}
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div key="loading" exit={{ opacity: 0 }}>
                  <LoadingSpinner />
                </motion.div>
              )}
              {result && !loading && (
                <PredictionResult
                  key="result"
                  prediction={result.prediction}
                  confidence={result.confidence}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="py-6 text-center border-t border-border"
        >
          <p className="text-xs text-muted-foreground">
            Built with React · Tailwind CSS · FastAPI · Fashion MNIST CNN
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
