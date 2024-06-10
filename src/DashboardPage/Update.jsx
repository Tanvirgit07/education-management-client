import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { imageUpload } from "../api/Utils";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";

const Update = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  console.log(id);
  const {
    data: classUpdate = [],
    isLoading,
  } = useQuery({
    queryKey: ["update-class", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/update-class/${id}`);
      return data;
    },
  });

  console.log(classUpdate?._id);

  const { mutateAsync } = useMutation({
    mutationFn: async (updateInfo) => {
      const { data } = await axiosSecure.patch(`/dataUpdate/${id}`, updateInfo);
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
      setTimeout(() => {
        navigate("/dashboard/my-class");
      }, 2000);
    },
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = user?.displayName;
    const photo = form.photo.files[0];
    const title = form.title.value;
    const description = form.description.value;
    const price = form.price.value;

    try {
      const imageURL = await imageUpload(photo);
      console.log(imageURL);
      const classData = {
        name,
        photo: imageURL,
        title,
        description,
        price,
      };
      console.log(classData);
      await mutateAsync(classData);
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(classUpdate);
  if (isLoading) {
    return <span className="loading loading-spinner text-secondary"></span>;
  }
  return (
    <div className="max-w-4xl shadow-2xl mx-auto border-solid border-2 border-gray-300 p-10 mt-8 rounded-xl">
      <form onSubmit={handleUpdate}>
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
                name="name"
                defaultValue={classUpdate?.name}
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
                readOnly
                name="email"
                defaultValue={classUpdate?.email}
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
              defaultValue={classUpdate?.title}
              placeholder="Title"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <p className="mb-1 ml-1">Price</p>
            <input
              type="text"
              name="price"
              defaultValue={classUpdate?.price}
              placeholder="Price"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <p className="mb-1 ml-1">Description</p>
            <input
              type="text"
              defaultValue={classUpdate?.description}
              name="description"
              placeholder="Description"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        <div className="mt-10">
          <button className="btn btn-outline w-full btn-primary">
            {loading ? (
              <ImSpinner9 className="text-2xl mr-1 text-pink-600 animate-spin" />
            ) : (
              <ImSpinner9 className="text-xl mr-1 text-pink-600" />
            )}
            Button Add class button
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
