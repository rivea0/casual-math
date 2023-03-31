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
  // For doing the fetching only on updates, not when the component has mounted
  const isInitialMount = useRef(true);

  const options = {
    simplify: { name: 'Simplify', id: 0 },
    factor: { name: 'Factor', id: 1 },
    derive: { name: 'Derive', id: 2 },
    integrate: { name: 'Integrate', id: 3 },
    zeroes: { name: 'Find 0\'s', id: 4 },
    tangent: { name: 'Find Tangent Line', id: 5 },
    area: { name: 'Find Area Under Curve', id: 6 },
  };

  function handleOptionClick(e) {
    setTextState([`Type equation to ${options[e.target.id].name.toLowerCase()}:`]);
    setOption(e.target.id);

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
    if (e.keyCode === 13) { // if it is the enter key
      setEquation(e.target.value);
    }
  }

  function handleButtonClick(e) {
    setEquation(e.target.previousElementSibling.value);
  }

  useEffect(() => {
    const url = `https://newton.now.sh/api/v2/${option}/${encodeURIComponent(equation)}`;
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      console.log('starting fetch');
      fetch(url)
        .then(res => res.json())
        .then(data => setResult(data.result))
        .catch(err => console.log(err));
    }
  }, [equation]);

  console.log(equation, 'here equation');
  console.log(result, 'here result of ', option);

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
          <Text innerText={textState} handleEnterClick={handleEnterClick} handleButtonClick={handleButtonClick} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
