import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles, Globe, Zap, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const About = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Intelligence",
      description: "Leveraging Gemini AI for smart, personalized travel recommendations",
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Access to destinations and hidden gems worldwide",
    },
    {
      icon: Zap,
      title: "Instant Planning",
      description: "Generate complete itineraries in seconds",
    },
    {
      icon: Heart,
      title: "Made for Travelers",
      description: "Built with love by travelers, for travelers",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the form data to a backend
    console.log('Form submitted:', formData);
    
    toast({
      title: "Message Sent! 📧",
      description: "Thank you for reaching out. We'll get back to you soon!",
    });

    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-ocean bg-clip-text text-transparent">
              About AI Travel Companion
            </h1>
            <p className="text-xl text-muted-foreground">
              Your intelligent travel planning partner
            </p>
          </div>

          <div className="backdrop-blur-sm bg-card rounded-2xl border border-border/50 p-8 shadow-lg mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              AI Travel Companion was created to revolutionize the way people plan and experience travel.
              By harnessing the power of artificial intelligence, we provide personalized recommendations,
              smart itineraries, and real-time information to make every journey unforgettable.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether you're looking for hidden gems off the beaten path, planning a budget-friendly
              adventure, or seeking the perfect luxury getaway, our AI-powered platform adapts to your
              preferences and delivers tailored suggestions that match your unique travel style.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="backdrop-blur-sm bg-card rounded-2xl border border-border/50 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto"
          id="contact"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-ocean bg-clip-text text-transparent">
              Get in Touch
            </h2>
            <p className="text-muted-foreground">
              Have questions? We'd love to hear from you!
            </p>
          </div>

          <div className="backdrop-blur-sm bg-card rounded-2xl border border-border/50 p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us how we can help..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
