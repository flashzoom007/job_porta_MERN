import React from 'react'
import { Link } from 'react-router-dom';
import { FaAngleLeft } from "react-icons/fa";

const Error = () => {
  return (
    <>
      <div className='main_class '>
        <span className='text-center'>
          <h1>404! not found</h1>
          <Link to='/' className="text-decoration-none">
            <button className="btn btn-outline-primary link-hover"> <FaAngleLeft /> Back To Home </button>
          </Link>
        </span>
      </div>

    </>
  )
}

export default Error
