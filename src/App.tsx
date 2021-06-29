import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Detail from '@/container/detail';
import PlayList from './container/play-list';
import { RootState } from './redux';
// import styles from './App.module.scss';

function App() {
  const { currentSongId, playerList, playerModel } = useSelector((state: RootState) => state.player);
  useEffect(() => {
    const handleMove = (ev: TouchEvent) => {
      ev.preventDefault();
    };
    document.body.addEventListener('touchmove', handleMove, { passive: false });
    return () => {
      document.body.removeEventListener('touchmove', handleMove);
    };
  }, []);

  const renderComponent = useMemo(() => {
    if (currentSongId) {
      return <Detail />;
    } else {
      return <PlayList />;
    }
  }, [currentSongId]);

  return <>{renderComponent}</>;
}

export default App;
