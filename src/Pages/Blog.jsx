const Blog = () => {
  return (
    <div>
      <div
        className="hero lg:h-[20vh] mb-10 rounded-xl my-10 w-11/12 lg:w-full mx-auto"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/nLxt14T/banner-6617550-1280.png)",
        }}
      >
        {/* <div className="hero-overlay h-[30vh] bg-opacity-60 rounded-xl"></div> */}
        <div className="hero-content text-center text-neutral-content">
          <div className="">
            <h1 className="mb-5 lg:text-3xl font-bold">
            how a student can finish an online freelancing course productively 
            </h1>
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto lg:w-3/4">
        <div>
          <p>
            <span className="font-bold text-lg">
            Set Clear Goals:
            </span>
            <br />
            Define what you want to achieve by the end of the course. Break down these goals into smaller, manageable tasks.
          </p>
        </div>
        <div className="mt-5">
          <p>
            <span className="font-bold text-lg">Create a Study Schedule:</span>
            <br />
            Allocate specific times each day or week dedicated to studying and stick to this schedule. Consistency is key.
          </p>
        </div>
        <div className="mt-5">
          <p>
            <span className="font-bold text-lg">
            Stay Organized:
            </span>
            <br />
            Keep all your course materials, notes, and assignments well-organized. Use digital tools or a physical planner to track your progress..
          </p>
        </div>
        <div className="mt-5">
          <p>
            <span className="font-bold text-lg">
            Active Learning:
            </span>
            <br />
            Engage actively with the material. This includes taking notes, coding along with the examples, and completing all assignments and exercises.
          </p>
        </div>
        <div className="mt-5">
          <p>
            <span className="font-bold text-lg">
            Practice Regularly: 
            </span>
            <br />
            Apply what you learn by working on small projects or coding challenges related to the course content. Practical application helps reinforce learning.
          </p>
        </div>
        <div className="mt-5">
          <p>
            <span className="font-bold text-lg">
            Join a Community: 
            </span>
            <br />
            Participate in online forums, study groups, or communities related to your course. Discussing with peers can provide support, motivation, and additional insights.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
