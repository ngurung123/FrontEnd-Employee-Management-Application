import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AuthUser from "../JWTAuthentication/AuthUser";

export default function ListEmployeesComponent() {

  const { getToken } = AuthUser();
  console.log('this is the token inside the listemployeesComponent' + getToken());
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const { empID } = useParams();

  useEffect(() => {
    if (query.length === 0 || query.length > 2)
      loadUsers();
  }, [query]);

  const loadUsers = async () => {
    const finaltoken = getToken().replace(/(^"|"$)/g, '');
    console.log(finaltoken);

    const headers =
    {
      'Authorization': 'Bearer ' + finaltoken
    };
    const result = await axios.get("http://localhost:8080/api/v1/employees", { headers }

    );
    setUsers(result.data);
  };


  const deleteUser = async (empID) => {
    const finaltoken = getToken().replace(/(^"|"$)/g, '');
    console.log(finaltoken);

    const headers =
    {
      'Authorization': 'Bearer ' + finaltoken
    };
    await axios.delete(`http://localhost:8080/api/v1/employees/${empID}`, { headers });
    loadUsers();
  };

  return (
    <div className="container">
      <h2 className="text-center">Employee List</h2>
      <Link to="/add-employee">
        <button className='btn btn-primary'>
          Add User
        </button>
      </Link>
      {/* added beginning */}
      <div className="app"
        align="right">
        <input
          className="search"
          placeholder="Search..."
          align="right"
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
      </div>
      {/* added end */}
      <br></br>
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Employee First Name</th>
              <th scope="col">Employee Last Name</th>
              <th scope="col">Employee Email ID</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.filter(((asd) =>
              asd.empFirstName.toLowerCase().includes(query)
            )).map((user, index) => (
              <tr>
                <th scope="row" key={index.id}>
                  {index + 1}
                </th>
                <td>{user.empFirstName}</td>
                <td>{user.empLastName}</td>
                <td>{user.empEmailID}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/view-employee/${user.empID}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/edit-employee/${user.empID}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => { deleteUser(user.empID) }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
