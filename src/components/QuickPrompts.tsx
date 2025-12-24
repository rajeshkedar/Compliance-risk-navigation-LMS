import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface QuickPromptCardProps {
  prompt: string;
  icon: string;
  onClick: (prompt: string) => void;
  index: number;
}

export const QuickPromptCard = ({ prompt, icon, onClick, index }: QuickPromptCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Card
        variant="interactive"
        className="cursor-pointer group"
        onClick={() => onClick(prompt)}
      >
        <CardContent className="p-4 flex items-center gap-3">
          <span className="text-xl group-hover:scale-110 transition-transform">
            {icon}
          </span>
          <span className="text-sm text-foreground group-hover:text-primary transition-colors">
            {prompt}
          </span>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface QuickPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const prompts = [
  { text: 'What is my compliance risk today?', icon: '📊' },
  { text: 'Are we audit-ready?', icon: '✅' },
  { text: 'Where is risk increasing?', icon: '📈' },
  { text: 'What actions should I take now?', icon: '🎯' },
];

export const QuickPrompts = ({ onSelectPrompt }: QuickPromptsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {prompts.map((prompt, index) => (
        <QuickPromptCard
          key={prompt.text}
          prompt={prompt.text}
          icon={prompt.icon}
          onClick={onSelectPrompt}
          index={index}
        />
      ))}
    </div>
  );
};
