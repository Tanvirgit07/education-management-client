import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { toast } from "sonner";

const UserPage = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], isLoading,refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users`);
      return data;
    },
  });

  console.log(users);


  

  const { mutateAsync } = useMutation({
    mutationFn: async (cardId,classData) => {
      const { data } = await axiosSecure.patch(`/change-admin/${cardId}`, classData);
      return data;
    },
    onSuccess: () => {
      refetch()
      toast.success("Successfully added class !");
      setTimeout(() => {
        // navigate("/dashboard/my-class");
      }, 2000);
    },
  });


  const handleAdmin = async (id) => {
    const role = 'admin';
    const status = 'pending'
    console.log(id)
    try {
      const classData = {
        role,
        status
      };
      console.log(classData);
      await mutateAsync(id,classData);
    } catch (error) {
      console.log(error.message);
    }
  }

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
              <th>User image</th>
              <th>User email</th>
              <th>User name</th>
              <th>User role</th>
              <th>Make admin button</th>
            </tr>
          </thead>
          <tbody>
           {
            users.map(user =>  <tr key={user._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={user?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {
                    user?.email
                  }
                </td>
                <td>{user?.name}</td>
                <td>{user?.role}</td>
                <th>
                <button
                disabled={user?.role === 'admin'}
                onClick={()=>handleAdmin (user?._id)}
                 className="btn btn-sm bg-lime-300">Make admin</button>
                </th>
              </tr>)
           }
           
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPage;
