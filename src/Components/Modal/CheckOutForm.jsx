import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import "./CheckOutForm.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
// import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import useRole from "../../Hooks/useRole";

const CheckOutForm = ({ closeModal, classData, refetch }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState();
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate()
  // const [role] = useRole()

  useEffect(() => {
    if (classData?.price && classData?.price > 1) {
      getClientSecret({ price: classData?.price });
    }
  }, [classData?.price]);

  const getClientSecret = async (price) => {
    const { data } = await axiosSecure.post(`/create-payment-intent`, price);
    // return data;
    console.log(data);
    console.log(`secreat for very big`, data);
    setClientSecret(data?.clientSecret);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
      setProcessing(false);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError("");
    }
    console.log(paymentMethod);
    console.log(user?.displayName, user?.email);

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });
    console.log(paymentIntent);
    if (confirmError) {
      console.log(confirmError);
      setCardError(error);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      console.log(paymentIntent);
      const paymentInfo = {
        ...classData,
        paymentUserName: user?.displayName,
        paymentUserEmail: user?.email,
        classId: classData?._id,
        transactionId: paymentIntent.id,
        date: new Date(),
      };
      delete paymentInfo._id;
      console.log(paymentInfo);
      try {
        const { data } = await axiosSecure.post("/payment", paymentInfo);
        console.log(data);
        closeModal();
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() =>{
          navigate("/dashboard/my-enroll");
        },2000)
        
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="flex mt-2 justify-around">
          <button
            disabled={!stripe || !clientSecret || processing}
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            Pay ${classData?.price}
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            cancel
          </button>
        </div>
      </form>
      {/* <Toaster richColors position="top-right" /> */}
      {cardError && <p className="text-red-600">{cardError}</p>}
    </>
  );
};

CheckOutForm.propTypes = {
  classData: PropTypes.object,
  closeModal: PropTypes.func,
  isOpen: PropTypes.bool,
  refetch: PropTypes.func,
};

export default CheckOutForm;
