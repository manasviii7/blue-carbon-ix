import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Send, 
  Sparkles, 
  TrendingDown, 
  Target, 
  ShoppingCart,
  Lightbulb,
  BarChart,
  Leaf
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: string[];
}

export const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI Carbon Advisor. I can help you with emission reduction strategies, credit purchasing optimization, and compliance planning. What would you like to know?",
      sender: 'ai',
      timestamp: new Date(),
      suggestions: [
        "How can I reduce my transport emissions by 20%?",
        "When should I buy carbon credits?",
        "What's the best renewable energy option for my industry?",
        "Help me plan for carbon neutrality by 2025"
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickSuggestions = [
    { icon: <TrendingDown className="h-4 w-4" />, text: "Reduce emissions", query: "What are the most effective ways to reduce carbon emissions in manufacturing?" },
    { icon: <ShoppingCart className="h-4 w-4" />, text: "Buy credits", query: "How many carbon credits should I buy and when?" },
    { icon: <Target className="h-4 w-4" />, text: "Set targets", query: "Help me set realistic carbon reduction targets for next year" },
    { icon: <BarChart className="h-4 w-4" />, text: "Track progress", query: "How can I better track and report my carbon reduction progress?" }
  ];

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage.trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = '';
      let suggestions: string[] = [];

      // Simple keyword-based responses for demo
      if (text.toLowerCase().includes('reduce') || text.toLowerCase().includes('emission')) {
        aiResponse = `Based on your industry profile, here are personalized emission reduction strategies:

🏭 **Manufacturing Optimization:**
• Switch to renewable energy sources (can reduce emissions by 30-40%)
• Implement energy-efficient equipment and LED lighting
• Optimize production schedules to reduce peak energy usage

🚛 **Transportation Efficiency:**
• Transition fleet to electric/hybrid vehicles
• Optimize delivery routes using AI algorithms
• Encourage employee carpooling and remote work

💡 **Immediate Actions:**
• Conduct energy audit to identify wastage
• Set up carbon monitoring systems
• Train employees on sustainability practices

**Estimated Impact:** These changes could reduce your annual emissions by 2,500-3,000 tons CO₂, saving approximately ₹2.5-3 lakhs in carbon credit costs.`;

        suggestions = [
          "What's the ROI on solar panel installation?",
          "How to calculate emission reduction from electric vehicles?",
          "Best practices for employee sustainability training"
        ];
      } 
      else if (text.toLowerCase().includes('credit') || text.toLowerCase().includes('buy')) {
        aiResponse = `Here's your optimized carbon credit purchase strategy:

📊 **Current Analysis:**
• Your annual emissions: ~8,450 tons CO₂
• Credits owned: 2,100 credits
• Additional credits needed: 6,350 credits

💰 **Purchase Recommendations:**
• **Immediate (next 30 days):** Buy 2,000 credits at current rates (₹95-100/credit)
• **Q4 2024:** Purchase 2,000 more credits (prices expected to rise 5-8%)
• **Q1 2025:** Final 2,350 credits purchase

🎯 **Optimized Purchasing:**
• **Best projects:** Sundarbans Mangrove (₹100/credit) - highest verification rating
• **Budget-friendly:** Chilika Seagrass (₹95/credit) - good value proposition
• **Total investment:** ₹6.15-6.35 lakhs over 6 months

**Cost Savings:** This staggered approach can save you ₹15,000-25,000 compared to bulk purchase.`;

        suggestions = [
          "Compare different blue carbon projects",
          "Set up automatic credit purchasing",
          "What happens if I don't buy enough credits?"
        ];
      }
      else if (text.toLowerCase().includes('target') || text.toLowerCase().includes('neutral')) {
        aiResponse = `Let me create a realistic carbon neutrality roadmap for your company:

🎯 **2025 Carbon Neutrality Plan:**

**Phase 1 (Next 6 months):**
• Baseline measurement: Complete carbon audit ✅
• Quick wins: LED conversion, energy efficiency (15% reduction)
• Credit purchase: 3,000 credits to cover current deficit

**Phase 2 (6-12 months):**
• Renewable energy: Solar installation (25% emission reduction)
• Fleet transition: 30% vehicles to electric/hybrid
• Supplier engagement: Green supply chain requirements

**Phase 3 (12-18 months):**
• Manufacturing optimization: Process improvements (20% reduction)
• Employee programs: Sustainability training and incentives
• Final credit purchase: Remaining offset requirements

**Investment Required:**
• Technology upgrades: ₹15-20 lakhs
• Carbon credits: ₹6-8 lakhs
• Training & systems: ₹2-3 lakhs

**ROI:** Break-even in 2.5 years through energy savings and carbon credit value appreciation.`;

        suggestions = [
          "Break down costs for renewable energy installation",
          "How to engage suppliers in carbon reduction?",
          "Track progress towards neutrality goals"
        ];
      }
      else {
        aiResponse = `I understand you're looking for guidance on carbon management. Here are some areas I can help you with:

🌱 **Emission Reduction Strategies**
• Energy efficiency improvements
• Renewable energy transition
• Process optimization
• Supply chain sustainability

💰 **Carbon Credit Management**
• Optimal purchasing timing
• Project selection and verification
• Cost-benefit analysis
• Portfolio diversification

📊 **Compliance & Reporting**
• Regulatory requirements
• Sustainability reporting standards
• Target setting and tracking
• Audit preparation

🎯 **Strategic Planning**
• Carbon neutrality roadmaps
• Investment prioritization
• Risk assessment
• Stakeholder engagement

Feel free to ask specific questions about any of these areas!`;

        suggestions = [
          "Show me my emission reduction opportunities",
          "What's my optimal credit purchase strategy?",
          "Create a carbon neutrality roadmap"
        ];
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        suggestions
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickSuggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-primary/10 hover:border-primary/30"
                onClick={() => handleSendMessage(suggestion.query)}
              >
                <div className="text-primary">{suggestion.icon}</div>
                <span className="text-sm font-medium">{suggestion.text}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="border-b border-border/50">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-secondary" />
            AI Carbon Advisor
            <Badge className="bg-secondary/10 text-secondary">Online</Badge>
          </CardTitle>
        </CardHeader>

        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.sender === 'ai' && (
                <Avatar className="h-8 w-8 border-2 border-secondary/20">
                  <AvatarFallback className="bg-secondary/10 text-secondary">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-first' : ''}`}>
                <div className={`p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-primary text-primary-foreground ml-auto' 
                    : 'bg-muted'
                }`}>
                  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                </div>
                
                {message.suggestions && (
                  <div className="mt-2 space-y-1">
                    {message.suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className="text-xs text-muted-foreground hover:text-primary h-auto p-2 justify-start"
                        onClick={() => handleSendMessage(suggestion)}
                      >
                        <Lightbulb className="h-3 w-3 mr-1" />
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              {message.sender === 'user' && (
                <Avatar className="h-8 w-8 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary">U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3">
              <Avatar className="h-8 w-8 border-2 border-secondary/20">
                <AvatarFallback className="bg-secondary/10 text-secondary">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        {/* Input */}
        <div className="border-t border-border/50 p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ask about emission reduction, credit purchasing, or compliance planning..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isLoading}
              className="gradient-primary text-white hover:opacity-90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};