import { useEffect, useState, useRef } from 'react';
import Header from './components/Header';
import Option from './components/Option';
import Text from './components/Text';
import Calculator from './components/Calculator';
import Footer from './components/Footer';

export default function App() {
  const initialTextState = ['1. Select an option', '2. Type the equation', '3. Click enter (⏎) to get the result'];
  const [textState, setTextState] = useState(initialTextState);
  const [equation, setEquation] = useState(''); // For the api call, should be formatted differently than textState
  const [option, setOption] = useState('');
  const [eqFinal, setEqFinal] = useState('');
  const [simplifyEqResult, setSimplifyEqResult] = useState('');
  const isInitialMount = useRef(true);

  function handleOptionClick(e) {
    const outsiders = {
      zeroes: 'find 0\'s',
      tangentLine: 'find tangent line',
      areaUnderCurve: 'find area under curve',
    };

    const role = Object.keys(outsiders).includes(e.target.id) ? outsiders[e.target.id] : e.target.id;

    setTextState([`Type equation to ${role}...`]);
    setOption(e.target.id);

    for (const opt of document.querySelector('#options').childNodes) {
      if (opt.id === e.target.id) {
        opt.classList.add('opt-active');
      } else if ([...opt.classList].includes('opt-active')) {
        opt.classList.remove('opt-active');
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

    if (e.target.id === 'sqrt') {
      setEquation(prevEq => ((typeof +prevEq === 'number') ? `${Math.sqrt(prevEq)}` : ''));
      setTextState(prevTextState => {
        if (!prevTextState) return '';
        return (
          prevTextState && (Array.isArray(prevTextState) || prevTextState[0].slice(-3) === '...')
            ? '' : `√(${prevTextState})`
        );
      });
      return;
    }

    if (e.target.id === 'x-squared') {
      setEquation(prevEq => prevEq && `(${prevEq})^2`);
      setTextState(prevTextState => {
        if (!prevTextState) return '';
        return (
          prevTextState && (Array.isArray(prevTextState) || prevTextState[0].slice(-3) === '...')
            ? '' : `(${prevTextState})^2`
        );
      });
      return;
    }

    if (e.target.id === 'exp') {
      setEquation(prevEq => prevEq && `(${prevEq})^`);
      setTextState(prevTextState => {
        if (!prevTextState) return '';
        return (
          prevTextState && (Array.isArray(prevTextState) || prevTextState[0].slice(-3) === '...')
            ? '' : `(${prevTextState})^`
        );
      });
      return;
    }

    if (e.target.id === 'ln') {
      setEquation(prevEq => prevEq && `${Math.log(prevEq)}`);
      setTextState(prevTextState => {
        if (!prevTextState) return '';
        return (
          prevTextState && (Array.isArray(prevTextState) || prevTextState[0].slice(-3) === '...')
            ? '' : `ln(${prevTextState})`
        );
      });
      return;
    }

    if (e.target.id === 'log') {
      setEquation(prevEq => prevEq && `${Math.log10(prevEq)}`);
      setTextState(prevTextState => {
        if (!prevTextState) return '';
        return (
          prevTextState && (Array.isArray(prevTextState) || prevTextState[0].slice(-3) === '...')
            ? '' : `log(${prevTextState})`
        );
      });
      return;
    }

    if (e.target.id === '+') {
      setEquation(prevEq => `(${prevEq})`);
      setTextState(prevTextState => {
        if (!prevTextState) return '';
        return (
          prevTextState && (Array.isArray(prevTextState) || prevTextState[0].slice(-3) === '...')
            ? '' : `${prevTextState}+`
        );
      });
      return;
    }

    if (e.target.id === '-') {
      setEquation(prevEq => `(${prevEq})`);
      setTextState(prevTextState => {
        if (!prevTextState) return '';
        return (
          prevTextState && (Array.isArray(prevTextState) || prevTextState[0].slice(-3) === '...')
            ? '' : `${prevTextState}-`
        );
      });
      return;
    }

    if (e.target.id === 'multiply') {
      setEquation(prevEq => `(${prevEq})`);
      setTextState(prevTextState => {
        if (!prevTextState) return '';
        return (
          prevTextState && (Array.isArray(prevTextState) || prevTextState[0].slice(-3) === '...')
            ? '' : `(${prevTextState})`
        );
      });
      return;
    }

    if (e.target.id === 'divide') {
      setEquation(prevEq => `(${prevEq})(over)`);
      setTextState(prevTextState => {
        if (!prevTextState) return '';
        return (
          prevTextState && (Array.isArray(prevTextState) || prevTextState[0].slice(-3) === '...')
            ? '' : `(${prevTextState})/`
        );
      });
      return;
    }

    if (e.target.id === 'pi') {
      setEquation(prevEq => `${prevEq}${Math.PI}`);
      setTextState(prevTextState => (
        prevTextState && (Array.isArray(prevTextState) || prevTextState[0].slice(-3) === '...')
          ? `${Math.PI}` : `${prevTextState}${Math.PI}`
      ));
      return;
    }

    if (e.target.id === 'sin') {
      setEquation(prevEq => {
        if (prevEq.includes('(over)')) {
          const eqClear = prevEq.replace('(over)', '/');
          const [first, second] = eqClear.split('/');
          return `${Math.sin(+first.slice(1, first.length - 1) / +second)}`;
        }
        return `${Math.sin(prevEq)}`;
      });
      setTextState(prevTextState => {
        if (!prevTextState) return '';
        return (
          prevTextState && (Array.isArray(prevTextState) || prevTextState[0].slice(-3) === '...')
            ? '' : `sin(${prevTextState})`
        );
      });
      return;
    }

    if (e.target.id === 'cos') {
      setEquation(prevEq => {
        if (prevEq.includes('(over)')) {
          const eqClear = prevEq.replace('(over)', '/');
          const [first, second] = eqClear.split('/');
          return `${Math.cos(+first.slice(1, first.length - 1) / +second)}`;
        }
        return `${Math.cos(prevEq)}`;
      });
      setTextState(prevTextState => {
        if (!prevTextState) return '';
        return (
          prevTextState && (Array.isArray(prevTextState) || prevTextState[0].slice(-3) === '...')
            ? '' : `cos(${prevTextState})`
        );
      });
      return;
    }

    if (e.target.id === 'tan') {
      setEquation(prevEq => {
        if (prevEq.includes('(over)')) {
          const eqClear = prevEq.replace('(over)', '/');
          const [first, second] = eqClear.split('/');
          return `${Math.tan(+first.slice(1, first.length - 1) / +second)}`;
        }
        return `${Math.tan(prevEq)}`;
      });
      setTextState(prevTextState => {
        if (!prevTextState) return '';
        return (
          prevTextState && (Array.isArray(prevTextState) || prevTextState[0].slice(-3) === '...')
            ? '' : `tan(${prevTextState})`
        );
      });
      return;
    }

    if (e.target.id === 'asin') {
      setEquation(prevEq => {
        if (prevEq.includes('(over)')) {
          const eqClear = prevEq.replace('(over)', '/');
          const [first, second] = eqClear.split('/');
          return `${Math.asin(+first.slice(1, first.length - 1) / +second)}`;
        }
        return `${Math.asin(prevEq)}`;
      });
      setTextState(prevTextState => {
        if (!prevTextState) return '';
        return (
          prevTextState && (Array.isArray(prevTextState) || prevTextState[0].slice(-3) === '...')
            ? '' : `asin(${prevTextState})`
        );
      });
      return;
    }

    if (e.target.id === 'acos') {
      setEquation(prevEq => {
        if (prevEq.includes('(over)')) {
          const eqClear = prevEq.replace('(over)', '/');
          const [first, second] = eqClear.split('/');
          return `${Math.acos(+first.slice(1, first.length - 1) / +second)}`;
        }
        return `${Math.acos(prevEq)}`;
      });
      setTextState(prevTextState => {
        if (!prevTextState) return '';
        return (
          prevTextState && (Array.isArray(prevTextState) || prevTextState[0].slice(-3) === '...')
            ? '' : `acos(${prevTextState})`
        );
      });
      return;
    }

    if (e.target.id === 'atan') {
      setEquation(prevEq => {
        if (prevEq.includes('(over)')) {
          const eqClear = prevEq.replace('(over)', '/');
          const [first, second] = eqClear.split('/');
          return `${Math.atan(+first.slice(1, first.length - 1) / +second)}`;
        }
        return `${Math.atan(prevEq)}`;
      });
      setTextState(prevTextState => {
        if (!prevTextState) return '';
        return (
          prevTextState && (Array.isArray(prevTextState) || prevTextState[0].slice(-3) === '...')
            ? '' : `atan(${prevTextState})`
        );
      });
      return;
    }

    setEquation(prevEq => `${prevEq}${e.target.id}`);
    setTextState(prevTextState =>
      ((prevTextState && (Array.isArray(prevTextState) || prevTextState[0].slice(-3) === '...'))
        ? `${e.target.id}` : `${prevTextState}${e.target.id}`));
  }

  function resetText() {
    setOption('');
    setTextState([...initialTextState]);

    // Clear styling
    for (const opt of document.querySelector('#options').childNodes) {
      if ([...opt.classList].includes('opt-active')) {
        opt.classList.remove('opt-active');
      }
    }
  }

  function handleChange(e) {
    setTextState(prevTextState =>
      (
        (Array.isArray(prevTextState) || prevTextState[0].slice(-3) === '...')
          ? e.target.value.slice(-1) : e.target.value
      ));
  }

  function handleEnterClick() {
    setEqFinal(equation);
  }

  useEffect(() => {
    const url = `https://newton.now.sh/api/v2/simplify/${eqFinal}`;
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      console.log('starting fetch');
      fetch(url)
        .then(res => res.json())
        .then(data => setSimplifyEqResult(data.result))
        .catch(err => console.log(err));
    }
  }, [eqFinal]);

  console.log(simplifyEqResult, 'result');

  return (
    <div className="App">
      <Header onClick={resetText} />
      <div className="container">
        <div id="options">
          <Option name="Simplify" id="simplify" onClick={handleOptionClick} />
          <Option name="Factor" id="factor" onClick={handleOptionClick} />
          <Option name="Derive" id="derive" onClick={handleOptionClick} />
          <Option name="Integrate" id="integrate" onClick={handleOptionClick} />
          <Option name="Find 0's" id="zeroes" onClick={handleOptionClick} />
          {/* <Option name="Find Tangent Line" id="tangentLine" onClick={handleOptionClick} />
          <Option name="Find Area Under Curve" id="areaUnderCurve" onClick={handleOptionClick} /> */}
        </div>
        <div className="calc-area">
          <Text innerText={textState} textValue={textState} handleChange={handleChange} />
          <Calculator handleClick={handleButtonClick} handleEnterClick={handleEnterClick} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
