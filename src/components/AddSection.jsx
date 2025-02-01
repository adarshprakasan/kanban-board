import React, { useState } from 'react';

const AddSection = ({ addSection }) => {
  const [sectionName, setSectionName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sectionName.trim()) {
      addSection(sectionName);
      setSectionName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add Section"
        value={sectionName}
        onChange={(e) => setSectionName(e.target.value)}
      />
      <button type="submit">+ Add Section</button>
    </form>
  );
};

export default AddSection;