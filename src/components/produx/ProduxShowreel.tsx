export default function ProduxShowreel() {
  return (
    <div className="show-layer absolute inset-0 grid place-items-center z-[35] opacity-0 pointer-events-none" id="showLayer">
      <div className="show-frame relative w-[69.4vw] max-w-[1200px] aspect-[1.784/1] rounded-[14px] overflow-hidden bg-black will-change-[width,height,border-radius]" id="showFrame">
        <video 
          id="showVideo" 
          src="/produx/www.produx.design/videos/Hero.mp4" 
          preload="none" 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover block"
        ></video>
      </div>
    </div>
  );
}
