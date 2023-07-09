import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthUser from "../JWTAuthentication/AuthUser";

export default function CreateEmployeesComponent() {
  let navigate = useNavigate();
  const { getToken } = AuthUser();
  const [user, setUser] = useState({
    empFirstName: "",
    empLastName: "",
    empEmailID: "",
  });

  const { empFirstName, empLastName, empEmailID } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const tokenheader = getToken();
    const finaltoken = tokenheader.replace(/(^"|"$)/g, '');
    const headers =
    {
      'Authorization': 'Bearer ' + finaltoken
    };
    axios.post("http://localhost:8080/api/v1/employees", user, { headers });
    navigate('/list');
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register Employee</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Employee First Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Employee First Name"
                name="empFirstName"
                value={empFirstName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Employee Last Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Employee Last Name"
                name="empLastName"
                value={empLastName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Enter Employee Email ID
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Employee Email address"
                name="empEmailID"
                value={empEmailID}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}