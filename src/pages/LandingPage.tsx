import BusinessSignupForm from '../components/landing/BusinessSignupForm';
import Countdown from '../components/landing/Countdown';
import Footer from '../components/landing/Footer';
import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import ServiceCategories from '../components/landing/ServiceCategories';
import Vision from '../components/landing/Vision';
import WhyLocalli from '../components/landing/WhyLocalli';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <WhyLocalli />
        <ServiceCategories />
        <BusinessSignupForm />
        <Countdown />
        <Vision />
      </main>
      <Footer />
    </div>
  );
}
