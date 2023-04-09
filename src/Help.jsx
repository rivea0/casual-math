import { useState } from 'react';
import Header from './components/Header';
// const theme = useContext(ThemeContext);
// const [themeHelp, setThemeHelp] = useState('dark');

export default function Help() {
  const [th, setTh] = useState({ theme: 'dark' });
  return (
    <div style={{ textDecoration: 'none' }} className={th.theme}>
      <Header
        toggleTheme={() => {
          setTh(prevTheme => {
            const res = prevTheme.theme === 'dark' ? 'light' : 'dark';
            return { theme: res };
          });
        }}
        color={th.theme === 'dark' ? '#f1f1f1' : '#4a4e69'}
      />
      <div id="help">
        <div className="help-div">
          <h1>Using Casual Math</h1>
          <div style={{ paddingTop: '2rem' }}>
            <p>{'To solve a problem, choose one of the operations on the left sidebar, that is Simplify, Factor, Derive, Integrate, and Find 0\'s.'}</p>
            <p>Type the math expression into the input field. You can either press the enter key on your keyboard, or click the button under the input field to get the result.</p>
          </div>
          <div style={{ paddingTop: '2rem' }}>
            <p>
              Note that if the expression is not well-formed, you might get an error
              {' '}
              <code>Error: Equation is not well-formed</code>
              . However, since Casual Math takes advantage of symbolic parsing, an expression like
              {' '}
              <code>abcd+efgh</code>
              {' '}
              is still consider well-formed, so you might still get a result.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
