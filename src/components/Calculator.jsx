import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function Calculator({ handleClick, handleEnterClick }) {
  return (
    <div className="calculator">
      <Button text={<InlineMath math="\sqrt{}" />} id="sqrt" className="sqrt" handleClick={handleClick} />
      <Button text="AC" id="all-clear" className="all-clear" handleClick={handleClick} />
      <Button text="x²" id="x-squared" className="x-squared" handleClick={handleClick} />
      <Button text="xⁿ" id="exp" className="exp" handleClick={handleClick} />
      <Button text="π" id="pi" className="pi" handleClick={handleClick} />
      <Button text="x" id="x" className="x" handleClick={handleClick} />
      <Button text="sin" id="sin" className="sin" handleClick={handleClick} />
      <Button text="cos" id="cos" className="cos" handleClick={handleClick} />
      <Button text="tan" id="tan" className="tan" handleClick={handleClick} />
      <Button text="ln" id="ln" className="ln" handleClick={handleClick} />
      <Button text="asin" id="asin" className="asin" handleClick={handleClick} />
      <Button text="acos" id="acos" className="acos" handleClick={handleClick} />
      <Button text="atan" id="atan" className="atan" handleClick={handleClick} />
      <Button text="log" id="log" className="log" handleClick={handleClick} />
      <Button text="7" id="7" className="seven" handleClick={handleClick} />
      <Button text="8" id="8" className="eight" handleClick={handleClick} />
      <Button text="9" id="9" className="nine" handleClick={handleClick} />
      <Button text="4" id="4" className="four" handleClick={handleClick} />
      <Button text="5" id="5" className="five" handleClick={handleClick} />
      <Button text="6" id="6" className="six" handleClick={handleClick} />
      <Button text="1" id="1" className="one" handleClick={handleClick} />
      <Button text="2" id="2" className="two" handleClick={handleClick} />
      <Button text="3" id="3" className="three" handleClick={handleClick} />
      <Button text="⌫" id="backspace" className="backspace" handleClick={handleClick} />
      <Button text="0" id="0" className="zero" handleClick={handleClick} />
      <Button text="." id="." className="dot" handleClick={handleClick} />
      <Button text="⏎" id="enter" className="enter" handleEnterClick={handleEnterClick} />
      <Button text="+" id="+" className="plus" handleClick={handleClick} />
      <Button text="-" id="-" className="minus" handleClick={handleClick} />
      <Button text="×" id="multiply" className="multiply" handleClick={handleClick} />
      <Button text="÷" id="divide" className="divide" handleClick={handleClick} />
    </div>
  );
}

function Button({ id, className, text, handleClick, handleEnterClick }) {
  return <div id={id} className={className} onClick={(id === 'enter') ? handleEnterClick : handleClick}>{text}</div>;
}
