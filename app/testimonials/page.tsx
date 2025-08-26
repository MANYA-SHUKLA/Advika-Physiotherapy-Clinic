import ServiceList from "../components/ServiceList";
import Testimonials from "../components/Testimonials";

export default function TestimonialsPage() {
  return (
    <main className="pt-20"> {/* 👈 pushes content below navbar */}
      {/* Testimonials Component */}
      <Testimonials />

      {/* Services List Section */}
      <ServiceList />

    </main>
  );
}
