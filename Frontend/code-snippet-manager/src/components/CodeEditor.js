import React, { useState } from "react";
import { codeSuggestion } from "../Api";

function CodeEditor() {
  const [partialCode, setPartialCode] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const handleSuggestion = () => {
    codeSuggestion(partialCode).then((response) =>
      setSuggestion(response.data.suggestion)
    );
  };

  return (
    <div>
      <textarea
        placeholder='Type some code...'
        value={partialCode}
        onChange={(e) => setPartialCode(e.target.value)}
      ></textarea>
      <button type='button' onClick={handleSuggestion}>
        Get Code Suggestion
      </button>
      <pre>{suggestion}</pre>
    </div>
  );
}

export default CodeEditor;
