export default function Help({ helpRef, handleToTopClick }) {
  return (
    <div id="help" ref={helpRef}>
      <div className="help-div">
        <h1>Using Casual Math</h1>
        <div style={{ paddingTop: '2rem' }}>
          <p>{'To solve a problem, choose one of the operations on the left sidebar, that is one of Simplify, Factor, Derive, Integrate, or Find 0\'s.'}</p>
          <p>Type the math expression into the input field. You can either press the enter key on your keyboard, or click the button under the input field to get the result.</p>
        </div>
        <div style={{ paddingTop: '2rem' }}>
          <p style={{ marginBottom: '1rem' }}>
            Note that if the expression is not well-formed, you might get an error
            {' '}
            <code>Error: Equation is not well-formed</code>
            . However, since Casual Math takes advantage of symbolic parsing, an expression like
            {' '}
            <code>abcd+efgh</code>
            {' '}
            is still considered well-formed, so you might still get a result.
          </p>
          <a href="#" onClick={handleToTopClick} style={{ fontSize: '22px' }}>Back to Top</a>
        </div>
      </div>
    </div>
  );
}
