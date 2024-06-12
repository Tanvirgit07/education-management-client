// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import "./Feedback.css";

// import required modules
import { EffectCards } from "swiper/modules";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaRegStar } from "react-icons/fa";
const Feedback = () => {
  const axiosSecure = useAxiosSecure();
  const { data: feedbackData = [] } = useQuery({
    queryKey: ["feedback-data"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/feedback-data`);
      return data;
    },
  });

  console.log(feedbackData);
  //   if (isLoading) {
  //     return <span className="loading loading-spinner text-secondary"></span>;
  //   }

  return (
    <div>
      <h1 className="text-5xl font-bold text-center text-green-400 mt-8 mb-10">
        FeedBack for a student !
      </h1>
      <div>
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper"
        >
          {
            feedbackData.map(feedData => <SwiperSlide key={feedData?._id}>
                <div>
                    <div className="">
                        <img src={feedData?.image} alt="" />
                    </div>
                    <p>{feedData?.name}</p>
                    <div className="flex items-center gap-3">
                    <p>Rating : {feedData?.rating} </p>
                    <p><FaRegStar className="text-orange-400" /></p>
                    </div>
                    
                    <p>Feedback : {feedData?.description}</p>
                </div>
                </SwiperSlide>)
          }
          {/* <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}
        </Swiper>
      </div>
    </div>
  );
};

export default Feedback;
