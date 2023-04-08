import { Link } from 'react-router-dom';

export default function Header({ onClick, toggleTheme, color }) {
  return (
    <div className="header">
      <img src="/math-book.png" alt="logo" width="50px" height="50px" />
      <h1 id="site-name" onClick={onClick}>Casual Math</h1>
      <div className="right-links">
        <p className="about"><Link to="/about">About</Link></p>
        <button type="button" className="darkModeBtn" onClick={toggleTheme}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
          {' '}

        </button>
      </div>
    </div>
  );
}
