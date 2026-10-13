import { marqueeItems } from "@/data/portfolio";

function Half({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 gap-7 pr-7" aria-hidden={hidden || undefined}>
      {marqueeItems.map((item) => (
        <span key={item} className="contents">
          <span>{item}</span>
          <span>✦</span>
        </span>
      ))}
    </div>
  );
}

/** Infinite skills ticker. The second half is a visual duplicate for the seamless loop. */
export default function Marquee() {
  return (
    <div
      role="region"
      aria-label="Core technologies"
      className="relative z-20 flex rotate-[-0.7deg] scale-[1.01] overflow-hidden border-y-[3px] border-black bg-white py-4"
    >
      <div className="flex animate-marquee whitespace-nowrap font-disp text-[19px] font-bold uppercase motion-reduce:animate-none">
        <Half />
        <Half hidden />
      </div>
    </div>
  );
}
