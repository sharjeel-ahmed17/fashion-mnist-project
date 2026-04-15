import { motion } from "framer-motion";
import { Brain } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center gap-4 py-8"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center"
      >
        <Brain className="w-8 h-8 text-primary animate-pulse-glow" />
      </motion.div>
      <div className="text-center">
        <p className="font-heading font-medium text-foreground">Analyzing image...</p>
        <p className="text-sm text-muted-foreground mt-1">AI is identifying the fashion item</p>
      </div>
      <div className="w-48 h-1.5 rounded-full bg-secondary overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-primary"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: "40%" }}
        />
      </div>
    </motion.div>
  );
};

export default LoadingSpinner;
