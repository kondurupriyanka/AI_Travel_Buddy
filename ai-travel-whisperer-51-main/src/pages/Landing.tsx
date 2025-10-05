import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Sparkles, Route, ArrowRight } from "lucide-react";

const Landing = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Recommendations",
      description: "Get personalized travel suggestions based on your preferences and budget",
    },
    {
      icon: MapPin,
      title: "Hidden Gems Discovery",
      description: "Explore off-the-beaten-path destinations that match your interests",
    },
    {
      icon: Route,
      title: "Smart Route Planning",
      description: "Optimized itineraries that save time and maximize your experience",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background with Gradient - Fallback when image is not available */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700">
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              AI Travel Companion
            </motion.h1>
            <p className="text-xl md:text-2xl text-white mb-8 font-light drop-shadow-md">
              Your Smart Travel Guide for Hidden Gems and Best Routes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/plan">
                <Button size="lg" className="gap-2 text-lg px-8">
                  Start Planning
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/explore">
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8 bg-white/20 backdrop-blur-sm border-white/50 text-white hover:bg-white/30 hover:text-white">
                  Explore Now
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Floating Animation */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="w-8 h-12 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-white rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-ocean bg-clip-text text-transparent">
              Why Choose AI Travel Companion?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Harness the power of AI to create unforgettable travel experiences
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="p-8 rounded-2xl bg-card/95 backdrop-blur-sm border border-border/50 hover:shadow-lg transition-all duration-300 hover:bg-card"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-ocean relative overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let our AI guide you to your perfect destination
            </p>
            <Link to="/plan">
              <Button size="lg" variant="secondary" className="gap-2 text-lg px-8">
                Plan Your Trip Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
