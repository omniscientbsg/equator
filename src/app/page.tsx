import SmoothScrollProvider from "@/components/scroll/SmoothScrollProvider";
import ProduxSequence from "@/components/produx/ProduxSequence";
import ProduxSections from "@/components/produx/ProduxSections";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <main className="bg-[#0b0b0c] text-[#f2f2f2] font-sans selection:bg-white/20">
        <ProduxSequence />
        <ProduxSections />
      </main>
    </SmoothScrollProvider>
  );
}
