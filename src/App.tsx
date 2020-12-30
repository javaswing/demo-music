import React, { useCallback, useMemo, useState } from 'react';
import './App.scss';

// 使用React.memo来优化子组件的render
const Child = React.memo((props: { style?: React.CSSProperties; onClick: React.ComponentProps<'h1'>['onClick'] }) => {
  const { style, onClick } = props;
  console.log('触发Child组件渲染');
  return (
    <h1 style={style} onClick={onClick}>
      这是child组件的渲染内容！
    </h1>
  );
});

function App() {
  const [num, setNum] = useState(0);
  const styleObj = useMemo(() => ({ color: 'green' }), []); // 可以使用useMemo来防止styleObj的重新生成优化子组件render
  // const handleClick = (e: React.MouseEvent<HTMLElement>) => { 这样子写也会触发子组件的render
  //   console.log('handleClick');
  // };
  const handleClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    // 使用useCallback可以避免子组件渲染
    console.log('handleClick');
  }, []);
  return (
    <>
      {num}
      <button onClick={() => setNum(num + 1)}>num加1</button>
      <Child style={styleObj} onClick={handleClick} />
      {/* 直接使用匿名函数一样会导致子组件render */}
      {/* <Child style={styleObj} onClick={() => handleClick} /> */}
    </>
  );
}

export default App;
