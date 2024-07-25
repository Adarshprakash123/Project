import axios from 'axios';

const API_URL = 'http://localhost:5000/api/test-cases'; // Backend URL

const getAllTestCases = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const updateTestCase = async (id, testCase) => {
  await axios.put(`${API_URL}/${id}`, testCase);
};

const deleteTestCase = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export default {
  getAllTestCases,
  updateTestCase,
  deleteTestCase
};
