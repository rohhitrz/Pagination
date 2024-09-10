// import React, { useEffect, useState } from "react";

// export default function EmployeeTable() {
//   const [employee, setEmployees] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [error, setError] = useState(null);
//   const itemsPerPage=10;

//   const API =
//     "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
//   useEffect(() => {
   
//     fetchEmployees();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       const response = await fetch(API);
//       if (!response.ok) {
//         throw new Error("Failed to fetch Data");
//       }
//       const data = response.json();
//       setEmployees(data);
//     } catch (error) {
//       setError(error);
//       alert("Failed to fetch data");
//     }
//   };

//   const indexOfLastItem= currentPage*10;
//   const indexOfFirstItem=indexOfLastItem-itemsPerPage;
//   const currentItems=employee.slice(indexOfFirstItem,indexOfLastItem);
//   const totalPages= Math.ceil(employee.length/itemsPerPage);

//   const handlePrev=()=>{
//     setCurrentPage((prev)=>Math.max(prev-1,1));
// }

// const handleNext=()=>{
//   setCurrentPage((prev)=>Math.min(prev+1,totalPages));
// }

// return (

//   <div className="container">
//     <h1>Employee Data Table</h1>







//   </div>



// )










// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../src/App.css"

const API_URL = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const EmployeeData = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const employeesPerPage = 10;

  useEffect(() => {
    // Fetch employee data
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        setEmployees(response.data);
        setError(false);
      } catch (err) {
        setError(true);
        alert("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // Pagination logic
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const totalPages = Math.ceil(employees.length / employeesPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container">
      <h1>Employee Data Table</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr className="table-header">
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.length > 0 ? (
                currentEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No employees found</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="pagination">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Previous
            </button>
            <span className="page-number">Page {currentPage}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {error && <p>There was an error fetching data. Please try again later.</p>}
    </div>
  );
};

export default EmployeeData;
