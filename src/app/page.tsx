import CustomCursor from "@/components/CustomCursor";
import Mascot from "@/components/Mascot";
import SmoothScroll from "@/components/SmoothScroll";
import Topbar from "@/components/Topbar";
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Marquee from "@/components/sections/Marquee";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[10000] -translate-y-24 rounded-md bg-accent px-4 py-2 font-disp text-sm font-bold text-black focus:translate-y-0"
      >
        Skip to content
      </a>
      <SmoothScroll />
      <CustomCursor />
      <Mascot />
      <Topbar />
      <main id="main">
        <Hero />
        <Marquee />
        <Experience />
        <Projects />
      </main>
    </>
  );
}
