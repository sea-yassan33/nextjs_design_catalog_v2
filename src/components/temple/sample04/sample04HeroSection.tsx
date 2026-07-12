import Image from "next/image";
const IMG = "/sample_img.svg";

export default function Sample04HeroSection() {
  return (
    <section className="relative w-full h-[520px] mt-14">
      <Image src={IMG} alt="hero" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 flex flex-col justify-end p-10 max-w-[1040px] mx-auto left-0 right-0">
        <p className="text-white/60 text-xs mb-3 tracking-widest uppercase">
          Shaping Tomorrow&apos;s Work Today
        </p>
        <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight">
          未来の働き方を、
          <br />
          今ここから。
        </h1>
      </div>
    </section>
  );
}
