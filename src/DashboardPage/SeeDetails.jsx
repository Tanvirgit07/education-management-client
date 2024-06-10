import { useState } from "react";
import CreateModal from "../Components/CreateModal";
import SeeDetailsBanner from "../Components/SeeDetailsBanner";
import { GoPlus } from "react-icons/go";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const SeeDetails = () => {
  const [isOpen, setIsOpen] = useState(false);

  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const {
    data: singleData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["single-data"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/single-data/${id}`);
      return data;
    },
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  if (isLoading) {
    return <span className="loading loading-spinner text-secondary"></span>;
  }
  console.log(singleData);
  return (
    <div>
      <div>
        <SeeDetailsBanner></SeeDetailsBanner>
      </div>
      <button
        onClick={() => setIsOpen(true)}
        className="flex w-64 cursor-pointer rounded-full h-28 bg-green-700 items-center justify-center"
      >
        <div className="text-6xl font-semibold">
          <GoPlus />
        </div>
        <h1 className="text-4xl text-white font-semibold mb-1">Create</h1>
      </button>
      <CreateModal
        isOpen={isOpen}
        closeModal={closeModal}
        refetch={refetch}
        singleData={singleData}
      ></CreateModal>
    </div>
  );
};
export default SeeDetails;
