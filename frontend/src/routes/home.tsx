import HowItWorks from "../components/ui/works";
import Impact from "../components/ui/recent";
import { Footer } from "../components/ui/footer";
const UB_IMG =
  "https://media.istockphoto.com/id/1651845205/photo/drone-photo-of-ulaanbaatar-skyline-mongolia.jpg?s=1024x1024&w=is&k=20&c=18iILf7a07N8zIkt8Q9Pn8w-gDGtH3iti-zxp1h3Pw8=";

export default function Home() {
  return (
    <>
      <div className="w-screen bg-[#23252d]">
        <img src={UB_IMG} className="w-full object-cover p-10"></img>
        <div>
          <h1 className="text-4xl text-gray-200 font-serif m-5 text-center">
            Үндсэн ажиллагаа
          </h1>
          <HowItWorks />
          <h1 className="text-4xl text-gray-200 font-serif m-5 text-center">
            Бидний хийсэн ажилуудаас
          </h1>
          <Impact />
          <Footer />
        </div>
      </div>
    </>
  );
}
