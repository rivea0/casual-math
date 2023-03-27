import { useState } from 'react'
import Header from './components/Header';
import Option from './components/Option';
import Text from './components/Text';
import Calculator from './components/Calculator';
import Footer from './components/Footer';
import './App.css';


export default function App() {

  const initialTextState = ['1. Select an option', '2. Type the equation', '3. Click enter (⏎) to get the result'];
  const [textState, setTextState] = useState(initialTextState);

  function handleSimplifyClick() {
    setTextState(['Type equation to simplify...']);
  }

  function handleFactorClick() {
    setTextState(['Type equation to factor...']);
  }

  function handleDeriveClick() {
    setTextState(['Type equation to derive...']);
  }

  function handleIntegrateClick() {
    setTextState(['Type equation to integrate...']);
  }

  function handleFindZeroesClick() {
    setTextState(['Type equation to find 0\'s...']);
  }

  function handleTangentLineClick() {
    setTextState(['Type equation to find tangent line...']);
  }

  function handleAreaUnderCurveClick() {
    setTextState(['Type equation to find area under curve...']);
  }


  return (
    <div className="App">
      <Header onClick={() => setTextState([...initialTextState])} />
      <div className="container">
        <div id="options">
          <Option name="Simplify" onClick={handleSimplifyClick} />
          <Option name="Factor" onClick={handleFactorClick} />
          <Option name="Derive" onClick={handleDeriveClick} />
          <Option name="Integrate" onClick={handleIntegrateClick} />
          <Option name="Find 0's" onClick={handleFindZeroesClick} />
          <Option name="Find Tangent Line" onClick={handleTangentLineClick} />
          <Option name="Find Area Under Curve" onClick={handleAreaUnderCurveClick} />
        </div>
        <div className="calc-area">
          <Text innerText={textState}/>
          <Calculator />
        </div>
      </div>
      <Footer />
    </div>
  )
}
