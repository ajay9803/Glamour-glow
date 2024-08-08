import React, { useEffect, useRef} from "react";
import { useAppSelector } from "../../hooks/hooks";
import "../../styles/diagonal-transition.css";
import "../../styles/home.css";
import NewSection from "./new_section";
import EndOfYearSection from "./end_of_year_section";
import { useNavigate } from "react-router-dom";
import "../../styles/animated_button.css";

const Home = () => {
  const scrollRef = useRef(0);
  const themeState = useAppSelector((state) => {
    return state.theme;
  });

  const darkMode = themeState.darkMode;

  useEffect(() => {
    document.title = 'Elegant Essentials';
    window.scrollTo(0, scrollRef.current);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "heading-text-1-active",
              "heading-text-2-active",
              "header-image-first-active",
              "header-image-second-active",
              "header-image-third-active",
              "header-data-active"
            );
          } else {
          }
        });
      },
      { threshold: 0.5, root: null }
    );
    const hiddenElements = document.querySelectorAll(
      ".heading-text-1, .heading-text-2, .header-image-first, .header-image-second, .header-image-third, .header-data"
    );
    hiddenElements.forEach((el) => observer.observe(el));
  }, []);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <div className="flex  w-full gap-x-10 flex-col gap-y-10 md:flex-row py-12">
        <div className="flex-col  w-full md:w-2/5 lg:w-2/5 flex gap-y-6">
          <p className="text-5xl font-semibold tracking-wider leading-snug">
            Elegant Essentials
          </p>
          <div
            onClick={() => {
              navigate("/products/Skincare");
            }}
            className="relative w-full"
          >
            <button
              className={`w-full rounded-xl bg-gray-300 text-gray-300 px-5 py-3 font-semibold tracking-wider transition-all ease-in-out `}
            >
              {" "}
              SHOP NOW
            </button>
            <button
              className={`button diagonal-translate w-full absolute rounded-xl -top-2 -left-2 font-semibold tracking-wider  ${
                darkMode ? "bg-purple-700" : "bg-black"
              } text-white px-5 py-3 transition-all ease-in-out rounded-sm`}
            >
              {" "}
              <p className="button-content"> SHOP NOW</p>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-x-2">
          <img
            className="header-image-first flex h-96 object-cover rounded-2xl"
            src="https://6.soompi.io/wp-content/uploads/image/c5ecb3670e48406eaa5345536444a444/dummy.jpeg?s=900x600&e=t"
            alt="pretty-click"
          />
          <img
            className=" header-image-second flex h-96 object-cover rounded-2xl"
            src="https://upload.wikimedia.org/wikipedia/commons/5/54/ELLE_TAIWAN_Seo_Yea-ji_2020.jpg"
            alt="pretty-click"
          />
          <img
            className="header-image-third flex h-96 object-cover rounded-2xl"
            src="https://koreajoongangdaily.joins.com/data/photo/2023/10/09/b37d6ba6-a639-4674-8594-f8e96bc0587e.jpg"
            alt="pretty-click"
          />
        </div>
      </div>
      <NewSection></NewSection>
      <EndOfYearSection></EndOfYearSection>
    </div>
  );
};

export default Home;
