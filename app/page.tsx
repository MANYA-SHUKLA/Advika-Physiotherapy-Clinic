import Hero from "./components/Hero";
import Services from "./components/Services";
import AboutSection from "./components/AboutSection";
import ServiceList from "./components/ServiceList";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <AboutSection />
      <ServiceList />
      <Testimonials />
    </>
  );
}
