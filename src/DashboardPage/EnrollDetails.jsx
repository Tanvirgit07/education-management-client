import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const EnrollDetails = ({ data }) => {
  console.log(data?.classId)
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="">
        <img src={data?.photo} alt="Shoes" />
      </figure>
      <div className="p-4">
        <h2 className="card-title">Posted : {data?.name}</h2>
        <h2 className="card-title">Title : {data?.title.slice(0, 20)}...</h2>
        <Link to={`/enroll-details/${data?.classId}`} className="card-actions">
          <button className="btn btn-outline btn-accent w-full mt-4">
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
};

EnrollDetails.propTypes = {
  data: PropTypes.shape({
    photo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    classId: PropTypes.string.isRequired,
  }).isRequired,
};

export default EnrollDetails;
