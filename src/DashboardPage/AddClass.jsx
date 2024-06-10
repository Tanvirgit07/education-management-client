import { useContext, useState } from "react";
import { imageUpload } from "../api/Utils";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ImSpinner9 } from "react-icons/im";

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)

  const { mutateAsync } = useMutation({
    mutationFn: async (classData) => {
      const { data } = await axiosSecure.post(`/class`, classData);
      return data;
    },
    onSuccess: () => {
      toast.success("Successfully added class !");
      setLoading(false)
      setTimeout(() => {
        navigate("/dashboard/my-class");
      }, 2000);
    },
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true)
    const form = e.target;
    const name = user?.displayName;
    const email = user?.email;
    const photo = form.photo.files[0];
    const title = form.title.value;
    const description = form.description.value;
    const price = form.price.value;
    const total_enrolment = 0;
    const status = ' pending'

    try {
      const imageURL = await imageUpload(photo);
      console.log(imageURL);
      const classData = {
        name,
        email,
        photo : imageURL,
        title,
        description,
        price,
        total_enrolment,
        status 
      };
      console.log(classData);
      await mutateAsync(classData);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="max-w-4xl shadow-2xl mx-auto border-solid border-2 border-gray-300 p-10 mt-8 rounded-xl">
      <form onSubmit={handleAdd}>
        <div className="grid grid-cols-2 gap-7">
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
                defaultValue={user?.displayName}
                readOnly
                name="name"
                className="grow"
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
                defaultValue={user?.email}
                r
                readOnly
                name="email"
                className="grow"
                placeholder="Email"
              />
            </label>
          </div>

          <div>
            <p className="mb-1 ml-1">Image</p>
            <input
              type="file"
              name="photo"
              className="file-input file-input-bordered w-full"
            />
          </div>

          <div>
            <p className="mb-1 ml-1">Title</p>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <p className="mb-1 ml-1">Price</p>
            <input
              type="text"
              name="price"
              placeholder="Price"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <p className="mb-1 ml-1">Description</p>
            <input
              type="text"
              name="description"
              placeholder="Description"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        <div className="mt-10">
          <button 
          className="btn btn-outline w-full btn-primary">
            {
              loading ? <ImSpinner9 className="text-2xl mr-1 text-pink-600 animate-spin" /> :
              <ImSpinner9 className="text-xl mr-1 text-pink-600" />
            }
            Button Add class button
          </button>
        </div>
      </form>
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default AddClass;
