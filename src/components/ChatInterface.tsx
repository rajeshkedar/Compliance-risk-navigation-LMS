import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RoleInfo, Message } from '@/types/roles';
import { ChatMessage } from './ChatMessage';
import { QuickPrompts } from './QuickPrompts';

interface ChatInterfaceProps {
  role: RoleInfo;
  onBack: () => void;
}

// Simulated AI responses based on prompts
const getAIResponse = (prompt: string, role: RoleInfo): string => {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('compliance risk today') || lowerPrompt.includes('risk today')) {
    return `**Compliance Risk: HIGH (68/100)**

This risk is driven by overdue training in regulated roles and certifications approaching expiration.

Here's what I found:
• 23 employees have overdue mandatory training
• 12 certifications expire within 30 days
• 3 high-risk departments need immediate attention

Focusing on these items in the next two weeks will significantly reduce exposure.

Would you like help addressing this now?`;
  }
  
  if (lowerPrompt.includes('audit-ready') || lowerPrompt.includes('audit ready')) {
    return `**Audit Readiness: MODERATE**

You're partially prepared, but there are areas needing attention before a formal audit.

Current status:
• Documentation: 87% complete
• Training records: 94% up-to-date
• Policy acknowledgments: 76% signed

The main gaps are in policy acknowledgments and 3 missing training records in the Finance department.

I can generate an audit summary if you'd like.`;
  }
  
  if (lowerPrompt.includes('risk increasing') || lowerPrompt.includes('where is risk')) {
    return `**Risk Trend Analysis**

Risk is increasing in two key areas:

1. **Operations Division** (+15% this month)
   - New hires without completed onboarding
   - Delayed annual compliance training

2. **Customer Service** (+8% this month)
   - Data privacy training gaps
   - GDPR refresher courses overdue

These increases are addressable with focused action in the next 2 weeks.`;
  }
  
  if (lowerPrompt.includes('actions') || lowerPrompt.includes('what should i')) {
    return `**Recommended Actions**

Based on your current risk profile, here are your priority actions:

1. **Urgent** - Notify 23 employees about overdue training
2. **This week** - Review 12 expiring certifications
3. **This month** - Complete policy acknowledgment campaign

Starting with the urgent items will have the biggest impact on your risk score.

Would you like me to help with any of these?`;
  }
  
  // Default response
  return `I understand you're asking about "${prompt}".

Based on the learning and compliance data I have access to, I can provide insights tailored to your role as ${role.title}.

Here's what I can help you with:
• Current compliance risk assessment
• Training completion status
• Upcoming deadlines and expirations
• Actionable recommendations

What specific aspect would you like to explore?`;
};

export const ChatInterface = ({ role, onBack }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `👋 ${role.welcomeMessage}`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAIResponse(messageText, role),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const showQuickPrompts = messages.length <= 1;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-lg">🧠</span>
            </div>
            <div>
              <h1 className="font-semibold text-foreground">Compliance Co-Pilot</h1>
              <p className="text-xs text-muted-foreground">{role.title}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          <AnimatePresence>
            {messages.map((message, index) => (
              <ChatMessage
                key={message.id}
                message={message}
                isLatest={index === messages.length - 1}
              />
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm">🧠</span>
              </div>
              <div className="bg-card border border-border rounded-2xl px-5 py-4">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-soft" />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-soft" style={{ animationDelay: '0.2s' }} />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-soft" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </motion.div>
          )}

          {showQuickPrompts && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-4"
            >
              <p className="text-sm text-muted-foreground mb-4">Quick questions to get started:</p>
              <QuickPrompts onSelectPrompt={handleSend} />
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm sticky bottom-0">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Card variant="default" className="flex items-center gap-2 p-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a compliance or risk question…"
              className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground px-3 py-2"
            />
            <Button
              variant="warm"
              size="icon"
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
            >
              <Send className="w-4 h-4" />
            </Button>
          </Card>
          <p className="text-xs text-muted-foreground text-center mt-3">
            I'm here whenever you need clarity. Feel free to check back as things change.
          </p>
        </div>
      </footer>
    </div>
  );
};
