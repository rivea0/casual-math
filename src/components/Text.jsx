import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function Text({ innerText, handleEnterClick, handleButtonClick, handleChange, equationValue, content }) {
  return (
    // Display the initialTextState, and a link to help page
    (innerText.length > 1 && Array.isArray(innerText)) ? (
      <div className="text">
        {innerText.map((textItem) => <p key={textItem}>{textItem}</p>)}
        <br />
        <p>
          See
          {' '}
          <a href="#">help</a>
          {' '}
          for more.
        </p>
      </div>
    )
      : (
        <>
          <EquationForm displayText={innerText} handleEnterClick={handleEnterClick} onClick={handleButtonClick} handleChange={handleChange} equationValue={equationValue} />
          <ResultArea content={content} />
        </>
      ));
}

function EquationForm({ displayText, handleEnterClick, onClick, handleChange, equationValue }) {
  return (
    <form action="" onSubmit={e => { e.preventDefault(); }}>
      <div className="text-form">
        <label htmlFor="equation">{displayText}</label>
        <input
          type="text"
          name="equation"
          className="text-input"
          id="equation"
          ref={input => input && input.focus()}
          value={equationValue}
          onChange={handleChange}
          onKeyUp={handleEnterClick}
        />
        {Array.isArray(displayText) && <Button onClick={onClick} displayText={displayText} /> }
      </div>
    </form>
  );
}

function Button({ onClick, displayText }) {
  return (
    <button type="submit" onClick={onClick}>{(Array.isArray(displayText) && displayText[0].split('to ')[1].slice(0, -1))}</button>
  );
}

function ResultArea({ content }) {
  return (
    <div className={content && 'result-area'}>
      {content && (
      <>
        <p>The result is:</p>
        <br />
        <p><InlineMath math={content} /></p>
      </>
      )}
    </div>
  );
}
