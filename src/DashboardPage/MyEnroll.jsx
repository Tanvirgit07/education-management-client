import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import EnrollDetails from "./EnrollDetails";

const MyEnroll = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: enrollData = [], isLoading } = useQuery({
    queryKey: ["my-enroll", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/my-enroll/${user?.email}`);
      return data;
    },
  });

  console.log(enrollData);
  if (isLoading) {
    return <span className="loading loading-spinner text-secondary"></span>;
  }

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
      {
        enrollData.map(data => <EnrollDetails key={data?._id} data={data}></EnrollDetails>)
      }
    </div>
  );
};

export default MyEnroll;
