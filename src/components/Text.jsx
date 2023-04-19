import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function Text({
  innerText,
  handleEnterPress,
  handleChange,
  handleButtonClick,
  handleHelpClick,
  equationValue,
  content,
  result,
}) {
  return (
    // Display the initialTextState, and a link to help page
    (innerText.length > 1 && Array.isArray(innerText)) ? (
      <div className="text" data-testid="text">
        {innerText.map((textItem) => <p key={textItem}>{textItem}</p>)}
        <br />
        <p>
          See
          {' '}
          <a href="#help" onClick={handleHelpClick}>help</a>
          {' '}
          for more.
        </p>
      </div>
    )
      : (
        <>
          <EquationForm
            displayText={innerText}
            handleEnterPress={handleEnterPress}
            handleChange={handleChange}
            equationValue={equationValue}
            handleButtonClick={handleButtonClick}
          />
          {result ? <ResultArea content={content} /> : null}
        </>
      ));
}

function EquationForm({
  displayText,
  handleEnterPress,
  handleChange,
  handleButtonClick,
  equationValue,
}) {
  return (
    <form action="" onSubmit={e => { e.preventDefault(); }}>
      <div className="text-form" data-testid="result">
        <label htmlFor="equation">{displayText}</label>
        <input
          type="text"
          name="equation"
          className="text-input"
          id="equation"
          ref={input => input && input.focus()}
          value={equationValue}
          onChange={handleChange}
          onKeyUp={handleEnterPress}
          data-testid="inputElement"
        />
        {Array.isArray(displayText) && (
          <Button displayText={displayText} onClick={handleButtonClick} />
        )}
      </div>
    </form>
  );
}

function Button({ displayText, onClick }) {
  return (
    <button type="submit" onClick={onClick}>
      {Array.isArray(displayText) && (
        displayText[0].split('to ')[1].slice(0, -1))}
    </button>
  );
}

function ResultArea({ content }) {
  return (
    <div className={content && 'result-area'}>
      {(content && !content.includes('error')) ? (
        <>
          <p>The result is:</p>
          <br />
          <p>
            <InlineMath
              math={Array.isArray(content) ? content.join(', ') : content}
            />
          </p>
        </>
      ) : (
        <p style={{ color: '#FF3131', fontWeight: 'bold' }}>
          Error: Equation is not well-formed
        </p>
      )}
    </div>
  );
}
