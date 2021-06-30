import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import Detail from '@/container/detail';
import PlayList from './container/play-list';
import { RootState } from './redux';
import './App.scss';

function App() {
  const { app } = useSelector((state: RootState) => state);
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
    if (app.songDetailVisible) {
      return (
        <CSSTransition in={app.songDetailVisible} timeout={200} classNames="alert">
          <Detail />
        </CSSTransition>
      );
    } else {
      return <PlayList />;
    }
  }, [app.songDetailVisible]);

  return <>{renderComponent}</>;
}

export default App;
