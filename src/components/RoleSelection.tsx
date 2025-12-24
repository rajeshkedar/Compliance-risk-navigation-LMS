import { motion } from 'framer-motion';
import { roles, RoleInfo } from '@/types/roles';
import { RoleCard } from './RoleCard';

interface RoleSelectionProps {
  onSelectRole: (role: RoleInfo) => void;
}

export const RoleSelection = ({ onSelectRole }: RoleSelectionProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <span className="text-2xl">🧠</span>
            <span className="text-sm font-medium text-primary">Compliance & Risk Co-Pilot</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Welcome to your{' '}
            <span className="text-gradient">trusted advisor</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ask questions in plain language. I'll translate learning data into clear risk insights and next steps.
          </p>
        </motion.div>

        {/* Role Selection */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-6"
        >
          <p className="text-center text-muted-foreground text-sm">
            Select your role to get personalized insights
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map((role, index) => (
              <RoleCard
                key={role.id}
                role={role}
                onSelect={onSelectRole}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Trust indicator */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center text-sm text-muted-foreground"
        >
          Trusted by leaders across regulated industries
        </motion.p>
      </div>
    </div>
  );
};
