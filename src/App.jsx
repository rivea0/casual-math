import { useEffect, useState, useRef, useReducer } from 'react';
import Mexp from 'math-expression-evaluator';

import Header from './components/Header';
import Option from './components/Option';
import Text from './components/Text';
import Footer from './components/Footer';

export default function App() {
  const initialTextState = [
    '1. Select an option',
    '2. Type the equation',
    '3. Click enter (⏎) to get the result',
  ];

  const initialState = {
    textState: initialTextState,
    equation: { text: '' },
    option: '',
    result: '',
    equationValue: '',
  };

  const [theme, setTheme] = useState('dark');
  const [result, setResult] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);
  const isInitialMount = useRef(true);

  function handleChange(e) {
    dispatch({
      type: 'changed',
      equationValue: e.target.value,
    });
  }

  function toggleTheme() {
    const toggle = { light: 'dark', dark: 'light' };
    setTheme(toggle[theme]);
  }

  const options = {
    simplify: { name: 'Simplify', id: 0 },
    factor: { name: 'Factor', id: 1 },
    derive: { name: 'Derive', id: 2 },
    integrate: { name: 'Integrate', id: 3 },
    zeroes: { name: 'Find 0\'s', id: 4 },
  };

  function handleOptionClick(e) {
    setResult('');
    dispatch({
      type: 'option_click',
      textState: [`Type equation to ${options[e.target.id].name.toLowerCase()}:`],
      option: e.target.id,
      equationValue: '',
    });

    // Add styling to the active option div
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
    dispatch({
      type: 'reset_text',
      option: '',
      textState: [...initialTextState],
    });

    // Clear styling
    document.querySelector('.calc-area').style.gridTemplateRows = '1fr';

    for (const opt of document.querySelector('#options').childNodes) {
      if ([...opt.classList].includes('opt-active')) {
        opt.classList.remove('opt-active');
      }
    }
  }

  function handleEnterPress(e) {
    // setLockedResultArea(true);
    if (e.keyCode === 13) { // If it is the enter key
      if (e.target.value.includes('/')) {
        const cleanRes = e.target.value.replace('/', '(over)');
        dispatch({
          type: 'enter_press',
          equation: { text: cleanRes },
        });
      } else {
        dispatch({
          type: 'enter_press',
          equation: { text: e.target.value },
        });
      }
    }
  }

  function handleButtonClick(e) {
    // setLockedResultArea(true);
    if (e.target.previousElementSibling.value.includes('/')) {
      const cleanRes = e.target.previousElementSibling.value.replace('/', '(over)');
      dispatch({
        type: 'button_click',
        equation: { text: cleanRes },
      });
    } else {
      dispatch({
        type: 'button_click',
        equation: { text: e.target.previousElementSibling.value },
      });
    }
  }

  function isWellFormed(e) {
    const mexp = new Mexp();

    try {
      const letters = [...e].filter((letter) => /[a-zA-Z]/.test(letter));
      if (letters) {
        const tokens = letters.map((l) => ({
          type: 3,
          token: l,
          show: l,
          value: l,
        }));
        mexp.addToken(tokens);
      }
      const lexed = mexp.lex(e);
      const postfixed = mexp.toPostfix(lexed);
      mexp.postfixEval(postfixed);
      return true;
    } catch {
      return false;
    }
  }

  // const resultArea = document.createElement('div');

  useEffect(() => {
    let ignore = false;

    if (!isWellFormed(state.equation.text)) {
      setResult('error');
      return;
    }

    const url = `https://newton.now.sh/api/v2/${state.option}/${encodeURIComponent(state.equation.text)}`;
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      console.log('starting fetch');
      fetch(url)
        .then(res => res.json())
        .then(data => {
          if (!ignore) {
          //   if (!lockedResultArea) {
          //     document.querySelector('.calc-area').appendChild(resultArea);
          //     setLockedResultArea(true);
          //   }
            setResult(data.result);
          // resultArea.textContent = result;
          // setLockedResultArea(false);
          }
        })
        .catch(err => console.log(err));
    }
    return () => {
      ignore = true;
    };
  }, [state.equation]);

  // console.log(result.includes('error'), 'here result err');
  console.log(result, 'here result of ');

  return (
    <div className={`App ${theme}`}>
      <Header
        onClick={resetText}
        toggleTheme={toggleTheme}
        color={theme === 'dark' ? '#f1f1f1' : '#4a4e69'}
      />
      <div className="container" data-testid="container">
        <div id="options" data-testid="options">
          {
            Object.entries(options).map(([k, val]) => (
              <Option key={val.id} name={val.name} id={k} onClick={handleOptionClick} />))
          }
        </div>
        <div className={`calc-area ${theme}`} data-testid="calc-area">
          <Text
            innerText={state.textState}
            handleEnterPress={handleEnterPress}
            handleChange={handleChange}
            handleButtonClick={handleButtonClick}
            equationValue={state.equationValue}
            content={result}
            result={result}
          />
        </div>
      </div>
      <Footer color={theme === 'dark' ? '#f1f1f1' : '#4a4e69'} />
    </div>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case 'changed': {
      return {
        ...state,
        equationValue: action.equationValue,
      };
    }

    case 'option_click': {
      return {
        ...state,
        textState: action.textState,
        option: action.option,
        equationValue: action.equationValue,
      };
    }

    case 'reset_text': {
      return {
        ...state,
        option: action.option,
        textState: action.textState,
      };
    }

    case 'enter_press': {
      return {
        ...state,
        equation: action.equation,
      };
    }

    case 'button_click': {
      return {
        ...state,
        equation: action.equation,
      };
    }

    default: {
      throw new Error('uh oh');
    }
  }
}
