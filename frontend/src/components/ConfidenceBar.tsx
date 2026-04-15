import { motion } from "framer-motion";

interface ConfidenceBarProps {
  value: number;
}

const ConfidenceBar = ({ value }: ConfidenceBarProps) => {
  return (
    <div className="confidence-bar">
      <motion.div
        className="confidence-bar-fill"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      />
    </div>
  );
};

export default ConfidenceBar;
