import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home"
import Contact from "../pages/Contact"
import Error from "../pages/Error";
import Job from "../pages/Job";
import Users from "../pages/Users";
import Login from "../pages/Login";
import PrivateRoute from "../components/PrivateRoute";
import UpdateUser from "../pages/Users/UpdateUser";

const Index = () => {
  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/job" element={<Job />} />           
          <Route path="/users" element={<PrivateRoute props={<Users />} />} /> 
          <Route path="/users/update-user/:id" element={<UpdateUser /> } /> 
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="*" element={<Error />} /> 
        </Routes>
    </>
  )
}

export default Index
