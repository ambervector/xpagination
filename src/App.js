import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [employeeData, setEmployeeData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  // Calculate the indexes of the items to be displayed on the current page
  const indexOfLastItem = pageNumber * 10;
  const indexOfFirstItem = indexOfLastItem - 10;
  const currentItems = employeeData.slice(indexOfFirstItem, indexOfLastItem);

  const getEmployeeDetails = async () => {
    try {
      const res = await fetch(
        `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
      );
      const data = await res.json();
      setEmployeeData(data);
    } catch (err) {
      alert("Failed to fetch data");
    }
  };

  useEffect(() => {
    getEmployeeDetails();
  }, []);

  const previousHandler = () => {
    if (pageNumber === 1) {
      return;
    } else {
      setPageNumber((prevState) => prevState - 1);
    }
  };

  const nextHandler = () => {
    if (pageNumber === 5) {
      return;
    } else {
      setPageNumber((prevState) => prevState + 1);
    }
  };
  return (
    <div className="container">
      <h1>Empoyee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((employee) => {
            return (
              <tr key={employee.id}>
                <th scope="row">{employee.id}</th>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="actionBtns">
        <button onClick={previousHandler}>Previous</button>
        <span>{pageNumber}</span>
        <button onClick={nextHandler}>Next</button>
      </div>
    </div>
  );
}

export default App;
