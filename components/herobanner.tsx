import React from "react";

type HeroBannerProps = {
  backgroundImage?: string;
  title?: string;
  description?: string;
  primaryButtonText?: string;
  onPrimaryClick?: () => void;
};

const HeroBanner: React.FC<HeroBannerProps> = ({
  backgroundImage = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&h=600&fit=crop&q=80",
  title = "Discover Your Style",
  description = "Explore our curated collection of the latest trends in women's fashion",
  primaryButtonText = "Shop Now",
  onPrimaryClick = () => console.log("Shop Now clicked"),
}) => {
  return (
    <div className="relative bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl overflow-hidden mb-12">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Content */}
      <div className="relative px-8 py-16 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {title}
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onPrimaryClick}
            className="bg-white text-pink-600 hover:bg-gray-100 font-bold px-8 py-3 text-lg rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            {primaryButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};
export default HeroBanner;