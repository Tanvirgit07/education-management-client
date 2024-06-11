import { useQuery } from "@tanstack/react-query";
import Carousel from "../Components/Carousel";
import Partnership from "../Components/Partnership";
import RequestTeacher from "../Components/RequestTeacher";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import BestCard from "../Components/BestCard";
import HighEnroll from "../Components/HighEnroll";
// import MySlider from "../Components/MySlider";

const Home = () => {
  const axiosSecure = useAxiosSecure();
  const { data: bestCourseData = [], isLoading } = useQuery({
    queryKey: ["best-course"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/best-course`);
      return data.filter((data) => data.total_enrolment > 4);
    },
  });

  console.log(bestCourseData);
  if (isLoading) {
    return <span className="loading loading-spinner text-secondary"></span>;
  }
  return (
    <div>
      <div>
        <Carousel></Carousel>
      </div>
      <div>
        <Partnership></Partnership>
      </div>
      <div className="">
        <HighEnroll></HighEnroll>
      </div>
      <div>
        
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7">
        {bestCourseData.map((data) => (
          <BestCard key={data?._id} data={data}></BestCard>
        ))}
      </div>
      <div>
        <RequestTeacher></RequestTeacher>
      </div>
    </div>
  );
};

export default Home;
