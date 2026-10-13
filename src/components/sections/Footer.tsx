import { contact, site } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative z-40 bg-black px-5 pb-[60px] pt-20 text-center text-white min-[801px]:px-12 min-[801px]:pt-[120px]"
    >
      <h2 className="mb-[30px] font-disp text-[clamp(38px,7.8vw,96px)] font-bold tracking-[-0.03em]">
        {contact.heading.before}
        <a
          href={`mailto:${site.email}`}
          className="text-accent underline decoration-4"
        >
          {contact.heading.link}
        </a>
        {contact.heading.after}
      </h2>
      <div className="mb-[70px] flex flex-wrap justify-center gap-7 font-disp text-[17px] font-bold">
        {contact.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="break-all transition-colors hover:text-accent"
          >
            {link.label}
            {link.external && <span className="sr-only"> (opens in a new tab)</span>}
          </a>
        ))}
      </div>
      <div className="font-mono text-[13px] text-muted-light">{contact.copyright}</div>
    </footer>
  );
}
