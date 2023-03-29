/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-parens */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
export default function Text({ innerText, textValue, handleChange }) {
  return (
    (innerText.length > 1 && Array.isArray(innerText)) ? (
      <div className="text">
        {innerText.map((textItem) => <p key={textItem}>{textItem}</p>)}
      </div>
    )
      : <EquationForm placeholder={innerText[0]} textValue={textValue} handleChange={handleChange} />
  );
}

function EquationForm({ textValue, handleChange }) {
  return (
    <form action="" onSubmit={e => { e.preventDefault(); }}>
      <div className="text-form">
        <label htmlFor="equation" />
        <input
          type="text"
          placeholder={textValue}
          name="equation"
          className="text-input"
          id="equation"
          ref={input => input && input.focus()}
          value={textValue}
          onChange={handleChange}
        />
      </div>
    </form>
  );
}
