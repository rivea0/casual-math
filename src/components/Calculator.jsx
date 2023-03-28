import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';


export default function Calculator({ handleClick }) {
  return (
    <div className="calculator">
      <Button text={<InlineMath math="\sqrt{}"/>} id="sqrt"  />
      <Button text="AC" id="all-clear" handleClick={handleClick} />
      <Button text="x²" id="x-squared" />
      <Button text="xⁿ" id="exp" />
      <Button text="π" id="pi" handleClick={handleClick} />
      <Button text="e" id="e" handleClick={handleClick} />
      <Button text="sin" id="sin" />
      <Button text="cos" id="cos" />
      <Button text="tan" id="tan" />
      <Button text="ln" id="ln" />
      <Button text="asin" id="asin" />
      <Button text="acos" id="acos" />
      <Button text="atan" id="atan" />
      <Button text="log" id="log" />
      <Button text="7" id="7" handleClick={handleClick} />
      <Button text="8" id="8" handleClick={handleClick} />
      <Button text="9" id="9" handleClick={handleClick} />
      <Button text="4" id="4" handleClick={handleClick} />
      <Button text="5" id="5" handleClick={handleClick} />
      <Button text="6" id="6" handleClick={handleClick} />
      <Button text="1" id="1" handleClick={handleClick} />
      <Button text="2" id="2" handleClick={handleClick} />
      <Button text="3" id="3" handleClick={handleClick} />
      <Button text="⌫" id="backspace" handleClick={handleClick} />
      <Button text="0" id="0" handleClick={handleClick} />
      <Button text="." id="." handleClick={handleClick} />
      <Button text="⏎" id="enter" />
      <Button text="+" id="+" handleClick={handleClick} />
      <Button text="-" id="-" handleClick={handleClick} />
      <Button text="×" id="mult" />
      <Button text="÷" id="over" />
    </div>
  )
}


function Button({ id, text, handleClick }) {
  return <div id={id} onClick={handleClick}>{text}</div>;
}
