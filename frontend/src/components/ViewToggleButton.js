import React from 'react';
import { useView } from '../context/ViewContext';

const ViewToggleButton = () => {
  const { viewMode, toggleView } = useView();

  return (
    <button onClick={toggleView} className="view-toggle-button">
      Ver como {viewMode === 'desktop' ? 'Mobile' : 'Desktop'}
    </button>
  );
};

export default ViewToggleButton;