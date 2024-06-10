import { useParams } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaPlus } from "react-icons/fa";
import TrbModal from "../Components/TrbModal";
import { useState } from "react";

const EnrollDetailsPage = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  // console.log(id)
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: dataAssignment = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assignment-data"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/assignment-data/${id}`);
      return data;
    },
  });
  console.log(dataAssignment);

  const closeModal = () => {
    setIsOpen(false);
  };

  

  if (isLoading) {
    return <span className="loading loading-spinner text-secondary"></span>;
  }

  return (
    <div>
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
              Teaching Evaluation Report (TER)
            </h1>
          </div>
        </div>
      </div>
      <div className="  flex items-center  justify-center">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center bg-green-700 w-52 h-20 mr-10 rounded-full"
        >
          <div className="text-4xl text-white font-bold mr-2">
            <FaPlus />
          </div>
          <p className="text-3xl font-bold text-white">TRB</p>
        </button>
      </div>
      <TrbModal
        closeModal={closeModal}
        isOpen={isOpen}
        refetch={refetch}
        dataAssignment={dataAssignment}
      ></TrbModal>
    </div>
  );
};

export default EnrollDetailsPage;
