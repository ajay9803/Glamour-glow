import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselProductItem from "./carousel_product_item";

const NewSection: React.FC = () => {
  const products = [1, 2, 3];

  const sliderRef = useRef<Slider>(null);

  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "15%",
    arrows: false,
  };

  const goToPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row justify-between items-center">
        <p className="font-bold tracking-wider text-3xl"> New </p>
        <div className="flex flex-row items-center gap-x-5">
          <div
            onClick={goToPrev}
            className="flex flex-row items-center justify-center rounded-full h-10 w-10 border border-solid border-black bg-purple-100 shadow-md shadow-black hover:cursor-pointer"
          >
            <FontAwesomeIcon
              className="text-black"
              icon={faChevronLeft}
            ></FontAwesomeIcon>
          </div>
          <div
            onClick={goToNext}
            className="flex flex-row items-center justify-center rounded-full h-10 w-10 border border-solid border-black bg-purple-100 shadow-md shadow-black hover:cursor-pointer"
          >
            <FontAwesomeIcon
              className="text-black"
              icon={faChevronRight}
            ></FontAwesomeIcon>
          </div>
        </div>
      </div>
      <Slider ref={sliderRef} {...settings}>
        {products.map((expertise, index) => (
          <CarouselProductItem index={index}></CarouselProductItem>
        ))}
      </Slider>
    </div>
  );
};

export default NewSection;
