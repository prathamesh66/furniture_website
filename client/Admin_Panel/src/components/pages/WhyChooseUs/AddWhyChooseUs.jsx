import { useEffect } from 'react'
import Breadcrumb from '../../common/Breadcrumb';
import $ from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";

const AddWhyChooseUs = () => {


    useEffect(() => {
      $(".dropify").dropify({
        messages: {
          default: "Drag and drop ",
          replace: "Drag and drop ",
          remove: "Remove",
          error: "Oops, something went wrong",
        },
      });
    }, []);

  return (
    <>
      <section className="w-full">
        <div>
          <Breadcrumb
            path="Why Choose US"
            link="/why-choose-us/add"
            path2="Add"
          />
        </div>

        <div className="mt-[30px]  border-1 border-[#ccc] rounded-lg overflow-hidden m-5">
          <div className="p-3 bg-[#F1F5F9] text-[20px] font-semibold">
            Add Why Choose Us
          </div>

          <hr className="border-1 text-[#ccc]" />

          <div className="p-3">
            <form action="" className=" w-full ">
              <div className="flex gap-[3%]">
                <div className="basis-[35%]">
                  <div>
                    <label className="w-full mt-[10px]">Category Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="dropify"
                      data-height="236"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col ">
                    <label htmlFor="">Title</label>
                    <input
                      placeholder="Title"
                      type="text"
                      className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
                    />
                  </div>

                  <div className="flex flex-col mt-2">
                    <label htmlFor="">Order</label>
                    <input
                      placeholder="Order"
                      type="number"
                      className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
                    />
                  </div>

                  <div className="flex flex-col mt-2">
                    <label htmlFor="">Description</label>
                    <textarea
                      name=""
                      id=""
                      rows={4}
                      className="border-1 border-[#ccc] rounded-lg p-2 mt-2 resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="border-1 border-[#ccc] p-3 rounded-lg bg-[#6B21A8] text-white text-[16px] "
                >
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddWhyChooseUs;



