import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Banner from "../Components/Banner";
import { MdOutlineFileUpload } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";

const MyClass = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: classData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-class", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/my-class/${user?.email}`);
      return data;
    },
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/class-delete/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your class has been deleted.",
          icon: "success",
        });
      }
    });
  };

  console.log(classData);
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
                <th>User Info</th>
                <th>Price</th>
                <th>Update</th>
                <th>Delete</th>
                <th>See details</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {classData.map((data) => (
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
                    Name : {data?.name}
                    <br />
                    <span className="">Email : {data?.email}</span>
                  </td>
                  <td>${data?.price}</td>
                  <td>
                    <Link to={`/dashboard/update/${data?._id}`}>  
                      <button>
                        <MdOutlineFileUpload className="text-3xl font-bold cursor-pointer" />
                      </button>
                    </Link>
                  </td>
                  <td>
                    <Link>
                      <button onClick={() => handleDelete(data?._id)}>
                        <AiOutlineDelete className="text-2xl font-bold cursor-pointer text-red-600" />
                      </button>
                    </Link>
                  </td>
                  <td>
                    <Link to={`/see-details/${data?._id}`}>
                      <button
                        disabled={data?.status === " pending"}
                        className="btn btn-sm btn-secondary"
                      >
                        See details
                      </button>
                    </Link>
                  </td>
                  <th>
                    <p className="text-base">{data?.status}</p>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyClass;
