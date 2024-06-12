import { FaRegStar } from "react-icons/fa";
import PropTypes from "prop-types";

const SeeProCard = ({ aData }) => {
  return (
    <div className="card w-96 shadow-2xl mt-6 bg-green-300">
      <div className="card-body">
        <div className="mx-auto">
          <img src={aData?.image} className="w-28 h-28 rounded-full" alt="" />
        </div>
        <h2 className="text-lg font-semibold text-center">
          Name : {aData?.name}
        </h2>
        <div className="flex items-center gap-3 max-w-24 mx-auto">
          <p>Rating : {aData?.rating} </p>
          <p>
            <FaRegStar className="text-orange-400" />
          </p>
        </div>
        <p className="text-center">Feedback : {aData?.description}</p>
      </div>
    </div>
  );
};

SeeProCard.propTypes = {
    aData: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      rating: PropTypes.number,
      description: PropTypes.string,
    }).isRequired,
  };

export default SeeProCard;
