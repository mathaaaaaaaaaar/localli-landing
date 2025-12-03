import {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  motion,
  useInView,
} from 'framer-motion';
import { Rocket } from 'lucide-react';

import { Button } from '../ui/button';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const launchDate = new Date("2026-03-01T00:00:00");
  const now = new Date();
  const difference = launchDate.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function CountdownUnit({ value, label, delay }: { value: number; label: string; delay: number }) {
  const [displayValue, setDisplayValue] = useState(value);
  
  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <div className="relative">
        <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 min-w-[80px] sm:min-w-[120px] shadow-lg">
          <motion.span
            key={displayValue}
            initial={{ opacity: 0, y: -20, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.3 }}
            className="block font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-center bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent"
          >
            {String(displayValue).padStart(2, "0")}
          </motion.span>
        </div>
        <div className="absolute -bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-sm" />
      </div>
      <span className="mt-3 text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
    </motion.div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6"
          >
            <Rocket className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Launching{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-chart-3">
              March 2026
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            We're building something special. Join the waitlist to be the first to know when we launch.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mb-12">
          <CountdownUnit value={timeLeft.days} label="Days" delay={0.1} />
          <CountdownUnit value={timeLeft.hours} label="Hours" delay={0.2} />
          <CountdownUnit value={timeLeft.minutes} label="Minutes" delay={0.3} />
          <CountdownUnit value={timeLeft.seconds} label="Seconds" delay={0.4} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Button size="lg" className="font-semibold px-8" data-testid="button-countdown-notify">
            Notify Me at Launch
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
