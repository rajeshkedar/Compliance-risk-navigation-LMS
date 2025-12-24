import { UserRole } from './roles';

export interface ComplianceMetrics {
  ccr: number; // Compliance Completion Rate (0-100)
  otf: number; // On-Time Factor (0-100)
  cvf: number; // Certification Validity Factor (0-100)
  paf: number; // Policy Acknowledgment Factor (0-100)
}

export interface OCLData {
  level: number; // Overall Compliance Level (0-100)
  metrics: ComplianceMetrics;
  status: 'excellent' | 'good' | 'at-risk' | 'critical';
  statusLabel: string;
  roleSpecificLabel: string;
  roleSpecificSubtext: string;
}

// Weights as per spec
export const OCL_WEIGHTS = {
  ccr: 0.40,
  otf: 0.20,
  cvf: 0.25,
  paf: 0.15,
};

// Status bands as per spec
export const getOCLStatus = (ocl: number): { status: OCLData['status']; label: string; tone: string } => {
  if (ocl >= 95) {
    return { status: 'excellent', label: 'Excellent', tone: "You're in great shape" };
  } else if (ocl >= 90) {
    return { status: 'good', label: 'Good', tone: 'Minor attention needed' };
  } else if (ocl >= 80) {
    return { status: 'at-risk', label: 'At Risk', tone: 'Action recommended' };
  } else {
    return { status: 'critical', label: 'Critical', tone: 'Immediate focus required' };
  }
};

// Calculate OCL from metrics using weighted formula
export const calculateOCL = (metrics: ComplianceMetrics): number => {
  return Math.round(
    (metrics.ccr * OCL_WEIGHTS.ccr) +
    (metrics.otf * OCL_WEIGHTS.otf) +
    (metrics.cvf * OCL_WEIGHTS.cvf) +
    (metrics.paf * OCL_WEIGHTS.paf)
  );
};

// Role-specific display labels
export const getRoleSpecificOCL = (role: UserRole, ocl: number, riskConcentration?: string): { label: string; subtext: string } => {
  const { status } = getOCLStatus(ocl);
  
  switch (role) {
    case 'clo':
      return {
        label: `Overall Compliance Level: ${ocl}%`,
        subtext: riskConcentration || 'Risk concentrated in regulated roles',
      };
    case 'chief-of-staff':
      return {
        label: `Enterprise Compliance: ${ocl}%`,
        subtext: status === 'excellent' ? 'All divisions within tolerance' : 'Two divisions below tolerance',
      };
    case 'hr-admin':
      return {
        label: `Compliance Health: ${ocl}%`,
        subtext: '47 items need remediation',
      };
    case 'line-manager':
      return {
        label: `Your Team Compliance: ${ocl - 4}%`, // Team usually slightly lower
        subtext: '3 actions required',
      };
    case 'division-director':
      return {
        label: `Division Compliance: ${ocl - 7}%`, // Division view
        subtext: ocl >= 90 ? 'Above enterprise threshold' : 'Below enterprise threshold',
      };
    default:
      return {
        label: `Compliance Level: ${ocl}%`,
        subtext: '',
      };
  }
};

// Mock data generator for demo purposes
export const getMockOCLData = (role: UserRole): OCLData => {
  // Simulated metrics - in real app, these come from LMS data
  const metrics: ComplianceMetrics = {
    ccr: 94, // 94% completion rate
    otf: 87, // 87% on-time
    cvf: 91, // 91% valid certifications
    paf: 88, // 88% policies acknowledged
  };
  
  const level = calculateOCL(metrics);
  const { status, label } = getOCLStatus(level);
  const roleLabels = getRoleSpecificOCL(role, level);
  
  return {
    level,
    metrics,
    status,
    statusLabel: label,
    roleSpecificLabel: roleLabels.label,
    roleSpecificSubtext: roleLabels.subtext,
  };
};

// Industry expectations (display only, doesn't affect OCL)
export const INDUSTRY_EXPECTATIONS: Record<string, number> = {
  'Aviation': 97,
  'Healthcare / Pharma': 95,
  'Banking / Finance': 94,
  'Oil & Gas': 94,
  'IT / Hospitality': 90,
};
