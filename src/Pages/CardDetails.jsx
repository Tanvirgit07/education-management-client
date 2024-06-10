import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { useState } from "react";
import PayNowModal from "../Components/Modal/PayNowModal";
import useRole from "../Hooks/useRole";

const CardDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [role] = useRole()
  const {
    data: classData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["single-class"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/single-class/${id}`);
      return data;
    },
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  if (isLoading) {
    return <span className="loading loading-spinner text-secondary"></span>;
  }
  console.log(classData);
  return (
    <div className="card card-compact max-w-3xl mx-auto bg-base-100 shadow-xl my-10">
      <figure className="h-80">
        <img className="w-full" src={classData?.photo} alt="Shoes" />
      </figure>
      <div className="pt-10 pb-6 px-8">
        <div className="">
          <div className="flex gap-2">
            <img
              className="w-12 h-12 rounded-full"
              src={classData?.photo}
              alt=""
            />
            <div>
              <p className="font-semibold">{classData?.name}</p>
              <p className="font-semibold">{classData?.email}</p>
            </div>
          </div>
          <div className="mt-5">
            <h2 className="card-title font-bold text-red-500 text-xl">
              Title :{" "}
              <span className="text-green-500 text-xl">
                {classData?.title}...
              </span>
            </h2>
          </div>
        </div>

        <div className="divider divider-accent">Detail info</div>
        <div>
          <div className="flex justify-between">
            <p className="text-lg font-bold">
              Course price :{" "}
              <span className="text-red-500 text-xl">
                {" "}
                {classData?.price} $
              </span>
            </p>
            <p className="text-lg font-bold">
              Enrolment :{" "}
              <span className="text-green-400 text-xl">
                {classData?.total_enrolment}
              </span>
            </p>
          </div>
          <div></div>
        </div>
        <p className="text-lg font-bold mt-5">
          Description :{" "}
          <span className="text-base font-semibold text-gray-500">
            {classData?.description}
          </span>
        </p>
        <div className="flex justify-end mt-4">
          <button
          disabled={role?.role === 'teacher' || role?.role === 'admin'}
            onClick={() => setIsOpen(true)}
            className="btn btn-success text-lg text-red-700 font-bold"
          >
            PAY NOW
          </button>
        </div>

        <PayNowModal
          isOpen={isOpen}
          closeModal={closeModal}
          refetch={refetch}
          classData={{
            ...classData,
            price: classData?.price,
          }}
        ></PayNowModal>
      </div>
    </div>
  );
};

export default CardDetails;
