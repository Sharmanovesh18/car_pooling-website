import React from 'react';
export default function StartControl({ onStart, onStop, running, disabled }){
  return (
    <div>
      { running ? (
        <button onClick={onStop}>Stop</button>
      ) : (
        <button onClick={onStart} disabled={disabled}>Start Navigation</button>
      )}
    </div>
  );
}
