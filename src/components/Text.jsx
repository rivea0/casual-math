export default function Text({ innerText }) {
  return (
    (innerText.length > 1) ?
    <div className="text">
        {innerText.map(textItem => <p key={textItem}>{textItem}</p>)}
    </div>
    :
    <EquationForm placeholder={innerText[0]} />
  )
}


function EquationForm({ placeholder }) {
  return (
    <form
      action=""
      onSubmit={e => {
        e.preventDefault();}}
    >
      <div className="text-form">
        <label htmlFor="equation"></label>
          <input
              type="text"
              placeholder={placeholder}
              name="equation"
              className="text-input"
              id="equation"
          />
      </div>
    </form>
  )
}
