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
    return (
      <CSSTransition timeout={300} in={app.songDetailVisible} unmountOnExit classNames="slide">
        <div className="top-view">
          <Detail />
        </div>
      </CSSTransition>
    );
  }, [app.songDetailVisible]);

  return (
    <>
      {renderComponent}
      <PlayList />
    </>
  );
}

export default App;
