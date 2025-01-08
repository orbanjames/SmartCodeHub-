// import React, { useState, useEffect } from "react";
// import "../Api";
// import axios from "axios";
// import "../styles.css";

// const SnippetListPage = () => {
//   const [snippets, setSnippets] = useState([]);
//   const [newSnippet, setNewSnippet] = useState({
//     title: "",
//     code: "",
//     description: "",
//     language: "",
//     tags: [],
//   });

//   // Fetch all snippets from the backend
//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/api/snippets/")
//       .then((response) => setSnippets(response.data))
//       .catch((error) => console.error("Error fetching snippets:", error));
//   }, []);

//   // Handle create new snippetets/
//   const handleCreateSnippet = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/snippets/",
//         newSnippet
//       );
//       setSnippets([...snippets, response.data]);
//       setNewSnippet({
//         title: "",
//         code: "",
//         description: "",
//         language: "",
//         tags: [],
//       }); // reset form
//     } catch (error) {
//       console.error("Error creating snippet:", error);
//     }
//   };

//   // Handle delete snippet
//   const handleDeleteSnippet = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8000/api/snippets/${id}/`);
//       setSnippets(snippets.filter((snippet) => snippet.id !== id));
//     } catch (error) {
//       console.error("Error deleting snippet:", error);
//     }
//   };

//   // Handle update snippet
//   const handleUpdateSnippet = async (id, updatedSnippet) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:8000/api/snippets/${id}/`,
//         updatedSnippet
//       );
//       setSnippets(
//         snippets.map((snippet) => (snippet.id === id ? response.data : snippet))
//       );
//     } catch (error) {
//       console.error("Error updating snippet:", error);
//     }
//   };

//   // Handle tag generation (connected to the backend logic)
//   const handleTagGeneration = async (snippetCode) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/generate-tags/",
//         { code: snippetCode }
//       );
//       setNewSnippet((prevState) => ({ ...prevState, tags: response.data }));
//     } catch (error) {
//       console.error("Error generating tags:", error);
//     }
//   };

//   return (
//     <div className='snippet-list-page'>
//       <h1>Code Snippets</h1>

//       <div className='new-snippet-form'>
//         <textarea
//           value={newSnippet.code}
//           onChange={(e) =>
//             setNewSnippet({ ...newSnippet, code: e.target.value })
//           }
//           placeholder='Enter your code here'
//         />
//         <input
//           type='text'
//           value={newSnippet.description}
//           onChange={(e) =>
//             setNewSnippet({ ...newSnippet, description: e.target.value })
//           }
//           placeholder='Enter description'
//         />
//         <input
//           type='text'
//           value={newSnippet.title}
//           onChange={(e) =>
//             setNewSnippet({ ...newSnippet, title: e.target.value })
//           }
//           placeholder='Enter title'
//         />
//         <input
//           type='text'
//           value={newSnippet.language}
//           onChange={(e) =>
//             setNewSnippet({ ...newSnippet, language: e.target.value })
//           }
//           placeholder='Enter language'
//         />
//         <button onClick={() => handleTagGeneration(newSnippet.code)}>
//           Generate Tags
//         </button>
//         <button onClick={handleCreateSnippet}>Add Snippet</button>
//       </div>

//       <table className='snippet-table'>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Code</th>
//             <th>Language</th>
//             <th>Tags</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {snippets.map((snippet) => (
//             <tr key={snippet.id}>
//               <td>{snippet.title}</td>
//               <td>{snippet.description}</td>
//               <td>{snippet.code}</td>
//               <td>{snippet.language}</td>
//               <td>{snippet.tags.join(", ")}</td>
//               <td>
//                 <button
//                   onClick={() =>
//                     handleUpdateSnippet(snippet.id, {
//                       title: snippet.title,
//                       description: snippet.description,
//                       code: snippet.code,
//                       language: snippet.language,
//                     })
//                   }
//                 >
//                   Update
//                 </button>
//                 <button onClick={() => handleDeleteSnippet(snippet.id)}>
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SnippetListPage;


import React, { useEffect, useState } from "react";
import {
  fetchSnippets,
  createSnippet,
  updateSnippet,
  deleteSnippet,
} from "../Api"; // Ensure these functions are implemented correctly
import "../styles.css";

const SnippetListPage = () => {
  const [snippets, setSnippets] = useState([]);
  const [error, setError] = useState(null);

  // Fetch snippets on component mount
  useEffect(() => {
    const getSnippets = async () => {
      try {
        const data = await fetchSnippets(); // Ensure it returns an array of snippets
        setSnippets(data);
      } catch (err) {
        setError(err.message);
      }
    };
    getSnippets();
  }, []);

  const handleAddSnippet = async () => {
    const newSnippet = {
      title: "New Snippet",
      description: "Javascript snippet",
      code: 'console.log("Hello World!");',
      language: "javascript",
    };
    try {
      const addedSnippet = await createSnippet(newSnippet);
      setSnippets([...snippets, addedSnippet]);
    } catch (err) {
      console.error("Error adding snippet:", err);
    }
  };

  const handleUpdateSnippet = async (snippetId) => {
    const updatedData = {
      title: "Updated Snippet",
      description: "Snippet Update",
      code: 'console.log("Updated Code!")',
      language: "javascript",
    };
    try {
      const updatedSnippet = await updateSnippet(snippetId, updatedData);
      setSnippets(
        snippets.map((snippet) =>
          snippet.id === snippetId ? updatedSnippet : snippet
        )
      );
    } catch (err) {
      console.error("Error updating snippet:", err);
    }
  };

  const handleDeleteSnippet = async (snippetId) => {
    try {
      await deleteSnippet(snippetId);
      setSnippets(snippets.filter((snippet) => snippet.id !== snippetId));
    } catch (err) {
      console.error("Error deleting snippet:", err);
    }
  };

  const handleGenerateTags = async (snippetId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/snippets/${snippetId}/generate-tags/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa("orban:orban")}`, // Basic Auth
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to generate tags: ${response.statusText}`);
      }

      const updatedSnippet = await response.json();
      setSnippets(
        snippets.map((snippet) =>
          snippet.id === snippetId ? updatedSnippet : snippet
        )
      );
    } catch (err) {
      console.error("Error generating tags:", err);
    }
  };

  return (
    <div>
      <h1>Snippet List</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <button className='btn btn-primary' onClick={handleAddSnippet}>
        Add Snippet
      </button>
      <table border='1'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Code</th>
            <th>Language</th>
            <th>Tags</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {snippets.map((snippet) => (
            <tr key={snippet.id}>
              <td>{snippet.id}</td>
              <td>{snippet.title}</td>
              <td>{snippet.description}</td>
              <td>
                <pre>{snippet.code}</pre>
              </td>
              <td>{snippet.language}</td>
              <td>
                {Array.isArray(snippet.tags)
                  ? snippet.tags.join(", ")
                  : "No tags"}
              </td>
              <td>
                <button
                  className='btn btn-success'
                  onClick={() => handleUpdateSnippet(snippet.id)}
                >
                  Update
                </button>
                <button
                  className='btn btn-danger'
                  onClick={() => handleDeleteSnippet(snippet.id)}
                >
                  Delete
                </button>
                <button
                  className='btn btn-primary'
                  onClick={() => handleGenerateTags(snippet.id)}
                >
                  Generate Tags
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SnippetListPage;
