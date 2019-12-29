import React from 'react';
//import logo from './logo.svg'
import './App.css';
import Region from './Region';

function Head(props) {
  return (
    <div>
      <h1>전국 대기오염 지수 확인 서비스</h1>
      <p>이 사이트는 선택한 지역의 대기오염 지수를 알려줍니다.</p>
      <p>I like {props.fav}</p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className = "App-header">
        <Head fav="se"/>
        <Region />
      </header>
    </div>
  );
}

export default App;
