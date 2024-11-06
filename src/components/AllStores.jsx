import { Card, CardBody, Image } from "@nextui-org/react";
import { AiFillThunderbolt } from "react-icons/ai";

const AllStores = () => {
  // Store data array
  const stores = [
    {
      name: "Cocacola",
      time: "delivery by 11:30am",
      image:
        "https://www.top50brandsnigeria.com/wp-content/uploads/2023/08/Cocacola-200x200.jpg",
      comment: "$10 off EBT, lots of deal",
    },
    {
      name: "Dangote",
      time: "delivery By 11:45am",
      image:
        "https://www.top50brandsnigeria.com/wp-content/uploads/2023/08/Dangote-200x200.jpg",
      comment: "EBT, bulk pricing ",
    },
    {
      name: "Nestle",
      time: "delivery By 12:00pm",
      image:
        "https://www.top50brandsnigeria.com/wp-content/uploads/2023/08/Nestle-200x200.jpg",
      comment: "$15 off in-store prices EBT",
    },
    {
      name: "Chivita",
      time: "delivery By 12:15pm",
      image:
        "https://www.top50brandsnigeria.com/wp-content/uploads/2023/08/Chivita-200x200.jpg",
    },
    {
      name: "Unilever",
      time: "delivery By 12:30pm",
      image:
        "https://www.top50brandsnigeria.com/wp-content/uploads/2023/08/Unilever-200x200.jpg",
    },
    {
      name: "7up",
      time: "delivery By 1:00pm",
      image:
        "https://www.top50brandsnigeria.com/wp-content/uploads/2023/08/7up-200x200.jpg",
      comment: "$10 off EBT, lots of deal",
    },
    {
      name: "Rite Foods",
      time: "delivery By 1:15pm",
      image:
        "https://www.top50brandsnigeria.com/wp-content/uploads/2023/08/Rite-Foods-200x200.jpg",
      comment: "$30 off ",
    },
    {
      name: "Pz Cussons",
      time: "delivery By 1:30pm",
      image:
        "https://www.top50brandsnigeria.com/wp-content/uploads/2023/08/Pz-Cussons-200x200.jpg",
    },
    {
      name: "Cadbury",
      time: "delivery By 2:00pm",
      image:
        "https://www.top50brandsnigeria.com/wp-content/uploads/2023/08/Cadbury-200x200.jpg",
    },
  ];
    
     const chips = [
       { label: "All", active: true },
       { label: "EBT", active: false },
       { label: "Fastest", active: false },
       { label: "Offers", active: false },
       { label: "Low Prices", active: false },
       { label: "Grocery", active: false },
       { label: "Alcohol", active: false },
       { label: "Pickup", active: false },
       { label: "In store Prices", active: false },
       { label: "Convenience", active: false },
       { label: "Whole Sale", active: false },
       { label: "Retail", active: false },
     ];


  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-12 py-6">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-xl sm:text-2xl font-extrabold">
            All Stores in <span className="text-green-600">Abuja, Nigeria</span>
          </h3>
        </div>

        {/* Filter Chips */}
        <div className="w-full">
          <div className="flex gap-2 pb-2 overflow-x-auto no-scrollbar">
            {chips.map((chip, index) => (
              <button
                key={index}
                className={`px-4 sm:px-8 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-colors flex-shrink-0
                  ${
                    chip.active
                      ? "bg-black text-white hover:bg-gray-800"
                      : "bg-gray-200 text-black hover:bg-gray-300"
                  }`}>
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Store Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {stores.map((store, index) => (
            <Card
              key={index}
              className="hover:bg-gray-50 transition-colors cursor-pointer">
              <CardBody className="flex flex-row gap-4 p-4">
                <div className="flex-shrink-0">
                  <Image
                    className="ring-1 ring-gray-200 rounded-lg w-20 h-20 sm:w-24 sm:h-24 object-cover"
                    src={store.image}
                    alt={store.name}
                  />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                    {store.name}
                  </p>
                  <span className="text-sm sm:text-base text-green-600 flex items-center gap-1">
                    <AiFillThunderbolt className="flex-shrink-0" />
                    <span className="truncate">{store.time}</span>
                  </span>
                  {store.comment && (
                    <span className="text-sm sm:text-base bg-yellow-400 px-2 py-0.5 rounded mt-1 truncate">
                      {store.comment}
                    </span>
                  )}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Show More Button */}
        <button className="text-center text-base text-green-600 hover:text-green-700 transition-colors">
          Show More
        </button>
      </div>
    </div>
  );
};

export default AllStores;