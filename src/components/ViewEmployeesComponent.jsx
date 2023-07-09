import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthUser from "../JWTAuthentication/AuthUser";

export default function ViewEmployeesComponent() {
  const [user, setUser] = useState({
    empFirstName: "",
    empLastName: "",
    empEmailID: "",
  });

  const { empID } = useParams();
  const { getToken } = AuthUser();

  useEffect(() => {
    loadUser();
  }, []);

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
          <h2 className="text-center m-4">User Details</h2>

          <div className="card">
            <div className="card-header">
              Details of user id : {user.empID}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Employee First Name: </b>
                  {user.empFirstName}
                </li>
                <li className="list-group-item">
                  <b>Employee Last Name: </b>
                  {user.empLastName}
                </li>
                <li className="list-group-item">
                  <b>Employee EmailID: </b>
                  {user.empEmailID}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/list"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}