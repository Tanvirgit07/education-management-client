import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import AllClassCard from "../Components/AllClassCard";

const AllClasses = () => {
  const axiosSecure = useAxiosSecure();
  const { data: classData = [], isLoading } = useQuery({
    queryKey: ["all-classes"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/all-classes`);
      return data.filter((item) => item.status === "accepted");
    },
  });

  console.log(classData);

  if (isLoading) {
    return <span className="loading loading-spinner text-secondary"></span>;
  }
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-5 mb-1 ml-5">
        {
            classData.map(data => <AllClassCard data ={data} key={data?._id}></AllClassCard>)
        }
    </div>
  );
};

export default AllClasses;
