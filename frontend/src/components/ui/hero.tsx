// import { Button } from "./button";
import road from "/img/road.jpg";

const Hero = () => {
  return (
    <section
      style={{ backgroundImage: `url(${road})` }}
      className="dark relative flex h-svh max-h-[1400px] w-svw overflow-hidden bg-cover bg-center bg-no-repeat font-sans after:absolute after:top-0 after:left-0 after:z-10 after:h-full after:w-full after:bg-black/20 after:content-[''] md:h-svh"
    >
      <div className="relative z-30 m-auto flex max-w-[46.25rem] flex-col items-center justify-center gap-6 px-5">
        <h1 className="text-center font-serif text-4xl leading-tight text-foreground md:text-6xl xl:text-[4.4rem]">
          Байгаль орчноо хамтдаа хамгаалцгаая
        </h1>
        <p className="text-center text-base text-foreground">
          Зам эвдрэл, гол бохирдол зэрэг асуудлыг мэдээлж, олон нийтийн
          дэмжлэгээр шийдэлд хүргэхэд оролцоорой.
        </p>
      </div>
      <div className="pointer-events-none absolute inset-0 z-20 h-full w-full bg-[url(/images/block/noise.png)] bg-repeat opacity-15" />
    </section>
  );
};

export { Hero };
