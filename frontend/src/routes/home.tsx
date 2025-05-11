import { Timeline } from "../components/ui/works";
import { Footer } from "../components/ui/footer";
import { Hero } from "../components/ui/hero";

export default function Home() {
  return (
    <>
      <div className="w-screen bg-[#23252d]">
        <Hero />
        <div>
          <div className="">
            <Timeline />
          </div>

          {/* <div className="px-36">
            <Status />
          </div> */}

          {/* <h1 className="text-4xl text-gray-200 font-serif m-5 text-center">
            Бидний хийсэн ажилуудаас
          </h1>
          <div>
            <Impact />
          </div> */}

          <Footer />
        </div>
      </div>
    </>
  );
}
