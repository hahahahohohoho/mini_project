import React from 'react';

function InfoPanel({ selectedSight }) {
  if (!selectedSight) return null;

  return (
    <div>
      <h3>{selectedSight.title}</h3>
      <p>{selectedSight.content}</p>
      <a href={selectedSight.homepage} target="_blank" rel="noopener noreferrer">
        자세히 보기
      </a>
    </div>
  );
}

export default InfoPanel;
