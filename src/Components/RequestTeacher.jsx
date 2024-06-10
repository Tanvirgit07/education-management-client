import { Link } from "react-router-dom";

const RequestTeacher = () => {
  return (
    <div className="bg-base-200 mt-10">
      <div className="lg:flex justify-between gap-24 p-10">
        <div className="w-2/3">
          <img
            src="https://i.ibb.co/xzS473h/teacher.png"
            className="rounded-lg shadow-2xl"
          />
        </div>
        <div className="space-y-6 mt-4">
          <h1 className="text-5xl font-bold">Become an instructor !</h1>
          <p className="">
            Instructors from around the world teach millions of learners on
            Udemy. We provide the tools and skills to teach what you love.
          </p>
          <Link to="/teach-eduCare">
            <button className="btn btn-wide btn-neutral">
              Start teaching today
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RequestTeacher;
