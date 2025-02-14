import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home"
import Contact from "../pages/Contact"
import Error from "../pages/Error";
import Job from "../pages/Job";
import Users from "../pages/Users";
import Login from "../pages/Login";
import PrivateRoute from "../components/PrivateRoute";
import UpdateUser from "../pages/Apis/UpdateUser";
import Chart from "../pages/Chart";
import JobCreate from "../pages/JobCreate";
import YoutubePlaylist from "../pages/RandomPages/YoutubePlaylist";
import CompanyName from "../pages/Company/Name";
import CompanyProfile from "../pages/Company/Profile";

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
          <Route path="/chart" element={<Chart />} /> 
          <Route path="/job-create" element={<JobCreate />} /> 
          <Route path="/youtube-playlist" element={<YoutubePlaylist />} /> 
          <Route path="/company-name" element={<CompanyName />} /> 
          <Route path="/company-profile" element={<CompanyProfile />} /> 
          <Route path="*" element={<Error />} /> 
        </Routes>
    </>
  )
}

export default Index
