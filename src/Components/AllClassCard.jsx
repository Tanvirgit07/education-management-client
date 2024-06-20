import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const AllClassCard = ({ data }) => {
  return (
    <div className="card card-compact lg:w-96 lg:h-[450px]  bg-base-100 shadow-2xl">
      <figure className="h-60">
        <img className="hover:scale-110" src={data?.photo} alt="Shoes" />
      </figure>
      <div className="px-5 py-3">
        <h2 className="text-xl font-bold text-green-500">
          Title : <span className="text-lg text-red-400">{data.title.slice(0, 20)}</span>
          .....
        </h2>
        <p className="text-xl font-bold">
          Post : <span className="text-lg text-red-400">{data.name}</span>{" "}
        </p>
        <div className="divider divider-secondary">Necessary info</div>
        <div className="flex justify-between">
          <h1 className="text-lg font-bold">
            Total enrolment :{" "}
            <span className="text-lime-600">{data?.total_enrolment}</span>
          </h1>
          <h1 className="text-lg font-bold">
            Price : <span className="text-red-500">{data?.price}$</span>
          </h1>
        </div>
        <p className="text-lg font-bold mt-2">
          Description :{" "}
          <span className="text-base font-normal text-gray-400">
            {data?.description.slice(0, 60)}.....
          </span>
        </p>
        <Link to={`/card-details/${data?._id}`} className="">
          <button className="btn btn-outline btn-warning w-full mt-3">
            Enroll
          </button>
        </Link>
      </div>
    </div>
  );
};

AllClassCard.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    total_enrolment: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default AllClassCard;
