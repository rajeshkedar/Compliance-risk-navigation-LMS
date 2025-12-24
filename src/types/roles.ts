export type UserRole = 'clo' | 'hr-admin' | 'chief-of-staff' | 'line-manager' | 'division-director';

export interface RoleInfo {
  id: UserRole;
  title: string;
  description: string;
  icon: string;
  welcomeMessage: string;
}

export const roles: RoleInfo[] = [
  {
    id: 'clo',
    title: 'Chief Learning Officer',
    description: 'Strategic oversight of learning impact on compliance risk',
    icon: '🎯',
    welcomeMessage: "Hi! I'm here to help you understand how learning impacts compliance risk across the organization — and where strategy can reduce exposure.",
  },
  {
    id: 'hr-admin',
    title: 'HR / LMS Admin',
    description: 'Training completion tracking and audit readiness',
    icon: '📊',
    welcomeMessage: "Hi! I'll help you spot what's overdue, expiring, or missing — and what to fix before it becomes an audit issue.",
  },
  {
    id: 'chief-of-staff',
    title: 'Chief of Staff',
    description: 'Executive summaries and leadership risk visibility',
    icon: '📋',
    welcomeMessage: "Hi! I'll surface the top compliance risks leadership should know, and help you prepare clear executive summaries.",
  },
  {
    id: 'line-manager',
    title: 'Line Manager',
    description: 'Team compliance status and direct actions',
    icon: '👥',
    welcomeMessage: "Hi! I'll show you exactly what your team needs from you to stay compliant — no reports required.",
  },
  {
    id: 'division-director',
    title: 'Division Director',
    description: 'Division-level exposure and risk reduction',
    icon: '🏢',
    welcomeMessage: "Hi! I'll help you understand where your division is exposed, why, and how to reduce risk quickly.",
  },
];

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface RiskLevel {
  score: number;
  level: 'low' | 'medium' | 'high';
  label: string;
}

export const getRiskLevel = (score: number): RiskLevel => {
  if (score <= 30) {
    return { score, level: 'low', label: 'Low Risk' };
  } else if (score <= 60) {
    return { score, level: 'medium', label: 'Moderate Risk' };
  } else {
    return { score, level: 'high', label: 'Elevated Risk' };
  }
};
