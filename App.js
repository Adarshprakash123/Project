import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [testCases, setTestCases] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/testcases')
            .then(response => setTestCases(response.data))
            .catch(error => console.error(error));
    }, []);

    const updateStatus = (id, status) => {
        axios.put(`http://localhost:5000/testcases/${id}`, { status })
            .then(response => {
                const updatedTestCases = testCases.map(tc => 
                    tc.id === id ? { ...tc, status: response.data.status } : tc
                );
                setTestCases(updatedTestCases);
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="App">
            <div className="search-bar">
                <input type="text" placeholder="Search issue..." />
                <button className="search-button">🔍</button>
            </div>
            <div className="testcase-table">
                <table>
                    <thead>
                        <tr>
                            <th>Test Case Name</th>
                            <th>Estimate Time</th>
                            <th>Module</th>
                            <th>Priority</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testCases.map(tc => (
                            <tr key={tc.id}>
                                <td>{tc.name}</td>
                                <td>{tc.estimate_time}</td>
                                <td>{tc.module}</td>
                                <td>{tc.priority}</td>
                                <td>
                                    <select value={tc.status} onChange={(e) => updateStatus(tc.id, e.target.value)}>
                                        <option value="Select">Select</option>
                                        <option value="PASS">PASS</option>
                                        <option value="FAIL">FAIL</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;
