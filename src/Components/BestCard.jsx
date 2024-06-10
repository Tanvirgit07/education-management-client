import PropTypes from "prop-types";
const BestCard = ({ data }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="relative h-52">
        <img src={data?.photo} alt="Shoes" />
        <div className="absolute bottom-4 right-4 text-white font-bold text-2xl">
          <p>
            Enrolled
            <span className="text-red-500">({data?.total_enrolment})</span>
          </p>
        </div>
      </figure>
      <div className="p-5">
        <h2 className="card-title font-bold text-red-400 mb-3">
          {data?.title}
        </h2>
        <p className="font-bold text-lg">
          Description :{" "}
          <span className="text-sm text-gray-400">
            {data?.description.slice(0, 200)}....
          </span>
        </p>
      </div>
    </div>
  );
};

BestCard.propTypes = {
  data: PropTypes.shape({
    photo: PropTypes.string,
    total_enrolment: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default BestCard;
