import { Button, Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {

    const navigate = useNavigate();

    const handleRoute = () => {
        navigate('/aiList');
    }

  return (
    <div className=" bg-green-900 py-2">
      <div className="grid lg:grid-cols-2 px-8 ">
        <div className="text-white justify-center items-center flex">
          <div className="flex flex-col space-y-2 px-4 justify-center items-center lg:items-start">
            <div>
              <h2 className="text-3xl font-extrabold text-center lg:text-left">
                Never Run Out of Essential Items Again
              </h2>
              <span className="font-normal text-base hidden lg:block">
                AI-powered restocking that learns your habits and delivers what
                you need, right when you need it.
              </span>
            </div>

            <Button onClick={() => handleRoute()}  size="lg" className="bg-green-600 text-white rounded-full">
              Generate AI Market List
            </Button>
          </div>
        </div>
        <div className="p-2 hidden lg:block">
          <Image
            width="100%"
            height={200}
            src="https://www.instacart.com/assets/homepage/affordability-hero-3a7ab0e389e5f4f278b4715eec95775f1d7d969323d22277199898ce605c6f56.png"
            fallbackSrc="https://via.placeholder.com/300x200"
            alt="NextUI Image with fallback"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
