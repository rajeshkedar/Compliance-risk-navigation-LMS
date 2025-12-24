import { motion } from 'framer-motion';
import { Info, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { OCLData } from '@/types/compliance';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ComplianceLevelIndicatorProps {
  data: OCLData;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
  trend?: 'up' | 'down' | 'stable';
}

export const ComplianceLevelIndicator = ({
  data,
  showDetails = true,
  size = 'md',
  trend = 'stable',
}: ComplianceLevelIndicatorProps) => {
  const statusColors = {
    excellent: 'text-success border-success/30 bg-success/10',
    good: 'text-primary border-primary/30 bg-primary/10',
    'at-risk': 'text-attention border-attention/30 bg-attention/10',
    critical: 'text-coral border-coral/30 bg-coral/10',
  };

  const statusBgColors = {
    excellent: 'bg-success',
    good: 'bg-primary',
    'at-risk': 'bg-attention',
    critical: 'bg-coral',
  };

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-3xl',
    lg: 'text-5xl',
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-success' : trend === 'down' ? 'text-coral' : 'text-muted-foreground';

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'rounded-xl border p-4',
        statusColors[data.status]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={cn('font-bold font-display', sizeClasses[size])}>
              {data.level}%
            </span>
            <div className={cn('flex items-center gap-1', trendColor)}>
              <TrendIcon className="w-4 h-4" />
            </div>
          </div>
          
          <p className="text-sm font-medium opacity-90">
            {data.roleSpecificLabel.split(':')[0]}
          </p>
          
          {data.roleSpecificSubtext && (
            <p className="text-xs opacity-70">
              {data.roleSpecificSubtext}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className={cn(
            'px-2 py-1 rounded-full text-xs font-medium',
            statusBgColors[data.status],
            'text-background'
          )}>
            {data.statusLabel}
          </span>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-1 rounded-full hover:bg-background/20 transition-colors">
                  <Info className="w-4 h-4 opacity-70" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs p-4">
                <ExplainabilityContent data={data} />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {showDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ delay: 0.2 }}
          className="mt-4 pt-4 border-t border-current/20"
        >
          <div className="grid grid-cols-4 gap-3">
            <MetricBar label="Completion" value={data.metrics.ccr} weight={40} />
            <MetricBar label="On-Time" value={data.metrics.otf} weight={20} />
            <MetricBar label="Certs Valid" value={data.metrics.cvf} weight={25} />
            <MetricBar label="Policies" value={data.metrics.paf} weight={15} />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

interface MetricBarProps {
  label: string;
  value: number;
  weight: number;
}

const MetricBar = ({ label, value, weight }: MetricBarProps) => (
  <div className="space-y-1">
    <div className="flex justify-between items-center">
      <span className="text-[10px] font-medium opacity-70">{label}</span>
      <span className="text-[10px] opacity-50">{weight}%</span>
    </div>
    <div className="h-1.5 bg-background/30 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="h-full bg-current rounded-full"
      />
    </div>
    <span className="text-xs font-semibold">{value}%</span>
  </div>
);

interface ExplainabilityContentProps {
  data: OCLData;
}

const ExplainabilityContent = ({ data }: ExplainabilityContentProps) => (
  <div className="space-y-3">
    <p className="font-semibold text-foreground">How is this calculated?</p>
    <p className="text-sm text-muted-foreground">
      This compliance level reflects completed training, valid certifications, and acknowledged policies — weighted to align with regulatory expectations.
    </p>
    <div className="space-y-2 text-xs">
      <div className="flex justify-between">
        <span className="text-muted-foreground">Completion Rate (40%)</span>
        <span className="font-medium">{data.metrics.ccr}%</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">On-Time Factor (20%)</span>
        <span className="font-medium">{data.metrics.otf}%</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Cert Validity (25%)</span>
        <span className="font-medium">{data.metrics.cvf}%</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Policy Ack (15%)</span>
        <span className="font-medium">{data.metrics.paf}%</span>
      </div>
    </div>
    <p className="text-[10px] text-muted-foreground italic pt-2 border-t border-border">
      Late completions and expiring certifications reduce the score.
    </p>
  </div>
);
