import React from "react";

const MapSection = () => {
  return (
    <>
      <section className="max-w-[1320px] mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <hr className="text-[#ccc]" />

        <div className="py-5 sm:py-7 md:py-10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230166.66142737019!2d73.70981086446879!3d18.503508759620864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e1!3m2!1sen!2sin!4v1790144594054!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]"
          ></iframe>
        </div>
      </section>
    </>
  );
};

export default MapSection;
