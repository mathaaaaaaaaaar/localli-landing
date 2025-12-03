import { useState } from 'react';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Github,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  Sparkles,
  Twitter,
} from 'lucide-react';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Github, href: "#", label: "GitHub" },
];

const footerLinks = {
  Product: ["Features", "Pricing", "For Businesses", "Mobile App"],
  Company: ["About", "Blog", "Careers", "Press"],
  Resources: ["Help Center", "Community", "Guidelines", "API Docs"],
  Legal: ["Privacy", "Terms", "Cookies", "Licenses"],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log("Newsletter signup:", email);
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail("");
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
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ y: -3 }}
                    className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    data-testid={`link-social-${social.label.toLowerCase()}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium">Building in Public</span>
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

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {Object.entries(footerLinks).map(([category, links]) => (
                  <div key={category}>
                    <h5 className="font-semibold text-sm mb-3">{category}</h5>
                    <ul className="space-y-2">
                      {links.map((link) => (
                        <li key={link}>
                          <a
                            href="#"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                            data-testid={`link-footer-${link.toLowerCase().replace(/\s+/g, "-")}`}
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
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
