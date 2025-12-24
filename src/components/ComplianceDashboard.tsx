import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Clock, FileCheck } from 'lucide-react';
import { RoleInfo } from '@/types/roles';
import { OCLData } from '@/types/compliance';
import { ComplianceLevelIndicator } from './ComplianceLevelIndicator';
import { RiskIndicator } from './RiskIndicator';
import { Card } from '@/components/ui/card';

interface ComplianceDashboardProps {
  role: RoleInfo;
  oclData: OCLData;
  riskScore: number;
}

export const ComplianceDashboard = ({ role, oclData, riskScore }: ComplianceDashboardProps) => {
  // Derive quick stats from metrics
  const quickStats = [
    {
      icon: CheckCircle2,
      label: 'Completed',
      value: `${oclData.metrics.ccr}%`,
      sublabel: 'Training done',
    },
    {
      icon: Clock,
      label: 'On-Time',
      value: `${oclData.metrics.otf}%`,
      sublabel: 'Timely completion',
    },
    {
      icon: FileCheck,
      label: 'Valid Certs',
      value: `${oclData.metrics.cvf}%`,
      sublabel: 'Active certifications',
    },
    {
      icon: AlertCircle,
      label: 'Policies',
      value: `${oclData.metrics.paf}%`,
      sublabel: 'Acknowledged',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      {/* Main Compliance Level */}
      <ComplianceLevelIndicator data={oclData} trend="stable" />

      {/* Two-Column Layout: OCL vs Risk */}
      <div className="grid grid-cols-2 gap-3">
        <Card variant="ghost" className="p-3 space-y-2">
          <p className="text-xs text-muted-foreground font-medium">Compliance Level</p>
          <p className="text-xs text-muted-foreground">How compliant are we?</p>
          <div className="text-2xl font-bold text-foreground">{oclData.level}%</div>
        </Card>
        
        <Card variant="ghost" className="p-3 space-y-2">
          <p className="text-xs text-muted-foreground font-medium">Risk Score</p>
          <p className="text-xs text-muted-foreground">How exposed are we?</p>
          <div className="flex items-center gap-2">
            <RiskIndicator score={riskScore} size="sm" showLabel={false} />
            <span className="text-lg font-semibold text-foreground">{riskScore}/100</span>
          </div>
        </Card>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-4 gap-2">
        {quickStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card variant="ghost" className="p-3 text-center">
              <stat.icon className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.sublabel}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Key Insight */}
      <Card variant="interactive" className="p-3 border-l-2 border-l-primary">
        <p className="text-xs text-muted-foreground mb-1">Key Insight</p>
        <p className="text-sm text-foreground">
          {oclData.status === 'excellent' || oclData.status === 'good'
            ? 'High compliance does not always mean low risk. Continue monitoring high-risk roles.'
            : 'Focusing on overdue items and expiring certifications will have the biggest impact.'}
        </p>
      </Card>
    </motion.div>
  );
};
