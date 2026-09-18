import React, { useEffect, useState } from "react";
import Breadcrumb from "../common/Breadcrumb";
import { FaCloudUploadAlt } from "react-icons/fa";
import $ from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";

const CompanyProfile = () => {



// let pageTitle = "Company Profile";

const [mapUrl, setMapUrl] = useState("");

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
      <section className="w-full bg-[#F1F4F5]">
        <div>
          <Breadcrumb path={"Company Profile"} link={"/company-profile"} />
        </div>

        <div className="m-5 bg-white rounded-lg overflow-hidden">
          <form action="" className="p-5 w-full ">
            <div className="flex gap-[3%]">
              <div className="basis-[35%]">
                <div>
                  <label className="w-full mt-[10px]">Category Image</label>
                  <input
                    type="file"
                    id="Image"
                    className="dropify"
                    data-height="180"
                  />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-col ">
                  <label htmlFor="">Name</label>
                  <input
                    placeholder="Name"
                    type="text"
                    className="border-1 border-[#ccc] rounded-sm p-2 mt-2"
                  />
                </div>

                <div className="flex flex-col mt-2">
                  <label htmlFor="">Email</label>
                  <input
                    placeholder="Email"
                    type="email"
                    className="border-1 border-[#ccc] rounded-sm p-2 mt-2"
                  />
                </div>

                <div className="flex flex-col mt-2 ">
                  <label htmlFor="">Mobile Number</label>
                  <input
                    placeholder="Mobile Number"
                    type="number"
                    className="border-1 border-[#ccc] rounded-sm p-2 mt-2"
                  />
                </div>
              </div>
            </div>

            <div className="w-full mt-10">
              <textarea
                placeholder="Address"
                className="w-full h-[120px] p-2 border border-[#ccc] resize-none rounded-lg"
              ></textarea>
            </div>

            <div className="w-full mt-5">
              <textarea
                placeholder="Google Map Embed URL"
                value={mapUrl}
                onChange={(e) => setMapUrl(e.target.value)}
                className="w-full h-[120px] p-2 border border-[#ccc] resize-none rounded-lg"
              ></textarea>
            </div>

            <div className="w-full h-[200px] mt-5 border rounded-lg overflow-hidden">
              {mapUrl ? (
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Google Map Preview
                </div>
              )}
            </div>

            <div className="mt-5">
              <button
                type="submit"
                className="border-1 border-[#ccc] p-3 rounded-lg bg-[#6B21A8] text-white text-[16px]"
              >
                Update Company Profile
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default CompanyProfile;
