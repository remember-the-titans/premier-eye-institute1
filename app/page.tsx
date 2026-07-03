import { VideoHero } from "@/components/home/video-hero";
import { Intro } from "@/components/home/intro";
import { Marquee } from "@/components/home/marquee";
import { Services } from "@/components/home/services";
import { Doctor } from "@/components/home/doctor";
import { Testimonials } from "@/components/home/testimonials";
import { Stats } from "@/components/home/stats";
import { Faq } from "@/components/home/faq";
import { ContactSection } from "@/components/contact/contact-section";

export default function Home() {
  return (
    <>
      <VideoHero />
      <Intro />
      <Marquee />
      <Services />
      <Doctor />
      <Testimonials />
      <Stats />
      <Faq />
      <ContactSection />
    </>
  );
}
