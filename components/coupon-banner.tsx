import React from "react";

type TickerProps = {
  messages?: string[];
  speed?: number;
  backgroundColor?: string;
  textColor?: string;
};

const CouponBanner: React.FC<TickerProps> = ({
  messages = [
    "🎉 Diwali Sale: 50-80% OFF",
    "✨ Free Shipping on Orders Above ₹999",
    "🎊 Use Code: FIRST10 for Extra Discount",
    "🛍️ Limited Time Offer - Shop Now!",
  ],
  speed = 30,
  backgroundColor ,
  textColor = "#ffffff",
}) => {
  const repeatedMessages = [...messages, ...messages, ...messages];

  return (
    <div
      className="w-full overflow-hidden py-2 mb-1"
      style={{ backgroundColor }}
    >
      <div className="relative flex">
        <div
          className="flex whitespace-nowrap animate-scroll"
          style={{
            animation: `scroll ${speed}s linear infinite`,
          }}
        >
          {repeatedMessages.map((message, index) => (
            <span
              key={index}
              className="inline-flex items-center px-8 text-sm font-semibold"
              style={{ color: textColor }}
            >
              {message}
              
            </span>
          ))}
        </div>
        <div
          className="flex whitespace-nowrap animate-scroll absolute top-0"
          style={{
            animation: `scroll ${speed}s linear infinite`,
            animationDelay: `-${speed / 2}s`,
          }}
        >
      
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </div>
  );
};


export default CouponBanner;