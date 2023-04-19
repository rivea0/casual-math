export default function Header({ onClick, toggleTheme, color }) {
  return (
    <div className="header">
      <img src="/teacup.png" alt="logo" width="50px" height="38px" />
      <a href="/" style={{ textDecoration: 'none' }} onClick={(e) => e.preventDefault()}>
        <h1 className="site-name" onClick={onClick}>Casual Math</h1>
      </a>
      <div className="right-links">
        <button type="button" className="darkModeBtn" onClick={toggleTheme} data-testid="darkModeBtn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon" data-testid="darkModeIcon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
          {' '}
        </button>
      </div>
    </div>
  );
}
