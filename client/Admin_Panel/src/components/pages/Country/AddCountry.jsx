import axios from 'axios';
import Breadcrumb from '../../common/Breadcrumb';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';



const AddCountry = () => {



  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;
  

  let navigate = useNavigate();

  let {id} = useParams()

  let [editData, setEditData] = useState(null)
  



  let saveCountry = (e) =>  {

    e.preventDefault()

    let obj = {
      countryName: e.target.countryName.value,
      countryOrder: e.target.countryOrder.value
    };


    if(id) {
      axios
        .put(`${apiBaseUrl}/country/update/${id}`, obj)
        .then((res) => res.data)
        .then((finalRes) => {
          if (finalRes._status) {
            toast.success(finalRes._message);

            setTimeout(() => {
              navigate("/country/view");
            }, 6000);
          }
          
          else {
            toast.error(finalRes._message);
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
    else {
      axios
        .post(`${apiBaseUrl}/country/create`, obj)
        .then((res) => res.data)
        .then((finalRes) => {
          if (finalRes._status) {
            toast.success(finalRes._message);

            setTimeout(() => {
              navigate("/country/view");
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


  useEffect(()=> {
    if (id) {
      axios
        .get(`${apiBaseUrl}/country/getDetails/${id}`)
        .then((res) => res.data)
        .then((finalRes) => {
          setEditData(finalRes.details);
        });
    } else {
      setEditData(null);
    }
  },[id])

  


  return (
    <>
      <section className="w-full">
        <ToastContainer />
        <div>
          <Breadcrumb path="Country" link="/country/add" path2="Add" />
        </div>

        <div className="mt-[30px]  border-1 border-[#ccc] rounded-lg overflow-hidden m-5">
          <div className="p-3 bg-[#F1F5F9] text-[20px] font-semibold">
            Add Country
          </div>

          <hr className="border-1 text-[#ccc]" />

          <div className="p-3">
            <form action="" onSubmit={saveCountry}>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Country Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Country Name"
                  name="countryName"
                  defaultValue={editData?.countryName}
                  className="border-1 mt-2 rounded-lg border-[#ccc] p-2 px-3"
                />
              </div>

              <div className="flex flex-col mt-[30px]">
                <label htmlFor="" className="font-semibold">
                  Order
                </label>
                <input
                  type="number"
                  placeholder="Enter Order"
                  name="countryOrder"
                  defaultValue={editData?.countryOrder}
                  className="border-1 mt-2 rounded-lg border-[#ccc] p-2 px-3"
                />
              </div>

              <div className="mt-[40px]">
                <button
                  type="submit"
                  className="bg-[#9333EA] text-white py-2 px-3 cursor-pointer rounded-lg"
                >
                  {id ? "Update Country" : " Add Country"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddCountry;
