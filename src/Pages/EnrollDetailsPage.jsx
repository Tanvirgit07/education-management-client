import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaPlus } from "react-icons/fa";
import TrbModal from "../Components/TrbModal";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";

const EnrollDetailsPage = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  console.log(id)
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

  
  console.log(id);
  console.log(dataAssignment?._id);
  
  const { mutateAsync } = useMutation({
    mutationFn: async (classData) => {
      const { data } = await axiosSecure.post(`/submit-info/${id}`, classData);
      return data;
    },
    onSuccess: () => {
      toast.success("Submit your assignment successfully !");
    },
});


  const handleSubmit = async () => {
    const submitStatus = 'accepted'
    const assignmentSubmitted = 0;
    try {
      const submitInfo = {
        submitStatus,
        assignmentSubmitted
      };
      console.log(submitInfo);
      await mutateAsync(submitInfo);
    } catch (error) {
      console.log(error.message);
    }
  };

 
  if (isLoading) {
    return <span className="loading loading-spinner text-secondary"></span>;
  }

  return (
    <div className="mb-5">
      <div
        className="hero h-[20vh] mb-10 rounded-lg mt-6"
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
      <div>
        <div
          className="hero h-[20vh] mb-10 rounded-lg mt-10"
          style={{
            backgroundImage:
              "url(https://i.ibb.co/s5GKMYh/universe-1566161-1280.jpg)",
          }}
        >
          <div className="hero-overlay bg-opacity-60 rounded-xl"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="">
              <h1 className="mb-5 text-3xl font-bold">
                Your Assignment Here !
              </h1>
            </div>
          </div>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>No</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Deadline</th>
                  <th>Submit button</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}

                {
                  dataAssignment.map((aData,index) => <tr key={aData?._id}>
                    <th>{index + 1}</th>
                    <td>{aData?.title}</td>
                    <td>{aData?.description.slice(0,60)}.....</td>
                    <td>{aData?.deadline}</td>
                    <td>
                    <button
                    onClick={handleSubmit}
                     className="btn btn-sm bg-green-400">Submit</button>
                    </td>
                  </tr>)
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default EnrollDetailsPage;
