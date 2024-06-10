const SeeDetailsBanner = () => {
    return (
        <div
      className="hero h-[20vh] mb-10 rounded-lg"
      style={{
        backgroundImage:
          "url(https://i.ibb.co/s5GKMYh/universe-1566161-1280.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60 rounded-xl"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="">
          <h1 className="mb-5 text-3xl font-bold">
          Class assignment Section !
          </h1>
        </div>
      </div>
    </div>
    );
};

export default SeeDetailsBanner;