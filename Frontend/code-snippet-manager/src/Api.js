// import axios from "axios";

// const API_URL = "http://localhost:8000/api/";

// export const getSnippets = () => axios.get(`${API_URL}snippets/`);
// export const createSnippet = (snippetData) =>
//   axios.post(`${API_URL}snippets/`, snippetData);
// export const updateSnippet = (id, snippetData) =>
//   axios.put(`${API_URL}snippets/${id}/`, snippetData);
// export const deleteSnippet = (id) => axios.delete(`${API_URL}snippets/${id}/`);
// export const generateTags = (code) =>
//   axios.post(`${API_URL}generate-tags/`, { code });
// export const codeSuggestion = (partialCode) =>
//   axios.post(`${API_URL}code-suggestion/`, { partial_code: partialCode });

// export default API_URL;

import axios from "axios";

// Base URL for your Django backend
const BASE_URL = "http://127.0.0.1:8000/api/";

// Basic Authentication credentials
const username = "orban"; // Replace with actual username
const password = "orban"; // Replace with actual password

// Encode credentials to Base64
const basicAuth = `Basic ${btoa(`${username}:${password}`)}`;

// Create an Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: basicAuth, // Include Basic Auth header
    "Content-Type": "application/json",
  },
});

// Function to fetch all snippets
export const fetchSnippets = async () => {
  try {
    const response = await apiClient.get("snippets/"); // Endpoint for snippets
    return response.data;
  } catch (error) {
    console.error("Error fetching snippets:", error);
    throw error;
  }
};

// Function to add a new snippet
export const createSnippet = async (snippetData) => {
  try {
    const response = await apiClient.post("snippets/", snippetData);
    return response.data;
  } catch (error) {
    console.error("Error creating snippet:", error);
    throw error;
  }
};

// Function to update a snippet
export const updateSnippet = async (snippetId, snippetData) => {
  try {
    const response = await apiClient.put(`snippets/${snippetId}/`, snippetData);
    return response.data;
  } catch (error) {
    console.error("Error updating snippet:", error);
    throw error;
  }
};

// Function to delete a snippet
export const deleteSnippet = async (snippetId) => {
  try {
    const response = await apiClient.delete(`snippets/${snippetId}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting snippet:", error);
    throw error;
  }
};
