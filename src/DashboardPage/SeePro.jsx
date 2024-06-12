import { useParams } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import SeeProCard from "./SeeProCard";

const SeePro = () => {
  const { id } = useParams();
  console.log(id);
  const axiosSecure = useAxiosSecure();
  const { data: adminAllData = [], isLoading } = useQuery({
    queryKey: ["get-feedback", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/get-feedback/${id}`);
      return data;
    },
  });

  console.log(adminAllData);

  if (isLoading) {
    return <span className="loading loading-spinner text-secondary"></span>;
  }
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
     {
        adminAllData.map(aData => <SeeProCard key={aData?._id} aData={aData}></SeeProCard>)
     }
    </div>
  );
};

export default SeePro;
