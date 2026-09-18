import React from 'react'
import Breadcrumb from '../components/common/Breadcrumb';
import MapSection from '../components/pages/contactComponents/MapSection';
import ContactUsQuestion from '../components/pages/contactComponents/ContactUsQuestion';

const ContactUS = () => {
  return (
    <section className="w-full py-2">
      <div>
        <Breadcrumb title={"Contact US"} />
      </div>

      <MapSection />
      <ContactUsQuestion />
      <hr className="text-[#ccc]" />
    </section>
  );
}

export default ContactUS;
