import { useState } from 'react';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Heart,
  Mail,
  Sparkles,
} from 'lucide-react';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

const founders = [
  { name: "Mathar Syed", imageSrc: "/sms.jpg", linkedin: "https://www.linkedin.com/in/shaikmathar/" },
  { name: "Amarnath K", imageSrc: "/amark.jpg", linkedin: "https://www.linkedin.com/in/amarnath-kathiresan/" },
  { name: "Shan Bhaskaran", imageSrc: "/shan.jpg", linkedin: "https://www.linkedin.com/in/shanshihan-baskaran/" }
];


export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    console.log("Newsletter signup:", email);
    setIsSubscribed(true);
    try {
      const res = await fetch("/api/submit-early-user.ts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: "", // unknown from footer, can leave empty
          last_name: "",  // unknown from footer, can leave empty
          email: email,
        }),
      });

      if (!res.ok) throw new Error("API error");

      // reset input
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
      setIsSubscribed(false);
    }
  };

  return (
    <footer className="relative overflow-hidden">
      <svg
        className="absolute top-0 left-0 right-0 w-full h-24 -translate-y-1"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,50 C360,100 720,0 1080,50 C1260,75 1350,75 1440,50 L1440,100 L0,100 Z"
          fill="hsl(var(--card))"
        />
      </svg>

      <div className="bg-card pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
            <div className="space-y-8">
              <motion.a
                href="#"
                className="inline-flex items-center gap-2 group"
                whileHover={{ scale: 1.02 }}
                data-testid="link-footer-logo"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center">
                    <span className="text-2xl font-display font-bold text-white">L</span>
                  </div>
                  <motion.div
                    className="absolute -top-1 -right-1"
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-4 h-4 text-accent" />
                  </motion.div>
                </div>
                <span className="font-display text-2xl font-bold tracking-tight">
                  Local<span className="text-primary">li</span>
                </span>
              </motion.a>

              <p className="text-muted-foreground max-w-sm leading-relaxed">
                Connecting communities with trusted local services. 
                We're building the future of how people find and book local businesses.
              </p>


              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium">Building in Public</span>
              </div>
                {founders.map((founder) => (
                  <motion.a
                    key={founder.name}
                    href={founder.linkedin}
                    whileHover={{ y: -3 }}
                    className="w-10 h-10 rounded-full overflow-hidden border border-muted/50 hover:border-primary transition-colors"
                    data-testid={`link-social-${founder.name.toLowerCase()}`}
                  >
                    <img 
                    src={founder.imageSrc}
                    alt={founder.name}
                    className="w-full h-full object-cover" />
                  </motion.a>
                ))}
              </div>

            </div>

            <div className="space-y-8">
              <div>
                <h4 className="font-display text-lg font-bold mb-4">Stay in the loop</h4>
                <p className="text-muted-foreground mb-4">
                  Get updates on our progress and be the first to know about new features.
                </p>
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      data-testid="input-newsletter-email"
                    />
                  </div>
                  <Button type="submit" data-testid="button-newsletter-subscribe">
                    {isSubscribed ? "Subscribed!" : <ArrowRight className="w-5 h-5" />}
                  </Button>
                </form>
              </div>

            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              2024 Localli. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for local communities
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
