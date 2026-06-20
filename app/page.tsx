import LandingHero from "@/components/landing/LandingHero";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import LiveExample from "@/components/landing/LiveExample";
import SocialProof from "@/components/landing/SocialProof";
import LandingFAQ from "@/components/landing/LandingFAQ";
import LandingFooter from "@/components/landing/LandingFooter";

export default function LandingPage() {
  return (
    <>
      <LandingHero />
      <HowItWorks />
      <Features />
      <LiveExample />
      <SocialProof />
      <LandingFAQ />
      <LandingFooter />
    </>
  );
}
