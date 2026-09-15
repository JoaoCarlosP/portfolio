export function Section({
  id,
  title,
  lead,
  children,
}: {
  id: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-line py-20 sm:py-24">
      <div className="mb-10 max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {title}
        </h2>
        {lead && <p className="mt-3 text-[15px] leading-relaxed text-muted">{lead}</p>}
      </div>
      {children}
    </section>
  );
}
