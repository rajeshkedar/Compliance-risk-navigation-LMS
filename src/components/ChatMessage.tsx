import { motion } from 'framer-motion';
import { Message } from '@/types/roles';
import { RiskIndicator } from './RiskIndicator';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: Message;
  isLatest?: boolean;
}

// Simple parser to detect risk scores in AI responses
const parseRiskFromContent = (content: string): number | null => {
  const match = content.match(/Risk:\s*(HIGH|MEDIUM|LOW)\s*\((\d+)\/100\)/i);
  if (match) {
    return parseInt(match[2], 10);
  }
  return null;
};

export const ChatMessage = ({ message, isLatest }: ChatMessageProps) => {
  const isAssistant = message.role === 'assistant';
  const riskScore = isAssistant ? parseRiskFromContent(message.content) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'flex gap-4',
        isAssistant ? 'justify-start' : 'justify-end'
      )}
    >
      {isAssistant && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-sm">🧠</span>
        </div>
      )}
      
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-5 py-4',
          isAssistant
            ? 'bg-card border border-border'
            : 'bg-primary/10 border border-primary/20'
        )}
      >
        {riskScore !== null && (
          <div className="mb-4 flex justify-center">
            <RiskIndicator score={riskScore} size="md" />
          </div>
        )}
        
        <div className="text-foreground leading-relaxed whitespace-pre-wrap">
          {message.content}
        </div>
        
        <div className="mt-2 text-xs text-muted-foreground">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      
      {!isAssistant && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
          <span className="text-sm">👤</span>
        </div>
      )}
    </motion.div>
  );
};
