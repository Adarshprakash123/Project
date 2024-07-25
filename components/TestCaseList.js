import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import UpdateForm from './UpdateForm';

const socket = io('http://localhost:5000');

const TestCaseList = () => {
  const [testCases, setTestCases] = useState([]);

  useEffect(() => {
    axios.get('/api/testcases')
      .then(response => setTestCases(response.data))
      .catch(error => console.error(error));

    socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    socket.on('update', (updatedTestCase) => {
      setTestCases(prevTestCases => 
        prevTestCases.map(testCase => 
          testCase.id === updatedTestCase.id ? updatedTestCase : testCase
        )
      );
    });

    return () => {
      socket.off('connect');
      socket.off('update');
    };
  }, []);

  const handleUpdate = (updatedTestCase) => {
    setTestCases(prevTestCases => 
      prevTestCases.map(testCase => 
        testCase.id === updatedTestCase.id ? updatedTestCase : testCase
      )
    );
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Estimate Time</th>
            <th>Module</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {testCases.map((testCase, index) => (
            <tr key={index}>
              <td>{testCase.name}</td>
              <td>{testCase.estimate_time}</td>
              <td>{testCase.module}</td>
              <td>{testCase.priority}</td>
              <td>{testCase.status}</td>
              <td>
                <UpdateForm testCase={testCase} onUpdate={handleUpdate} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestCaseList;
