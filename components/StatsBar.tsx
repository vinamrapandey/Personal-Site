const stats = [
  { value: "7", label: "Products shipped" },
  { value: "2", label: "Live SaaS products" },
  { value: "250+", label: "Users served at one live event" },
  { value: "100%", label: "Solo — brand to deployment" },
];

export default function StatsBar() {
  return (
    <section className="px-6 sm:px-10">
      <div className="mx-auto grid w-full max-w-content grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-canvas px-6 py-8 text-center">
            <p className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {stat.value}
            </p>
            <p className="mx-auto mt-2 max-w-[12rem] text-sm text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
