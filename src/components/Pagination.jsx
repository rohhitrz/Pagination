import React, { useState, useEffect } from "react";
import "./Pagination.module.css"

const PaginationComponent = () => {
  const [employee, setEmployee] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
        if (!response.ok) {
          throw new Error("failed to fetch data");
          alert("failed to fetch data");
        }
        const jsonResponse = await response.json();
        // console.log(jsonResponse);

        setEmployee(jsonResponse);
      } catch (e) {
        console.error(e.message);
        alert("failed to fetch data");
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(employee.length / rowPerPage);
  const indexOfLastRow = currentPage * 10;
  const indexOfFirstRow = indexOfLastRow - rowPerPage;
  const currentEmployees = employee.slice(indexOfFirstRow, indexOfLastRow);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <h1>Employee Data</h1>
      <table>
        <thead>
          <tr className="table-head">
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-container">
        <button id="prevButton" onClick={handlePrev} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="page-number">{currentPage}</span>
        <button id="nextButton" onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationComponent;
