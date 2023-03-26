import { useState } from 'react'
import Header from './components/Header';
import Options from './components/Options';
import Text from './components/Text';
import Calculator from './components/Calculator';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Options /> 
        <div className="calc-area">
          <Text />
          <Calculator />
        </div>
      </div>

    </div>
  )
}

