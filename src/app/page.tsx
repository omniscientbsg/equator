import SmoothScrollProvider from "@/components/scroll/SmoothScrollProvider";
import ProduxSequence from "@/components/produx/ProduxSequence";
import ProduxSections from "@/components/produx/ProduxSections";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <main className="bg-[#0d1117] text-[#E8EDF5] font-sans selection:bg-white/20">
        <ProduxSequence />
        <ProduxSections />
      </main>
    </SmoothScrollProvider>
  );
}
