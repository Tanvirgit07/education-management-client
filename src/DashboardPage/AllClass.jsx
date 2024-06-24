import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Banner from "../Components/Banner";
import { Link } from "react-router-dom";

const AllClass = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: adminAllData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-all-class"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/admin-all-class`);
      return data;
    },
  });

  

  const { mutateAsync } = useMutation({
    mutationFn: async ({ id, updateUser }) => {
      console.log(id);
      const { data } = await axiosSecure.patch(
        `/user-all-admin/update/${id}`,
        updateUser
      );
      return data;
    },
  });



  const { mutateAsync : rejectFunction } = useMutation({
    mutationFn: async ({ id, updateUser }) => {
      console.log(id);
      const { data } = await axiosSecure.patch(
        `/user-all-admin/reject/${id}`,
        updateUser
      );
      return data;
    },
  });

  const handleUpdate = async (id) => {
    const user = {
      status: "accepted",
    };

    try {
      const requestId = id;
      console.log(requestId);
      const data = await mutateAsync({ id: requestId, updateUser: user });
      console.log(data);
      refetch();
    } catch (err) {
      console.log(err.message);
    }
  };


  const handleReject = async (id) => {
    const userInfo = {
      status: "rejected",
    };

    try {
      const rejectedId = id;
      console.log(rejectedId);
      const data = await rejectFunction({ id: rejectedId, updateUser: userInfo });
      console.log(data);
      refetch();
    } catch (err) {
      console.log(err.message);
    }
  };

  console.log(adminAllData);
  if (isLoading) {
    return <span className="loading loading-spinner text-secondary"></span>;
  }
  return (
    <div>
      <div>
        <Banner></Banner>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Course Info</th>
                <th>Post Email</th>
                <th>Approved button</th>
                <th>Reject Button</th>
                <th>See progress</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {adminAllData.map((data) => (
                <tr key={data._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={data?.photo}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          Title : {data.title.slice(0, 15)}....
                        </div>
                        <div className="text-sm opacity-50">
                          Description : {data?.description.slice(0, 25)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="">{data?.email}</span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleUpdate(data?._id)}
                      className="btn btn-sm bg-green-300"
                    >
                      Approved
                    </button>
                  </td>
                  <td>
                    <button
                    onClick={() => handleReject(data?._id)}
                     className="btn btn-sm bg-red-400">Reject</button>
                  </td>
                  <th>
                    <Link to={`/see-pro/${data?._id}`}>
                      <button
                        disabled={data?.status !== "accepted"}
                        className="btn btn-sm bg-yellow-300"
                      >
                        See progress
                      </button>
                    </Link>
                  </th>
                  <th>{data?.status}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllClass;
