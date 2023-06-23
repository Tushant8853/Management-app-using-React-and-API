import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import custom CSS styles

function App() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://reqres.in/api/users?page=2');
      setEmployees(response.data.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by first name"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <ul className="employee-list">
        {filteredEmployees.map((employee) => (
          <li key={employee.id} className="employee-item">
            <div className="employee-details">
              <div className="employee-id">{employee.id}</div>
              <img className="employee-avatar" src={employee.avatar} alt={employee.first_name} />
              <div className="employee-name">{employee.first_name}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
