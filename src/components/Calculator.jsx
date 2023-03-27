import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function Calculator() {

  return (
    <div className="calculator">
      <Button text={<InlineMath math="\sqrt{}"/>} id="sqrt" />
      <Button text="AC" id="all-clear" />
      <Button text="x²" id="x-squared" />
      <Button text="xⁿ" id="exp" />
      <Button text="π" id="pi" />
      <Button text="e" id="e" />
      <Button text="sin" id="sin" />
      <Button text="cos" id="cos" />
      <Button text="tan" id="tan" />
      <Button text="ln" id="ln" />
      <Button text="asin" id="asin" />
      <Button text="acos" id="acos" />
      <Button text="atan" id="atan" />
      <Button text="log" id="log" />
      <Button text="7" id="seven" />
      <Button text="8" id="eight" />
      <Button text="9" id="nine" />
      <Button text="4" id="four" />
      <Button text="5" id="five" />
      <Button text="6" id="six" />
      <Button text="1" id="one" />
      <Button text="2" id="two" />
      <Button text="3" id="three" />
      <Button text="⌫" id="backspace" />
      <Button text="0" id="zero" />
      <Button text="." id="dot" />
      <Button text="⏎" id="enter" />
      <Button text="+" id="plus" />
      <Button text="-" id="minus" />
      <Button text="×" id="multiply" />
      <Button text="÷" id="divide" />
    </div>
  )
}


function Button({ id, text }) {
  return <div id={id} onClick={(e) => console.log(e.target)}>{text}</div>;
}
