import { useRef, useState } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faExpand,
  faExpandAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../hooks/hooks";

const ImageViewer: React.FC<{isFixed: boolean}> = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderRef = useRef<Slider>(null);

  const themeState = useAppSelector((state) => {
    return state.theme;
  });

  const darkMode = themeState.darkMode;

  const settings = {
    dots: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (index: number) => setCurrentIndex(index),
  };

  const goToSlide = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  let images = [
    "https://media.glamour.com/photos/65512d4c24522f9dbd630bb5/4:3/w_2035,h_1526,c_limit/Lux-Makeup-Beauty-Awards.jpg",
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh-iugAQV5fmEY2kGWi7XPFpdrwRU99ackxP6KZNeHmP9uademLaY4YyIYcm8XnvaLT1OFjlGitmJXkoKp1uDAgL0c151kIoFEInsKcCcpDe8boiHWyiYnZFgF8AaXabrA2uIqwAM2Ka7Q/s640/HEADDER.jpg",
    "https://www.lizzieinlace.com/wp-content/uploads/2020/06/2-pink-beauty-products.jpg",
    "https://media.glamour.com/photos/65512d4c24522f9dbd630bb5/4:3/w_2035,h_1526,c_limit/Lux-Makeup-Beauty-Awards.jpg",
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh-iugAQV5fmEY2kGWi7XPFpdrwRU99ackxP6KZNeHmP9uademLaY4YyIYcm8XnvaLT1OFjlGitmJXkoKp1uDAgL0c151kIoFEInsKcCcpDe8boiHWyiYnZFgF8AaXabrA2uIqwAM2Ka7Q/s640/HEADDER.jpg",
    "https://www.lizzieinlace.com/wp-content/uploads/2020/06/2-pink-beauty-products.jpg",
    "https://media.glamour.com/photos/65512d4c24522f9dbd630bb5/4:3/w_2035,h_1526,c_limit/Lux-Makeup-Beauty-Awards.jpg",
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh-iugAQV5fmEY2kGWi7XPFpdrwRU99ackxP6KZNeHmP9uademLaY4YyIYcm8XnvaLT1OFjlGitmJXkoKp1uDAgL0c151kIoFEInsKcCcpDe8boiHWyiYnZFgF8AaXabrA2uIqwAM2Ka7Q/s640/HEADDER.jpg",
    "https://www.lizzieinlace.com/wp-content/uploads/2020/06/2-pink-beauty-products.jpg",
  ];

  return (
    <div className={`w-full flex flex-row ${
      props.isFixed ? "sticky top-44" : "static"
    }`}>
      <div
        style={{
          scrollbarWidth: "none",
        }}
        className="flex flex-col h-96 overflow-y-scroll w-1/5 gap-y-3 "
      >
        {images.map((image, index) => (
          <img
            key={index}
            className={`h-20 w-full cursor-pointer rounded-xl ${
              currentIndex === index
                ? darkMode
                  ? "border-2 border-solid border-white"
                  : "border-2 border-solid border-black"
                : ""
            }`}
            src={image}
            alt="pretty-click"
            onClick={() => goToSlide(index)} // Go to corresponding slide on click
          />
        ))}
      </div>
      <div className="w-4/5 h-72 relative">
        <Slider className="w-full" ref={sliderRef} {...settings}>
          {images.map((image, index) => (
            <img
              key={index}
              className="object-cover w-full h-72 rounded-xl"
              src={image}
              alt="pretty-click"
            />
          ))}
        </Slider>
        <div
          onClick={() => {
            if (currentIndex >= 0 && currentIndex < images.length) {
              window.open(images[currentIndex], "_blank");
            }
          }}
          className="absolute top-5 right-5 flex flex-row items-center justify-center rounded-full h-10 w-10 border border-solid border-black bg-purple-50 shadow-md shadow-black hover:cursor-pointer"
        >
          <FontAwesomeIcon className="text-black" icon={faExpand} />
        </div>
        <div
          onClick={() => goToSlide(currentIndex - 1)}
          className="absolute top-1/2 left-5 flex flex-row items-center justify-center rounded-full h-10 w-10 border border-solid border-black bg-purple-100 shadow-md shadow-black hover:cursor-pointer"
        >
          <FontAwesomeIcon className="text-black" icon={faChevronLeft} />
        </div>
        <div
          onClick={() => goToSlide(currentIndex + 1)}
          className="absolute top-1/2 right-5  flex flex-row items-center justify-center rounded-full h-10 w-10 border border-solid border-black bg-purple-100 shadow-md shadow-black hover:cursor-pointer"
        >
          <FontAwesomeIcon className="text-black" icon={faChevronRight} />
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
