// import React, { useState } from "react";
// import { generateTags, createSnippet } from "../Api";
// import '../App.css'

// function AddSnippet() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [code, setCode] = useState("");
//   const [tags, setTags] = useState([]);

//   const handleTagGeneration = () => {
//     generateTags(code).then((response) => setTags(response.data.tags));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const snippetData = { title, description, code, tags };
//     createSnippet(snippetData).then(() => {
//       setTitle("");
//       setDescription("");
//       setCode("");
//       setTags([]);
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type='text'
//         placeholder='Title'
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         required
//       />
//       <textarea
//         placeholder='Description'
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         required
//       ></textarea>
//       <textarea
//         placeholder='Code'
//         value={code}
//         onChange={(e) => setCode(e.target.value)}
//         required
//       ></textarea>
//       <button type='button' onClick={handleTagGeneration}>
//         Generate Tags
//       </button>
//       <div>
//         {tags.map((tag, index) => (
//           <span key={index} className='tag'>
//             {tag}
//           </span>
//         ))}
//       </div>
//       <button type='submit'>Add Snippet</button>
//     </form>
//   );
// }

// export default AddSnippet;
