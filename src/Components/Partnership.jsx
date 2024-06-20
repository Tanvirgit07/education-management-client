import icon1 from "../assets/Images/1.png";
import icon2 from "../assets/Images/2.png";
import icon3 from "../assets/Images/3.png";
import icon4 from "../assets/Images/4.png";
import icon5 from "../assets/Images/5.jpg";
import icon6 from "../assets/Images/6.png";
import icon7 from "../assets/Images/7.png";
import icon8 from "../assets/Images/8.png";
const Partnership = () => {
  return (
    <div>
      <div className="text-center mt-5">
        <h1>Trusted by over 15,000 companies and millions of learners around the world</h1>
      </div>
      <div className="grid grid-cols-1 mx-auto lg:max-w-full max-w-44 lg:grid-cols-8 mt-5 mb-6">
        <div className="w-32 h-40">
          <img src={icon1} alt="" />
        </div>
        <div className="w-32 h-32">
          <img src={icon2} alt="" />
        </div>
        <div className="w-32 h-32">
          <img src={icon3} alt="" />
        </div>
        <div className="w-32 h-32">
          <img src={icon4} alt="" />
        </div>
        <div className="w-32 h-32">
          <img src={icon5} alt="" />
        </div>
        <div className="w-32 h-32">
          <img src={icon6} alt="" />
        </div>
        <div className="w-32 h-32">
          <img src={icon7} alt="" />
        </div>
        <div className="w-32 h-32">
          <img src={icon8} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Partnership;
