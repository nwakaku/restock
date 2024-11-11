import { useRef } from "react";
import { Image } from "@nextui-org/react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

const Stores = () => {
  const scrollContainerRef = useRef(null);

  const stores = [
    {
      name: "Dangote",
      time: "By 11:22am",
      image:
        "https://www.top50brandsnigeria.com/wp-content/uploads/2023/08/Dangote-200x200.jpg",
    },
    {
      name: "Nestle",
      time: "By 11:45am",
      image:
        "https://1000logos.net/wp-content/uploads/2017/03/Nestle-Logo-768x432.png",
    },
    {
      name: "Chivita",
      time: "By 12:00pm",
      image:
        "https://res.cloudinary.com/dgbreoalg/image/upload/v1731344408/dangote_s8las6.svg",
    },
    {
      name: "Cadbury",
      time: "By 12:15pm",
      image:
        "https://1000logos.net/wp-content/uploads/2020/09/Cadbury-Logo-2003.jpg",
    },
    {
      name: "Cocacola",
      time: "By 12:30pm",
      image:
        "https://1000logos.net/wp-content/uploads/2016/11/Shape-Coca-Cola-Logo.jpg",
    },
    {
      name: "Unilever",
      time: "By 1:00pm",
      image:
        "https://1000logos.net/wp-content/uploads/2017/06/Unilever-logo-1024x645.jpg",
    },
    {
      name: "Pepsi",
      time: "By 1:15pm",
      image:
        "https://1000logos.net/wp-content/uploads/2017/05/Pepsi-logo-768x432.png",
    },
    {
      name: "ShopRite",
      time: "By 1:30pm",
      image:
        "https://1000logos.net/wp-content/uploads/2024/02/ShopRite-Logo-768x432.jpg",
    },
    {
      name: "Nigerian B",
      time: "By 2:00pm",
      image:
        "https://www.top50brandsnigeria.com/wp-content/uploads/2023/08/Nigerian-Breweries-200x200.jpg",
    },
  ];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-12 py-8 ">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl sm:text-2xl font-extrabold">
          Stores to help you save
        </h3>
        <div className="flex gap-2 sm:gap-4">
          <button
            onClick={() => scroll("left")}
            className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors duration-200">
            <FaArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors duration-200">
            <FaArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="relative overflow-x-auto scroll-smooth no-scrollbar">
        <div className="inline-flex gap-4 pb-4">
          {stores.map((store, index) => (
            <div
              key={index}
              className="flex flex-col items-center flex-shrink-0 w-36 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <div className="flex-shrink-0 mb-4">
                <Image
                  className="ring-1 ring-gray-200 rounded-lg w-20 h-20 sm:w-24 sm:h-24 object-cover"
                  src={store.image}
                  alt={store.name}
                />
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <p className="font-semibold text-gray-900 text-sm sm:text-base">
                  {store.name}
                </p>
                <span className="text-xs sm:text-sm font-light text-gray-600">
                  {store.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-right text-xs sm:text-sm font-light text-gray-600 mt-4">
        Offers subject to terms and eligibility
      </p>
    </div>
  );
};

export default Stores;
