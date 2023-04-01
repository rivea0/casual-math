import { useEffect, useState, useRef } from 'react';
import Header from './components/Header';
import Option from './components/Option';
import Text from './components/Text';
import Footer from './components/Footer';

export default function App() {
  const initialTextState = ['1. Select an option', '2. Type the equation', '3. Click enter (⏎) to get the result'];
  const [textState, setTextState] = useState(initialTextState);
  const [equation, setEquation] = useState('');
  const [option, setOption] = useState('');
  const [result, setResult] = useState('');
  const [lockedResultArea, setLockedResultArea] = useState(false);
  // For doing the fetching only on updates, not when the component has mounted
  const isInitialMount = useRef(true);

  const [equationValue, setEquationValue] = useState('');

  function handleChange(e) {
    setEquationValue(e.target.value);
  }

  const options = {
    simplify: { name: 'Simplify', id: 0 },
    factor: { name: 'Factor', id: 1 },
    derive: { name: 'Derive', id: 2 },
    integrate: { name: 'Integrate', id: 3 },
    zeroes: { name: 'Find 0\'s', id: 4 },
  };

  function handleOptionClick(e) {
    setTextState([`Type equation to ${options[e.target.id].name.toLowerCase()}:`]);
    setOption(e.target.id);
    setResult('');
    setEquationValue('');

    // For styling
    document.querySelector('.calc-area').style.gridTemplateRows = '1fr 1fr';

    for (const opt of document.querySelector('#options').childNodes) {
      if (opt.id === e.target.id) {
        opt.classList.add('opt-active');
      } else if ([...opt.classList].includes('opt-active')) {
        opt.classList.remove('opt-active');
      }
    }
  }

  function resetText() {
    setOption('');
    setTextState([...initialTextState]);

    // Clear styling
    document.querySelector('.calc-area').style.gridTemplateRows = '1fr';

    for (const opt of document.querySelector('#options').childNodes) {
      if ([...opt.classList].includes('opt-active')) {
        opt.classList.remove('opt-active');
      }
    }
  }

  function handleEnterClick(e) {
    setLockedResultArea(true);
    if (e.keyCode === 13) { // if it is the enter key
      if (e.target.value.includes('/')) {
        const cleanRes = e.target.value.replace('/', '(over)');
        setEquation(cleanRes);
      } else {
        setEquation(e.target.value);
      }
    }
  }

  function handleButtonClick(e) {
    setLockedResultArea(true);
    if (e.target.previousElementSibling.value.includes('/')) {
      const cleanRes = e.target.previousElementSibling.value.replace('/', '(over)');
      setEquation(cleanRes);
    } else {
      setEquation(e.target.previousElementSibling.value);
    }
  }

  const resultArea = document.createElement('div');

  useEffect(() => {
    let ignore = false;
    const url = `https://newton.now.sh/api/v2/${option}/${encodeURIComponent(equation)}`;
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      console.log('starting fetch');
      fetch(url)
        .then(res => res.json())
        .then(data => {
          if (!ignore) {
            if (!lockedResultArea) {
              document.querySelector('.calc-area').appendChild(resultArea);
              setLockedResultArea(true);
            }
            setResult(data.result);
            resultArea.textContent = result;
            setLockedResultArea(false);
          }
        })
        .catch(err => console.log(err));
    }
    return () => {
      ignore = true;
    };
  }, [equation]);

  console.log(equation, 'here equation');
  // console.log(result, 'here result of ', option);

  return (
    <div className="App">
      <Header onClick={resetText} />
      <div className="container">
        <div id="options">
          {
            Object.entries(options).map(([k, val]) => (
              <Option key={val.id} name={val.name} id={k} onClick={handleOptionClick} />))
          }
        </div>
        <div className="calc-area">
          <Text innerText={textState} handleEnterClick={handleEnterClick} handleButtonClick={handleButtonClick} handleChange={handleChange} equationValue={equationValue} content={result} optionValue={option} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
