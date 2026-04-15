import { motion } from "framer-motion";
import {
  Shirt, Footprints, ShoppingBag, Watch,
  Glasses, Gem, Crown, Layers, CircleDot, Package
} from "lucide-react";
import ConfidenceBar from "./ConfidenceBar";

interface PredictionResultProps {
  prediction: string;
  confidence: number;
}

const categoryIcons: Record<string, React.ElementType> = {
  "T-shirt/top": Shirt,
  Trouser: Layers,
  Pullover: Shirt,
  Dress: Gem,
  Coat: Crown,
  Sandal: Footprints,
  Shirt: Shirt,
  Sneaker: Footprints,
  Bag: ShoppingBag,
  "Ankle boot": Footprints,
};

const PredictionResult = ({ prediction, confidence }: PredictionResultProps) => {
  const Icon = categoryIcons[prediction] || Package;
  const confidencePercent = Math.round(confidence * 100);
  const isHighConfidence = confidencePercent >= 90;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full"
    >
      <div className="glass-card p-6 space-y-5">
        {/* Category */}
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0"
          >
            <Icon className="w-7 h-7 text-primary" />
          </motion.div>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-heading mb-1">
              Predicted Class
            </p>
            <h3 className="text-2xl font-heading font-bold gradient-text">
              {prediction}
            </h3>
          </div>
        </div>

        {/* Confidence */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground font-heading">Confidence</span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`text-lg font-heading font-bold ${
                isHighConfidence ? "text-accent" : "text-primary"
              }`}
            >
              {confidencePercent}%
            </motion.span>
          </div>
          <ConfidenceBar value={confidencePercent} />
        </div>

        {isHighConfidence && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-2 text-sm text-accent font-medium bg-accent/10 rounded-xl px-4 py-2"
          >
            <CircleDot className="w-4 h-4" />
            High confidence prediction!
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default PredictionResult;
