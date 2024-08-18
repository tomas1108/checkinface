// src/CustomerTable.js
import React, { useEffect, useState } from 'react';
import { ref, onValue } from "firebase/database";
import { database } from './firebase';
import * as XLSX from 'xlsx';
const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Reference to the 'CustomerJoin' table in Firebase
    const customerRef = ref(database, 'CustomerJoin');

    // Fetch data from Firebase in real-time
    onValue(customerRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const customerList = Object.keys(data).map((key, index) => ({
          stt: index + 1,
          name: data[key].name,
          timestamp: data[key].timestamp,
        }));
        setCustomers(customerList);
      }
    });
  }, []);


  // Function to export data to Excel
  const exportToExcel = () => {
    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(customers);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Customers');

    // Export the workbook to an Excel file
    XLSX.writeFile(workbook, 'CustomerCheckin.xlsx');
  };


  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '20px',
  };

  const buttonHoverStyle = {
    backgroundColor: '#45a049',
  };

  return (
    <div>
      <h1>CUSTOMER CHECKIN TABLE</h1>
      
      <table border="1">
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Checkin Time</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.stt}</td>
              <td>{customer.name}</td>
              <td>{customer.timestamp}</td>
            </tr>
          ))}
        </tbody>
        
      </table>
      <button
        style={buttonStyle}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
        onClick={exportToExcel}
      >
        Export to Excel
      </button>
    </div>
  );
};

export default CustomerTable;
