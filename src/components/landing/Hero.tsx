import {
  useEffect,
  useState,
} from 'react';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  MapPin,
  Star,
  Users,
} from 'lucide-react';

import { Button } from '../ui/button';
import AnimatedBlobs from './AnimatedBlobs';
import EarlyAccessForm from './EarlyAccessForm';
import EarlyAccessModal from './EarlyAccessModal';
import TimedEarlyAccessForm from './TimedEarlyAccessForm';

const words = ["Find", "Local", "Services."];
const words2 = ["Support", "Local", "Businesses."];

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTimedModalOpen, setIsTimedModalOpen] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem("hasSeenEarlyModal");

    if (!hasSeen) {
      // Show modal for first-time visitors
      const timer = setTimeout(() => {
        setIsTimedModalOpen(true); // your modal state setter
        localStorage.setItem("hasSeenEarlyAccessModal", "true");
      }, 5000); // 5 seconds delay

      return () => clearTimeout(timer);
    }
  }, []);


  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <AnimatedBlobs />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-3 space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-primary">Launching March 2026</span>
            </motion.div>

            <div className="space-y-2">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1]">
                {words.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.1 + i * 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`inline-block mr-3 ${
                      word === "Local" ? "text-primary" : ""
                    }`}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1]">
                {words2.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.5 + i * 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`inline-block mr-3 ${
                      word === "Local" ? "text-accent" : ""
                    }`}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed"
            >
              The marketplace that connects you with trusted service providers in your neighborhood. 
              From home repairs to wellness, discover businesses that care about your community.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="group text-base font-semibold px-8"
                data-testid="button-hero-early-access"
                onClick={() => setIsModalOpen(true)}
              >
                Get Early Access
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base font-semibold px-8"
                data-testid="button-hero-business"
                onClick={() => {
                  const element = document.getElementById("business");
                  if(element) {
                    element.scrollIntoView({behavior: "smooth"});
                  }
                }}
              >
                I'm a Business
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="flex flex-wrap items-center gap-6 pt-4"
            >
              {[
                { icon: Users, label: "100+ businesses joining", value: "" },
                { icon: MapPin, label: "20+ cities planned", value: "" },
                { icon: Star, label: "Built for community", value: "" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <stat.icon className="w-4 h-4 text-primary" />
                  <span>{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="lg:col-span-2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-chart-3/20 rounded-3xl blur-2xl transform rotate-6" />
              
              <div className="relative space-y-4">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-card border border-border rounded-2xl p-5 shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-2xl text-white font-bold">
                      S
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Swift Home Repairs</h4>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">4.9 (127)</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">Plumbing</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">Electrical</span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="bg-card border border-border rounded-2xl p-5 shadow-lg ml-8"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center text-2xl text-white font-bold">
                      G
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Glow Beauty Studio</h4>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">5.0 (89)</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-chart-3/10 text-chart-3">Hair</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-chart-5/10 text-chart-5">Makeup</span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="bg-card border border-border rounded-2xl p-5 shadow-lg -ml-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-chart-3 to-chart-3/60 flex items-center justify-center text-2xl text-white font-bold">
                      Z
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Zen Wellness Center</h4>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">4.8 (203)</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">Massage</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-chart-4/10 text-chart-4">Yoga</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"
          />
        </motion.div>
      </motion.div>
      <EarlyAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <EarlyAccessForm />
      </EarlyAccessModal>

      <EarlyAccessModal isOpen={isTimedModalOpen} onClose={() => setIsTimedModalOpen(false)}>
        <TimedEarlyAccessForm />
      </EarlyAccessModal>
    </section>
  );
}
