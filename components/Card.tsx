import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { BsPeople } from "react-icons/bs";

interface CardProps {
  image?: string;
  name: string;
  price: number;
  adults: number;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  image = "/hero.jpg",
  name,
  price,
  adults,
  className,
}) => {
  return (
    <div
      className={clsx(
        "group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1",
        className
      )}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-primary-400 text-white text-xs font-bold px-3 py-1 rounded-full">
          Rp {price}/night
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="flex items-center gap-2 text-gray-500 text-sm mb-4">
          <BsPeople size={16} className="text-primary-500" /> {adults} {adults === 1 ? "People" : "Peoples"}
        </p>

        <button className="w-full py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors duration-200 cursor-pointer">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Card;
