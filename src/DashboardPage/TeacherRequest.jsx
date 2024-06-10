import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const TeacherRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { data: teacherReq = [], isLoading,refetch } = useQuery({
    queryKey: ["all-teacher-req"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/all-teacher-req`);
      return data;
    },
  });


  const { mutateAsync } = useMutation({
    mutationFn: async ({email, updateUser}) => {
      console.log(email);
      const { data } = await axiosSecure.patch(
        `/user/update/${email}`,
        updateUser
      );
      return data;
    },
  });


  const { mutateAsync:forReject } = useMutation({
    mutationFn: async ({email, updateUser}) => {
      console.log(email);
      const { data } = await axiosSecure.patch(
        `/user/reject/${email}`,
        updateUser
      );
      return data;
    },
  });


  const handleUpdate = async (email) => {
    const user = {
      role: "teacher",
      status: "accepted",
    };

    try {
      const requestMail = email;
      console.log(requestMail);
      const data = await mutateAsync({ email: requestMail, updateUser: user });
      console.log(data);
      refetch()
    } catch (err) {
      console.log(err.message);
    }

  };


  const handleReject = async (email) => {
    const user = {
      role: "student",
      status: "rejected",
    };

    try {
      const requestMail = email;
      console.log(requestMail);
      const data = await forReject({ email: requestMail, updateUser: user });
      console.log(data);
      refetch()
    } catch (err) {
      console.log(err.message);
    }

  };

  if (isLoading) {
    return <span className="loading loading-spinner text-secondary"></span>;
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Images</th>
              <th>Name</th>
              <th>experience</th>
              <th>Title</th>
              <th>category</th>
              <th>status</th>
              <th>Approved button</th>
              <th>Reject button</th>
            </tr>
          </thead>
          <tbody>
            {teacherReq.map((req) => (
              <tr key={req._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={req?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{req?.name}</td>
                <td>{req.experience}</td>
                <td>{req?.title.slice(0, 15)}...</td>
                <td>{req?.category}</td>
                {
                  req?.status ? <td className="">{req?.status}</td> : <td className="">pending</td>
                }
                <td>
                  <button
                  disabled ={req?.status === 'accepted' || req?.status === 'rejected'}
                    onClick={() => handleUpdate(req?.email)}
                    className="btn btn-sm bg-green-300"
                  >
                    Approved
                  </button>
                </td>
                <td>
                  <button 
                  disabled = {req?.status === 'accepted' || req?.status === 'rejected'}
                  onClick={() => handleReject(req?.email)}
                  className="btn btn-sm bg-red-400">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherRequest;
