import React, { useState } from 'react';
import axios from 'axios';

const UpdateForm = ({ testCase, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: testCase.name,
    estimate_time: testCase.estimate_time,
    module: testCase.module,
    priority: testCase.priority,
    status: testCase.status,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/testcases/${testCase.id}`, formData)
      .then(response => {
        onUpdate(response.data);
      })
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input name="estimate_time" value={formData.estimate_time} onChange={handleChange} placeholder="Estimate Time" />
      <input name="module" value={formData.module} onChange={handleChange} placeholder="Module" />
      <input name="priority" value={formData.priority} onChange={handleChange} placeholder="Priority" />
      <input name="status" value={formData.status} onChange={handleChange} placeholder="Status" />
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateForm;
