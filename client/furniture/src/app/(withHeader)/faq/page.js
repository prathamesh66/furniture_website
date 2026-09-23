"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Breadcrumb from "../components/common/Breadcrumb";

const FAQPage = () => {
  const APIBASEURL = process.env.NEXT_PUBLIC_APIBASEPATH;

  const [faqData, setFaqData] = useState([]);
  const [activeFaq, setActiveFaq] = useState(null);
  const [loading, setLoading] = useState(true);

  const getFaqData = async () => {
    try {
      if (!APIBASEURL) {
        console.log("API BASE URL is not defined");
        setFaqData([]);
        return;
      }

      const response = await axios.get(`${APIBASEURL}faq/`);

      console.log("FAQ RESPONSE:", response.data);

      if (response.data._status) {
        setFaqData(response.data.faqData || []);
      } else {
        setFaqData([]);
      }
    } catch (error) {
      console.log("FAQ ERROR:", error);
      setFaqData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFaqData();
  }, []);

  const handleFaq = (index) => {
    setActiveFaq((previousIndex) => (previousIndex === index ? null : index));
  };

  return (
    <>
      <Breadcrumb title="FAQ" />

      <section className="">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <hr className="border border-[#ccc]" />

          {/* Heading */}
          <div className="text-center mb-8 sm:mb-10 lg:mb-[45px]">
            {/* <h1 className="text-[36px] font-semibold text-[#222] mb-3">
              Frequently Asked Questions
            </h1>

            <p className="text-[16px] text-[#777]">
              Find answers to the most commonly asked questions.
            </p> */}
          </div>

          {/* FAQ List */}
          <div className="w-full max-w-[900px] mx-auto rounded-sm">
            {/* Loading */}
            {loading && (
              <div className="text-center py-8 sm:py-10">
                <p className="text-sm sm:text-base text-[#777]">
                  Loading FAQs...
                </p>
              </div>
            )}

            {/* No FAQ */}
            {!loading && faqData.length === 0 && (
              <div className="text-center py-8 sm:py-10">
                <p className="text-sm sm:text-base text-[#777]">
                  No FAQ found.
                </p>
              </div>
            )}

            {/* FAQ Data */}
            {!loading &&
              faqData.length > 0 &&
              faqData.map((faq, index) => (
                <div
                  key={faq._id}
                  className="border border-[#e5e5e5] mb-3 sm:mb-4 rounded-sm overflow-hidden"
                >
                  {/* Question */}
                  <button
                    type="button"
                    onClick={() => handleFaq(index)}
                    className="w-full flex items-center justify-between gap-3 sm:gap-5 px-4 sm:px-5 lg:px-6 py-4 sm:py-5 text-left bg-white hover:bg-[#fafafa] transition-all duration-200"
                  >
                    <span className="text-sm sm:text-base lg:text-[17px] font-medium text-[#222] leading-6 sm:leading-7 break-words">
                      {faq.faqQuestion}
                    </span>

                    <span className="text-[22px] sm:text-[24px] text-[#222] shrink-0 leading-none">
                      {activeFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  {/* Answer */}
                  {activeFaq === index && (
                    <div className="border-t border-[#e5e5e5] px-4 sm:px-5 lg:px-6 py-4 sm:py-5 bg-[#fafafa]">
                      <p className="text-sm sm:text-[15px] leading-6 sm:leading-7 text-[#666] break-words">
                        {faq.faqAnswer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQPage;
