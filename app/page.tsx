import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import FeaturedSection from "@/components/FeaturedSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <CategorySection />
      <FeaturedSection />
      <TestimonialsSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
