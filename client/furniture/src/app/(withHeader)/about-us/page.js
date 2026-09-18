import React from 'react'
import Breadcrumb from '../components/common/Breadcrumb'
import AboutContent from '../components/pages/aboutComponents/AboutContent';
import WhyChooseUsAboutUS from '../components/pages/aboutComponents/WhyChooseUsAboutUS';
import WhatCustomerSayAboutUs from '../components/pages/aboutComponents/WhatCustomerSayAboutUs';

const AboutUS = () => {
  return (
    <>
      <section className="w-full py-5">
        <div>
          <Breadcrumb title={"About US"} />
        </div>

       <AboutContent/>
       <WhyChooseUsAboutUS/>
       <WhatCustomerSayAboutUs/>

       <hr className='text-[#ccc]' />

      </section>
    </>
  );
}

export default AboutUS
