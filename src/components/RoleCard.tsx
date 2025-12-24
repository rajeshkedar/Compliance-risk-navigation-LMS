import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { RoleInfo } from '@/types/roles';

interface RoleCardProps {
  role: RoleInfo;
  onSelect: (role: RoleInfo) => void;
  index: number;
}

export const RoleCard = ({ role, onSelect, index }: RoleCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: 'easeOut' }}
    >
      <Card
        variant="interactive"
        className="group h-full"
        onClick={() => onSelect(role)}
      >
        <CardContent className="p-6 flex flex-col items-start gap-4">
          <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
            {role.icon}
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {role.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {role.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
