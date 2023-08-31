import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function App() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get('https://fugk2m8ox2.execute-api.ap-south-1.amazonaws.com/dev/api/lookups?type=user')
      .then(res => {
        setRecords(res.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <div className="text-end">
        <Link to="/create" className="btn btn-primary">
          Add
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((d, i) => (
            <tr key={i}>
              <td>{d.id}</td>
              <td>{d.username}</td>
              <td>{d.email_id}</td>
              <td>
                <Link to={`/update/${d.id}`} className="btn btn-sm btn-success">
                  Update
                </Link>
                <Link to={`/delete/${d.id}`} className="btn btn-sm btn-danger">
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
