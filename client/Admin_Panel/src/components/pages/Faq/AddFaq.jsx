import axios from "axios";
import Breadcrumb from "../../common/Breadcrumb";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

const AddFaq = () => {


  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;

  let navigate = useNavigate()

  let {id} = useParams()

    let [editData, setEditData] = useState(null)
  


  let saveFaq = (e) => {

    e.preventDefault()

    let obj = {
      faqQuestion: e.target.faqQuestion.value,
      faqAnswer: e.target.faqAnswer.value,
      faqOrder: e.target.faqOrder.value
    };


    if(id) {
      axios
        .put(`${apiBaseUrl}/faq/update/${id}`, obj)
        .then((res) => res.data)
        .then((finalRes) => {
          if (finalRes._status) {
            toast.success(finalRes._message);

            setTimeout(() => {
              navigate("/faq/view");
            }, 6000);
          } else {
            toast.error(finalRes._message);
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    else {
      axios
        .post(`${apiBaseUrl}/faq/create`, obj)
        .then((res) => res.data)
        .then((finalRes) => {
          if (finalRes._status) {
            toast.success(finalRes._message);

            setTimeout(() => {
              navigate("/faq/view");
            }, 6000);
          } else {
            toast.error(finalRes._message);
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

  }


  useEffect(() => {
    if (id) {
      axios
        .get(`${apiBaseUrl}/faq/getDetails/${id}`)
        .then((res) => res.data)
        .then((finalRes) => {
          setEditData(finalRes.details);
        });
    } else {
      setEditData(null);
    }
  }, [id]);


  return (
    <>
      <section className="w-full">
        <ToastContainer />
        <div>
          <Breadcrumb path="Faq" link="/faq/add" path2="Add" />
        </div>

        <div className="mt-[30px]  border-1 border-[#ccc] rounded-lg overflow-hidden m-5">
          <div className="p-3 bg-[#F1F5F9] text-[20px] font-semibold">
            Add Faq
          </div>

          <hr className="border-1 text-[#ccc]" />

          <div className="p-3">
            <form action="" onSubmit={saveFaq}>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Question
                </label>
                <input
                  type="text"
                  placeholder="Question"
                  name="faqQuestion"
                  defaultValue={editData?.faqQuestion}
                  className="border-1 mt-2 rounded-lg border-[#ccc] p-2 px-3"
                />
              </div>

              <div className="flex flex-col mt-[30px]">
                <label htmlFor="" className="font-semibold">
                  Answer
                </label>
                <textarea
                  placeholder="Answer"
                  name="faqAnswer"
                  defaultValue={editData?.faqAnswer}
                  id=""
                  rows={4}
                  className="border-1 mt-2 rounded-lg border-[#ccc] p-2 px-3"
                ></textarea>
              </div>

              <div className="flex flex-col mt-[30px]">
                <label htmlFor="" className="font-semibold">
                  Order
                </label>
                <input
                  type="number"
                  placeholder="Order"
                  name="faqOrder"
                  defaultValue={editData?.faqOrder}
                  className="border-1 mt-2 rounded-lg border-[#ccc] p-2 px-3"
                />
              </div>

              <div className="mt-[40px]">
                <button
                  type="submit"
                  className="bg-[#9333EA] text-white py-2 px-3 cursor-pointer rounded-lg"
                >
                  {id ? "Update Faq" : "Add Faq"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddFaq;
