import { useQuery } from "@tanstack/react-query";
import Carousel from "../Components/Carousel";
import Partnership from "../Components/Partnership";
import RequestTeacher from "../Components/RequestTeacher";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import BestCard from "../Components/BestCard";
import HighEnroll from "../Components/HighEnroll";
import Feedback from "../Components/Feedback";
import Blog from "./Blog";
import Footer from "../Components/Footer";
// import MySlider from "../Components/MySlider";

const Home = () => {
  const axiosSecure = useAxiosSecure();
  const { data: bestCourseData = [], isLoading } = useQuery({
    queryKey: ["best-course"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/best-course`);
      return data.filter((data) => data.total_enrolment > 1);
    },
  });

  console.log(bestCourseData);
  const { data: totalHome = [] } = useQuery({
    queryKey: ["home-stats"],
    queryFn: async () => {
      const { data } = await axiosSecure("/home-stats");
      return data;
    },
  });

  console.log(totalHome);
  if (isLoading) {
    return <span className="loading loading-spinner text-secondary"></span>;
  }
  return (
    <div>
      <div><Carousel></Carousel></div>
      <div>
        <Partnership></Partnership>
      </div>
      <div className="">
        <HighEnroll></HighEnroll>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7">
        {bestCourseData.map((data) => (
          <BestCard key={data?._id} data={data}></BestCard>
        ))}
      </div>
      <div>
        <Feedback></Feedback>
      </div>
      <div>
        <h1 className="text-5xl font-bold text-orange-500 text-center mt-10 mb-6">
          Web site info
        </h1>
        {/* <div className="max-w-xl mx-auto">
          <div className="stats shadow-2xl">
            <div className="stat place-items-center">
              <div className="stat-title">Total Users</div>
              <div className="stat-value">{totalHome?.user} user</div>
              <div className="stat-desc">All the user</div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">Total classes</div>
              <div className="stat-value text-secondary">{totalHome?.classes} class</div>
              <div className="stat-desc text-secondary">Teacher published class</div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">Total enrollment</div>
              <div className="stat-value">{totalHome?.enroll} enroll</div>
              <div className="stat-desc">There are enrolled class</div>
            </div>
          </div>
        </div> */}

        <div className="">
          <div className="stats stats-vertical lg:stats-horizontal w-full shadow-2xl bg-gray-300 ">
            <div className="stat">
              <div className="stat-title">Total Users</div>
              <div className="stat-value text-secondary">{totalHome?.user} user</div>
              <div className="stat-desc">All the user</div>
            </div>

            <div className="stat">
              <div className="stat-title">Total classes</div>
              <div className="stat-value text-primary">{totalHome?.classes} class</div>
              <div className="stat-desc">Teacher published class</div>
            </div>

            <div className="stat">
              <div className="stat-title">Total enrollment</div>
              <div className="stat-value text-success">{totalHome?.enroll} enroll</div>
              <div className="stat-desc">There are enrolled class</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <RequestTeacher></RequestTeacher>
      </div>
      <div>
        <Blog></Blog>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Home;
