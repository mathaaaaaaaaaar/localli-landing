import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Home,
  Scissors,
  Briefcase,
  PartyPopper,
  Car,
  Dog,
  Stethoscope,
  GraduationCap,
  Dumbbell,
  Camera,
  Utensils,
  Wrench,
  ArrowRight,
} from "lucide-react";

const categories = [
  { icon: Home, name: "Home Services", count: "150+", color: "from-primary to-primary/70", bgHover: "primary" },
  { icon: Scissors, name: "Beauty & Wellness", count: "200+", color: "from-accent to-accent/70", bgHover: "accent" },
  { icon: Briefcase, name: "Professional", count: "80+", color: "from-chart-3 to-chart-3/70", bgHover: "chart-3" },
  { icon: PartyPopper, name: "Events", count: "120+", color: "from-chart-5 to-chart-5/70", bgHover: "chart-5" },
  { icon: Car, name: "Auto Services", count: "90+", color: "from-chart-4 to-chart-4/70", bgHover: "chart-4" },
  { icon: Dog, name: "Pet Care", count: "75+", color: "from-primary to-accent", bgHover: "primary" },
  { icon: Stethoscope, name: "Health & Medical", count: "60+", color: "from-accent to-chart-3", bgHover: "accent" },
  { icon: GraduationCap, name: "Education", count: "100+", color: "from-chart-3 to-chart-4", bgHover: "chart-3" },
  { icon: Dumbbell, name: "Fitness", count: "85+", color: "from-chart-4 to-primary", bgHover: "chart-4" },
  { icon: Camera, name: "Photography", count: "70+", color: "from-chart-5 to-accent", bgHover: "chart-5" },
  { icon: Utensils, name: "Food & Catering", count: "110+", color: "from-accent to-chart-5", bgHover: "accent" },
  { icon: Wrench, name: "Repairs", count: "95+", color: "from-primary to-chart-3", bgHover: "primary" },
];

function CategoryCard({ category, index }: { category: typeof categories[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const x = useSpring(useTransform(mouseX, [-100, 100], [-6, 6]), springConfig);
  const y = useSpring(useTransform(mouseY, [-100, 100], [-6, 6]), springConfig);
  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-5, 5]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      style={{ x, y, rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group cursor-pointer"
      data-testid={`card-category-${category.name.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <motion.div 
        className={`relative h-full bg-card rounded-2xl p-5 overflow-hidden transition-all duration-300 border ${
          isHovered 
            ? "border-primary/50 shadow-2xl shadow-primary/10" 
            : "border-border shadow-sm"
        }`}
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${category.color} rounded-2xl`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.08 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl"
          style={{ background: `hsl(var(--${category.bgHover}) / 0.4)` }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            scale: isHovered ? 1 : 0.5,
          }}
          transition={{ duration: 0.4 }}
        />
        
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <motion.div 
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}
              animate={{
                scale: isHovered ? 1.15 : 1,
                rotate: isHovered ? [0, -5, 5, 0] : 0,
              }}
              transition={{ 
                scale: { duration: 0.3 },
                rotate: { duration: 0.5, ease: "easeInOut" }
              }}
            >
              <category.icon className="w-6 h-6 text-white" />
            </motion.div>
            
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                isHovered 
                  ? "bg-primary/10 text-primary" 
                  : "bg-muted/50 text-muted-foreground"
              }`}
            >
              {category.count}
            </div>
          </div>
          
          <h3 className="font-display text-base font-bold mb-1 transition-colors duration-300 group-hover:text-primary">
            {category.name}
          </h3>
          
          <p className="text-xs text-muted-foreground mb-3">Local providers</p>
          
          <motion.div 
            className="mt-auto flex items-center gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              x: isHovered ? 0 : -10 
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-xs font-semibold text-primary">Explore</span>
            <motion.div
              animate={{ x: isHovered ? [0, 4, 0] : 0 }}
              transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
            >
              <ArrowRight className="w-3 h-3 text-primary" />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: isHovered ? 1 : 0, 
            opacity: isHovered ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function ServiceCategories() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            Service Categories
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Everything you need,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-chart-3">
              right next door
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From home repairs to personal wellness, we're building the most comprehensive 
            local services marketplace.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <CategoryCard key={category.name} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
