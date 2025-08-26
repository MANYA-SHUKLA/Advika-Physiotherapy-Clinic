
export default function TeamPage() {
  const team = [
    {
      name: "Dr. Rohan Mehta",
      role: "Senior Physiotherapist",
      image: "/team-1.jpg", // 👈 place your images in public folder
    },
    {
      name: "Dr. Kavita Singh",
      role: "Rehabilitation Specialist",
      image: "/team-2.jpg",
    },
    {
      name: "Dr. Aarav Kapoor",
      role: "Sports Injury Expert",
      image: "/team-3.jpg",
    },
    {
      name: "Dr. Neha Verma",
      role: "Pediatric Physiotherapist",
      image: "/team-4.jpg",
    },
  ];

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="bg-[#f8f7f5] py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-libertinus text-gray-900 mb-4">
          Our Team
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Meet the dedicated professionals at Advika Physiotherapy Clinic who
          are committed to your care and recovery.
        </p>
      </section>

      {/* Team Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {team.map((member, index) => (
            <div
              key={index}
              className="group text-center bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
            >
              {/* Image */}
              <div className="relative w-full h-80 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#6d7a5d] transition">
                  {member.name}
                </h3>
                <p className="text-gray-500 text-sm mt-2">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
