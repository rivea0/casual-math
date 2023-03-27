export default function Header({ onClick }) {
  return (
    <div className="header">
      <img src="/math-book.png" alt="logo" width="50px" height="50px"/>
      <h1 id="site-name" onClick={onClick}>Casual Math</h1>
    </div>
  )
}
