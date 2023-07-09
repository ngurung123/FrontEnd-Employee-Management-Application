import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthUser from "../JWTAuthentication/AuthUser";

export default function EditEmployees() {
  let navigate = useNavigate();
  const { getToken } = AuthUser();

  const { empID } = useParams();

  const [user, setUser] = useState({
    empFirstName: "",
    empLastName: "",
    empEmailID: "",
  });

  const { empFirstName, empLastName, empEmailID } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const tokenheader = getToken();
    const finaltoken = tokenheader.replace(/(^"|"$)/g, '');
    const headers =
    {
      'Authorization': 'Bearer ' + finaltoken
    };
    await axios.put(`http://localhost:8080/api/v1/employees/${empID}`, user, { headers });
    navigate("/list");
  };


  const loadUser = async () => {
    const tokenheader = getToken();
    const finaltoken = tokenheader.replace(/(^"|"$)/g, '');
    const headers =
    {
      'Authorization': 'Bearer ' + finaltoken
    };
    const result = await axios.get(`http://localhost:8080/api/v1/employees/${empID}`, { headers });
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Employee First Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your name"
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
                placeholder="Enter your username"
                name="empLastName"
                value={empLastName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Employee Email ID
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your e-mail address"
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