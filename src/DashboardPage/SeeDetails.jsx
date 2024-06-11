import { useState } from "react";
import CreateModal from "../Components/CreateModal";
import SeeDetailsBanner from "../Components/SeeDetailsBanner";
import { GoPlus } from "react-icons/go";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MdAssignment } from "react-icons/md";
import { VscGitStashApply } from "react-icons/vsc";
import { FcApproval } from "react-icons/fc";
import useAuth from "../Hooks/useAuth";

const SeeDetails = () => {
  const [isOpen, setIsOpen] = useState(false);

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  console.log(user);
  const { id } = useParams();
  console.log(id);
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

  const { data: totalData = [] } = useQuery({
    queryKey: ["teacher-stats", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/teacher-stats/${id}`);
      return data;
    },
  });

  const { data: totalEnrolment = [] } = useQuery({
    queryKey: ["total-enrolment", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/total-enrolment/${id}`);
      return data;
    },
  });

  console.log(totalEnrolment);

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
                Class progress section !
              </h1>
            </div>
          </div>
        </div>
        <div className="flex max-w-[1020px] h-32 mb-10 mx-auto items-center justify-between">
          <div className="stats shadow-2xl">
            <div className="stat">
              <div className="stat-figure text-primary">
                <MdAssignment className="text-4xl font-bold mt-3" />
              </div>
              <div className="stat-title">Total Assignment</div>
              <div className="stat-value text-primary">
                {totalData.totalAssignmentPost} Ta
              </div>
              <div className="stat-desc">Your Assignment</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <VscGitStashApply className="text-4xl font-bold mt-2" />
              </div>
              <div className="stat-title">Total Submitted Assignment</div>
              <div className="stat-value text-secondary">
                {totalEnrolment.totalEnrolment} Ta
              </div>
              <div className="stat-desc">Submitted Assignment</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <FcApproval className="text-4xl font-bold mt-2" />
              </div>
              <div className="stat-title">Total Enroll</div>
              <div className="stat-value text-lime-500">
                {totalData.totalAssignmentSubmit} Ta
              </div>
              <div className="stat-desc">Your Enrolled Course</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <div className="avatar online">
                  <div className="w-16 rounded-full">
                    <img src={user?.photoURL} />
                  </div>
                </div>
              </div>
              <div className="stat-value">Hi...</div>
              <div className="stat-title">Tasks done</div>
              <div className="stat-desc text-secondary">Try your best</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <SeeDetailsBanner></SeeDetailsBanner>
      </div>
      <div className="max-w-lg mx-auto ">
        <button
          onClick={() => setIsOpen(true)}
          className="flex w-56 mx-auto mb-10 cursor-pointer rounded-full h-20 bg-green-700 items-center justify-center"
        >
          <div className="text-6xl font-semibold">
            <GoPlus />
          </div>
          <h1 className="text-4xl text-white font-semibold mb-1">Create</h1>
        </button>
      </div>
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
