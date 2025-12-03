import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Shield, Zap, Heart, MessageCircle, TrendingUp } from "lucide-react";

const features = [
  {
    number: "01",
    icon: Search,
    title: "Discover Instantly",
    description: "Find trusted local services in seconds. Filter by location, ratings, availability, and price range.",
    gradient: "from-primary to-primary/60",
  },
  {
    number: "02",
    icon: Shield,
    title: "Verified Businesses",
    description: "Every business is vetted and verified. Real reviews from real customers in your community.",
    gradient: "from-accent to-accent/60",
  },
  {
    number: "03",
    icon: Zap,
    title: "Book Seamlessly",
    description: "Schedule appointments, get quotes, and pay securely - all in one place. No more phone tag.",
    gradient: "from-chart-3 to-chart-3/60",
  },
  {
    number: "04",
    icon: Heart,
    title: "Support Local",
    description: "Every booking supports a local business. Build relationships with service providers who know your neighborhood.",
    gradient: "from-chart-5 to-chart-5/60",
  },
  {
    number: "05",
    icon: MessageCircle,
    title: "Direct Communication",
    description: "Message businesses directly. Get quick responses and build lasting relationships with your service providers.",
    gradient: "from-chart-4 to-chart-4/60",
  },
  {
    number: "06",
    icon: TrendingUp,
    title: "Grow Together",
    description: "Businesses get tools to grow. Customers get better service. Everyone wins in the local economy.",
    gradient: "from-primary to-accent",
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative bg-card border border-border rounded-2xl p-6 lg:p-8 h-full transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
        <div className="absolute top-0 right-0 opacity-5 text-8xl font-display font-bold select-none">
          {feature.number}
        </div>
        
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
          <feature.icon className="w-6 h-6 text-white" />
        </div>
        
        <span className="text-xs font-mono text-muted-foreground mb-2 block">{feature.number}</span>
        
        <h3 className="font-display text-xl font-bold mb-3">{feature.title}</h3>
        
        <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
        
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
        />
      </div>
    </motion.div>
  );
}

export default function WhyLocalli() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="why" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Built for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              communities
            </span>
            , <br className="hidden sm:block" />
            powered by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-chart-3">
              trust
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We're reimagining how people find and connect with local service businesses. 
            Here's what makes Localli different.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.number} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
