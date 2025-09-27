"use client";
import Slider from "react-slick";

// slick settings
const settings = {
  autoplay: false,
  autoplaySpeed: 10000,
  dots: true,
  fade: true,
  arrows: false,
  responsive: [
    { breakpoint: 1200, settings: { slidesToShow: 1 } },
    { breakpoint: 992, settings: { slidesToShow: 1 } },
    { breakpoint: 768, settings: { slidesToShow: 1 } },
    { breakpoint: 576, settings: { slidesToShow: 1 } },
  ],
};

// prop types
type IProps = {
  banners?: any[];
};

const HeroSliderOne = ({ banners = [] }: IProps) => {
  return (
    <section className="slider__area w-full relative">
      <Slider {...settings}>
        {banners.map((slider, index) => (
          <div
            key={index}
            className="w-full flex justify-center items-center"
            style={{ minHeight: "400px" }}
          >
            <img
              src={slider?.image}
              alt={`banner-${index}`}
              style={{
                width: "100%",
                height: "auto", // aspect ratio maintain
                objectFit: "contain", // crop না হবে, পুরো image দেখা যাবে
                maxHeight: "100vh",
              }}
            />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HeroSliderOne;
