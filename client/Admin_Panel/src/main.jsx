import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './components/pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router'
import Dashboard from './components/pages/Dashboard'
import MainLayout from './components/common/MainLayout'
import Profile from './components/pages/Profile'
import CompanyProfile from './components/pages/CompanyProfile'
import ViewUser from './components/pages/User/ViewUser'
import ContactEnquirys from './components/pages/Enquirys/ContactEnquirys'
import Newsletter from './components/pages/Enquirys/Newsletters'
import AddColor from './components/pages/Colors/AddColor'
import ViewColor from './components/pages/Colors/ViewColor'
import AddMaterials from './components/pages/Materials/AddMaterials'
import ViewMaterials from './components/pages/Materials/ViewMaterials'
import AddCategory from './components/pages/Parent Categorys/AddCategory'
import ViewCategory from './components/pages/Parent Categorys/ViewCategory'
import AddSubCategory from './components/pages/Sub Categorys/AddSubCategory'
import ViewSubCategory from './components/pages/Sub Categorys/ViewSubCategory'
import AddSubSubCategory from './components/pages/Sub Sub Categorys/AddSubSubCategory'
import ViewSubSubCategory from './components/pages/Sub Sub Categorys/ViewSubSubCategory'
import AddWhyChooseUs from './components/pages/WhyChooseUs/AddWhyChooseUs'
import ViewWhyChooseUs from './components/pages/WhyChooseUs/ViewWhyChooseUs'
import AddSliders from './components/pages/Sliders/AddSliders'
import ViewSliders from './components/pages/Sliders/ViewSliders'
import AddCountry from './components/pages/Country/AddCountry'
import ViewCountry from './components/pages/Country/ViewCountry'
import AddTestimonials from './components/pages/Testimonials/AddTestimonials'
import ViewTestimonials from './components/pages/Testimonials/ViewTestimonials'
import AddFaq from './components/pages/Faq/AddFaq'
import ViewFaq from './components/pages/Faq/ViewFaq'
import AddProduct from './components/pages/Products/AddProduct'
import ViewProduct from './components/pages/Products/ViewProduct'
import Orders from './components/pages/Orders/Orders'
import OrderDetails from './components/pages/Orders/orderDetails'

createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/company-profile" element={<CompanyProfile />}></Route>
          <Route path="/user/view" element={<ViewUser />} />
          <Route
            path="/enquiry/contact-enquirys"
            element={<ContactEnquirys />}
          />
          <Route path="/enquiry/newsletter" element={<Newsletter />} />
          <Route path="/color/add/:id?" element={<AddColor />} />
          <Route path="/color/view" element={<ViewColor />} />
          <Route path="/material/add/:id?" element={<AddMaterials />} />
          <Route path="/material/view" element={<ViewMaterials />} />
          <Route path="/category/add/:id?" element={<AddCategory />} />
          <Route path="/category/view" element={<ViewCategory />} />
          <Route path="/sub-category/add/:id?" element={<AddSubCategory />} />
          <Route path="/sub-category/view" element={<ViewSubCategory />} />
          <Route
            path="/sub-Sub-category/add/:id?"
            element={<AddSubSubCategory />}
          />
          <Route
            path="/sub-Sub-category/view"
            element={<ViewSubSubCategory />}
          />

          <Route path="/products/add/:id?" element={<AddProduct />}></Route>
          <Route path="/products/view" element={<ViewProduct />}></Route>

          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/view/:id" element={<OrderDetails />} />

          <Route path="/why-choose-us/add" element={<AddWhyChooseUs />} />
          <Route path="/why-choose-us/view" element={<ViewWhyChooseUs />} />
          <Route path="/slider/add" element={<AddSliders />} />
          <Route path="/slider/view" element={<ViewSliders />} />
          <Route path="/country/add/:id?" element={<AddCountry />} />
          <Route path="/country/view" element={<ViewCountry />} />
          <Route path="/testimonial/add" element={<AddTestimonials />} />
          <Route path="/testimonial/view" element={<ViewTestimonials />} />

          <Route path="faq">
            <Route path="add/:id?" element={<AddFaq />} />
            <Route path="view" element={<ViewFaq />} />
          </Route>
        </Route>

        <Route path="/" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  </>,
);
