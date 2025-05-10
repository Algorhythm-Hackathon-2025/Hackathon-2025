"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Card, CardContent } from "./card";

const impactData = [
  {
    user: "Anu from Ulaanbaatar",
    story:
      "Reported a broken bridge. It was repaired in 2 weeks after gaining 500+ likes!",
  },
  {
    user: "Bat from Erdenet",
    story:
      "His pollution report led to a factory cleanup thanks to community support.",
  },
  {
    user: "Saraa from Darkhan",
    story:
      "Her flooded road report was highlighted and fixed by the city council.",
  },
];

export default function UserImpactCarousel() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
      spacing: 1,
    },
  });

  return (
    <section className="py-10 bg-[#23252d]">
      <div>
        <p className="text-gray-500 text-center mb-6">
          See how reports led to real change
        </p>
      </div>
      <div ref={sliderRef} className="keen-slider max-w-3xl mx-auto">
        {impactData.map((item, index) => (
          <Card key={index} className="keen-slider__slide p-6 shadow-md">
            <CardContent className="flex flex-col items-center space-y-4">
              <h3 className="text-xl font-semibold">{item.user}</h3>
              <p className="text-gray-200 text-center">{item.story}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
