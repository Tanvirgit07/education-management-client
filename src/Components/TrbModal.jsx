// import PropTypes from "prop-types";
// import {
//   Dialog,
//   Transition,
//   TransitionChild,
//   DialogPanel,
//   DialogTitle,
// } from "@headlessui/react";
// // import { format } from 'date-fns'

// import { Fragment } from "react";
// import useAxiosSecure from "../Hooks/useAxiosSecure";
// import { useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
// const TrbModal = ({ closeModal, isOpen, singleData }) => {
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();
//   const { mutateAsync } = useMutation({
//     mutationFn: async (classData) => {
//       const { data } = await axiosSecure.post(`/assignment`, classData);
//       return data;
//     },
//     onSuccess: () => {
//       setTimeout(() => {
//         navigate("/dashboard/my-class");
//       }, 2000);
//     },
//   });

//   const handleAssignment = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const title = form.title.value;
//     const deadline = form.deadline.value;
//     const description = form.description.value;
//     const SeeDetailsId = singleData?._id;
//     const assignmentSubmit = 0;

//     try {
//       const assignmentInfo = {
//         title,
//         deadline,
//         description,
//         SeeDetailsId,
//         assignmentSubmit,
//       };
//       console.log(assignmentInfo);
//       await mutateAsync(assignmentInfo);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   return (
//     <Transition appear show={isOpen} as={Fragment}>
//       <Dialog as="div" className="relative z-10" onClose={closeModal}>
//         <TransitionChild
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-black bg-opacity-25" />
//         </TransitionChild>

//         <div className="fixed inset-0 overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-4 text-center">
//             <TransitionChild
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                 <DialogTitle
//                   as="h3"
//                   className="text-lg font-medium text-center leading-6 text-gray-900"
//                 >
//                   Assignment !
//                 </DialogTitle>
//                 <form onSubmit={handleAssignment}>
//                   <div className="mt-2">
//                     <p>Description</p>
//                     <textarea
//                       placeholder="Bio"
//                       name="description"
//                       className="textarea textarea-bordered textarea-sm textarea-secondary w-full"
//                     ></textarea>
//                   </div>
//                   <div>
//                     <button className="btn btn-outline mt-5 w-full btn-primary">
//                       Add feedback
//                     </button>
//                   </div>
//                 </form>
//               </DialogPanel>
//             </TransitionChild>
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// };

// TrbModal.propTypes = {
//   classData: PropTypes.object,
//   closeModal: PropTypes.func,
//   isOpen: PropTypes.bool,
//   refetch: PropTypes.func,
//   singleData: PropTypes.func,
//   _id: PropTypes.func,
// };

// export default TrbModal;

import PropTypes from "prop-types";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
// import { format } from 'date-fns'

import { Fragment, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Rating from "react-rating-stars-component"; // Import the rating component
import useAuth from "../Hooks/useAuth";

const TrbModal = ({ closeModal, isOpen }) => {
  const [rating, setRating] = useState(0); // Add state for rating
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {user} = useAuth()
  const { mutateAsync } = useMutation({
    mutationFn: async (classData) => {
      const { data } = await axiosSecure.post(`/feedback`, classData);
      return data;
    },
    onSuccess: () => {
      setTimeout(() => {
        navigate("/dashboard/my-class");
      }, 2000);
    },
  });

  console.log(rating);

  const handleAssignment = async (e) => {
    e.preventDefault();
    const form = e.target;
    const description = form.description.value;
    const assignmentSubmit = 0;
    const name = user?.displayName;
    const image = user?.photoURL;


    try {
      const assignmentInfo = {
        description,
        rating, // Include the rating value
        assignmentSubmit,
        name,
        image
      };
      console.log(assignmentInfo);
      await mutateAsync(assignmentInfo);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                 Please give your feedback !
                </DialogTitle>
                <form onSubmit={handleAssignment}>
                  <div className="mt-2 max-w-40 mx-auto">
                    <p className="text-center"></p>
                    <Rating
                      count={5}
                      size={35}
                      activeColor="#ffd700"
                      value={rating}
                      onChange={(newRating) => {
                        setRating(newRating);
                      }}
                    />
                  </div>
                  <div className="mt-2">
                    <p className="font-bold mb-1 ml-1">Description</p>
                    <textarea
                      className="textarea textarea-secondary w-full h-40"
                      placeholder="Description"
                    ></textarea>
                  </div>
                  <div>
                    <button className="btn btn-outline mt-5 w-full btn-primary">
                      Add feedback
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

TrbModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  singleData: PropTypes.object.isRequired,
};

export default TrbModal;
