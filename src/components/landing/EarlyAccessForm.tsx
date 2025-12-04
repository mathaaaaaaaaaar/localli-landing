import {
  useRef,
  useState,
} from 'react';

import {
  AnimatePresence,
  motion,
  useInView,
} from 'framer-motion';
import {
  ArrowRight,
  Check,
  Mail,
  Sparkles,
  User,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

const formSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().email("Please enter a valid email"),
});

type FormData = z.infer<typeof formSchema>;

export default function EarlyAccessForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { first_name: "", last_name: "", email: "" },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/submit-early-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("API Error");
      await new Promise((r) => setTimeout(r, 1000));
      setIsSubmitting(false);
      setIsSubmitted(true);
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {!isSubmitted ? (
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h3 className="font-display text-xl font-bold">Get Early Access</h3>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input {...field} placeholder="First Name" className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input {...field} placeholder="Last Name" className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input {...field} type="email" placeholder="you@example.com" className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full font-semibold" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Sparkles className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  <>
                    Join Waitlist <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </motion.div>
      ) : (
        <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-2xl p-12 shadow-xl text-center"
        >
            <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center"
            >
            <Check className="w-10 h-10 text-white" />
            </motion.div>
            <h3 className="font-display text-2xl font-bold mb-3">You're on the list!</h3>
            <p className="text-muted-foreground mb-6">
            We'll be in touch soon with updates about early access.
            </p>
            <Button
            variant="outline"
            onClick={() => setIsSubmitted(false)}
            data-testid="button-submit-another"
            >
            Add another user
            </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
