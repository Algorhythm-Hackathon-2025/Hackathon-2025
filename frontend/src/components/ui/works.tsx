import { Button } from "./button";
import img1 from "/img/img1.jpg";
import img2 from "/img/img2.jpg";
import img3 from "/img/img3.jpg";
import img4 from "/img/img4.jpg";

interface Feature {
  image: string;
  title: string;
  description: string;
}

interface TimelineProps {
  heading?: string;
  description?: string;
  buttons?: {
    primary: {
      text: string;
      url: string;
    };
    secondary: {
      text: string;
      url: string;
    };
  };
  features?: Feature[];
}

const Timeline = ({
  heading = "Бидний үйл ажиллагаа",
  description = "Манай апп нь байгаль орчны асуудлыг иргэдээр илрүүлж, олон нийтийн оролцоогоор шийдэлд хүргэдэг.",
  buttons = {
    primary: {
      text: "Тайлан илгээх",
      url: "/report",
    },
    secondary: {
      text: "Дэмжсэн тайлангууд",
      url: "/popular",
    },
  },
  features = [
    {
      image: img1,
      title: "Асуудал илгээх",
      description:
        "Хэрэглэгч зам эвдрэл, голын бохирдол зэрэг асуудлыг зураг, тайлбартайгаар илгээнэ.",
    },
    {
      image: img2,
      title: "Хүмүүсийн дэмжлэг",
      description:
        "Бусад хэрэглэгчид асуудлыг үнэлж, лайк дарснаар чухал асуудлууд тодорно.",
    },
    {
      image: img3,
      title: "Байгууллагад хүрэх",
      description:
        "Олон дэмжлэг авсан асуудал холбогдох байгууллагад автоматаар хүргэгдэнэ.",
    },
    {
      image: img4,
      title: "Шийдвэрлэлтийн явц",
      description:
        "Байгууллага хариу өгч, шийдвэрлэлт эхэлсэн эсэхийг хэрэглэгчид хянаж чадна.",
    },
  ],
}: TimelineProps) => {
  return (
    <section className="py-20 pl-48">
      <div className="container max-w-6xl items-center-">
        <div className="relative grid gap-16 md:grid-cols-2">
          <div className="top-40 h-fit md:sticky ">
            <h2 className="mt-4 mb-6 text-4xl font-semibold md:text-5xl">
              {heading}
            </h2>
            <p className="font-medium text-muted-foreground md:text-xl">
              {description}
            </p>
            <div className="mt-8 flex flex-col gap-4 lg:flex-row">
              <Button className="gap-2" size="lg" asChild>
                <a href={buttons.primary.url}>{buttons.primary.text}</a>
              </Button>
              <Button variant="outline" size="lg" className="gap-2" asChild>
                <a href={buttons.secondary.url}>{buttons.secondary.text}</a>
              </Button>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-12 md:gap-20">
            {features.map((feature, index) => (
              <div key={index} className="rounded-xl border p-2">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="aspect-video w-full rounded-xl border border-dashed object-cover"
                />
                <div className="p-6">
                  <h3 className="mb-1 text-2xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Timeline };
