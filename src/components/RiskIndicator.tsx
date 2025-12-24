import { motion } from 'framer-motion';
import { getRiskLevel } from '@/types/roles';
import { cn } from '@/lib/utils';

interface RiskIndicatorProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const RiskIndicator = ({ score, size = 'md', showLabel = true }: RiskIndicatorProps) => {
  const risk = getRiskLevel(score);
  
  const sizeClasses = {
    sm: 'w-12 h-12 text-sm',
    md: 'w-20 h-20 text-xl',
    lg: 'w-28 h-28 text-2xl',
  };

  const colorClasses = {
    low: 'border-success text-success bg-success/10',
    medium: 'border-warning text-warning bg-warning/10',
    high: 'border-attention text-attention bg-attention/10',
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className={cn(
          'rounded-full border-2 flex items-center justify-center font-bold',
          sizeClasses[size],
          colorClasses[risk.level]
        )}
      >
        {score}
      </motion.div>
      {showLabel && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <p className={cn(
            'font-medium',
            risk.level === 'low' && 'text-success',
            risk.level === 'medium' && 'text-warning',
            risk.level === 'high' && 'text-attention'
          )}>
            {risk.label}
          </p>
        </motion.div>
      )}
    </div>
  );
};
