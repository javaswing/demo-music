import React, { useEffect } from 'react';
import Detail from './components/detail';
// import styles from './App.module.scss';

function App() {
  useEffect(() => {
    const handleMove = (ev: TouchEvent) => {
      ev.preventDefault();
    };
    document.body.addEventListener('touchmove', handleMove, { passive: false });
    return () => {
      document.body.removeEventListener('touchmove', handleMove);
    };
  }, []);

  return <Detail />;
}

export default App;
