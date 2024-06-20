import { useState } from "react";
import useAuth from "../Hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Toaster, toast } from "sonner";
import { ImSpinner9 } from "react-icons/im";
import useRole from "../Hooks/useRole";

const TeachToEduCare = () => {
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [role] = useRole()

  const { mutateAsync } = useMutation({
    mutationFn: async (classData) => {
      const { data } = await axiosSecure.post(`/teach`, classData);
      return data;
    },
    onSuccess: () => {
      toast.success("Successfully added teacher request !");
      setLoading(false);
    },
  });

  const handelEduCare = async (e) => {
    e.preventDefault();
    setLoading(true)
    const form = e.target;
    const name = user?.displayName;
    const email = user?.email;
    const image = user?.photoURL;
    const title = form.title.value;
    const experience = value;
    const category = value1;
    const upStatus = role.status;
    const upRole = role.role;
    try {
      const teachEdeCare = {
        name,
        email,
        image,
        title,
        experience,
        category,
        upStatus,
        upRole
      };
      console.log(teachEdeCare);
      await mutateAsync(teachEdeCare);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="lg:max-w-4xl w-11/12 shadow-2xl mx-auto border-solid border-2 border-gray-300 p-10 mt-8 rounded-xl">
      <form onSubmit={handelEduCare}>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-7">
          <div>
            <p className="mb-1 ml-1">Name</p>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow"
                name="name"
                readOnly
                defaultValue={user?.displayName}
                placeholder="Username"
              />
            </label>
          </div>

          <div>
            <p className="mb-1 ml-1">Email</p>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                name="email"
                readOnly
                defaultValue={user?.email}
                placeholder="Email"
              />
            </label>
          </div>

          <div>
            <p className="mb-1 ml-1">PhotoURL</p>
            <input
              type="text"
              placeholder="PhotoURL"
              name="photo"
              readOnly
              defaultValue={user?.photoURL}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <p className="mb-1 ml-1">Title</p>
            <input
              type="text"
              placeholder="Title"
              name="title"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <select
              onChange={(event) => setValue(event.target.value)}
              className="select select-bordered w-full"
            >
              <option disabled selected>
                Select experience level
              </option>
              <option>Beginner</option>
              <option>Experienced</option>
              <option>Mid-level</option>
            </select>
          </div>

          <div>
            <select
              onChange={(event) => setValue1(event.target.value)}
              className="select select-bordered w-full "
            >
              <option disabled selected>
                Select a category
              </option>
              <option>Web development</option>
              <option>Digital marketing</option>
              <option>Graphics design</option>
              <option>Web design</option>
              <option>Video editing</option>
            </select>
          </div>
        </div>
        <div className="mt-10">
        <button 
        disabled={role?.role === 'teacher' || role?.role === 'admin'}
          className="btn btn-outline w-full btn-primary">
            {
              loading ? <ImSpinner9 className="text-2xl mr-1 text-pink-600 animate-spin" /> :
              <ImSpinner9 className="text-xl mr-1 text-pink-600" />
            }
            Add class button
          </button>
        </div>
      </form>
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default TeachToEduCare;
