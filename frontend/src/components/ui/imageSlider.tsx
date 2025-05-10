import React from "react";

interface Barber {
  avatar?: string;
  image?: string;
  name: string;
}

interface ImageSliderProps {
  barber: Barber;
  serviceType: "barber" | "pc" | "billiards";
}

const ImageSlider: React.FC<ImageSliderProps> = ({ barber, serviceType }) => {
  const image = barber.avatar || barber.image;
    const handleBooking = () => {
        console.log(`Booking for ${barber.name} in ${serviceType}`);
    };

  if (!barber || !image) {
    return <div>No image available</div>;
  }

  return (
    <div className="relative w-full">
      <h2 className="text-lg font-bold text-center">{barber.name}</h2>
      <img
        src={image}
        alt={barber.name}
        className="rounded w-full h-[120px] object-cover"
      />
      <button
        className="bg-blue-600 mt-2 text-white px-3 py-1 rounded text-sm w-full"
        onClick={handleBooking}
      >
        Vote
      </button>
    </div>
  );
};

export default ImageSlider;
