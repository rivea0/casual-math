import { useState } from 'react'
import Header from './components/Header';
import Option from './components/Option';
import Text from './components/Text';
import Calculator from './components/Calculator';
import Footer from './components/Footer';


export default function App() {

  const initialTextState = ['1. Select an option', '2. Type the equation', '3. Click enter (⏎) to get the result'];
  const [textState, setTextState] = useState(initialTextState);
  const [equation, setEquation] = useState('');
  const [option, setOption] = useState('');


  function handleOptionClick(e) {
    let outsiders = {
      'zeroes': 'find 0\'s',
      'tangentLine': 'find tangent line',
      'areaUnderCurve': 'find area under curve'
    }

    let role = Object.keys(outsiders).includes(e.target.id) ? outsiders[e.target.id] : e.target.id;

    setTextState([`Type equation to ${role}`]);
    setOption(e.target.id);

    for (let i of document.querySelector('#options').childNodes) {
      if (i.id === e.target.id) {
        i.classList.add('active');
      } else if ([...i.classList].includes('active')) {
        i.classList.remove('active');
      }
    }
  }

  function handleButtonClick(e) {
    if (!option) {
      setTextState([...initialTextState]);
      return;
    }


    if (e.target.id === 'all-clear') {
      setEquation('');
      setTextState('');
      return;
    }

    if (e.target.id === 'backspace') {
      setEquation(prevEq => prevEq.slice(0, prevEq.length - 1));
      setTextState(prevTextState => prevTextState.slice(0, prevTextState.length - 1));
      return;
    }

    if (e.target.id === 'pi') {
      setEquation(prevEq => `${prevEq}${Math.PI}`);
      setTextState(prevTextState => {
        console.log(prevTextState)
       return (
        (Array.isArray(prevTextState) && prevTextState[0].slice(-3) === '...') ?
        Math.PI : `${prevTextState}${Math.PI}`
        );
      });
      return;
    }

    if (e.target.id === 'e') {
      setEquation(prevEq => `${prevEq}${Math.E}`);
      setTextState(prevTextState => {
        console.log(prevTextState)
       return (
        (Array.isArray(prevTextState) && prevTextState[0].slice(-3) === '...') ?
        Math.E : `${prevTextState}${Math.E}`
        );
      });
      return;
    }

    setEquation(prevEq => `${prevEq}${e.target.id}`);
    setTextState(prevTextState => {
      console.log(prevTextState)
     return (
      (Array.isArray(prevTextState) && prevTextState[0].slice(-3) === '...') ?
      e.target.id : `${prevTextState}${e.target.id}`
      );
    });
  }

  function resetText() {
    setOption('');
    setTextState([...initialTextState]);
  }

  function handleChange(e) {
    setTextState(e.target.value);

  }

  return (
    <div className="App">
      <Header onClick={resetText}/>
      <div className="container">
        <div id="options">
          <Option name="Simplify" id="simplify" onClick={handleOptionClick} />
          <Option name="Factor" id="factor" onClick={handleOptionClick} />
          <Option name="Derive" id="derive" onClick={handleOptionClick} />
          <Option name="Integrate" id="integrate" onClick={handleOptionClick} />
          <Option name="Find 0's" id="zeroes" onClick={handleOptionClick} />
          <Option name="Find Tangent Line" id="tangentLine" onClick={handleOptionClick} />
          <Option name="Find Area Under Curve" id="areaUnderCurve" onClick={handleOptionClick} />
        </div>
        <div className="calc-area">
          <Text innerText={textState} textValue={textState} handleChange={handleChange} />
          <Calculator handleClick={handleButtonClick}/>
        </div>
      </div>
      <Footer />
    </div>
  )
}
