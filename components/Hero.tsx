import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative h-screen min-h-150 flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt="Hotel Room"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
          Experience Luxury
          <br />
          <span className="text-primary-400">Like Never Before</span>
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Discover a world of comfort and elegance. Your perfect escape awaits
          with breathtaking views and unparalleled hospitality.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/rooms"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 text-white font-semibold rounded-lg shadow-lg hover:bg-primary-600 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            BOOK NOW
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300"
          >
            CONTACT US
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
