import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function Text() {
    return (
        <div className="calculator">
            <Button text={<InlineMath math="\sqrt{}"/>} role="role-big" />
            <Button text="C" role="role-big2" />
            <Button text={<InlineMath math="x^2"/>} role="role-small" />
            <Button text={<InlineMath math="x^y"/>} role="role-small2" />
            <Button text="π" role="role-small3" />
            <Button text="e" role="role-small4" />
            <Button text="sin" role="role-small5" />
            <Button text="cos" role="role-small6" />
            <Button text="tan" role="role-small7" />
            <Button text="ln" role="role-small8" />
            <Button text="asin" role="role-small9" />
            <Button text="acos" role="role-small10" />
            <Button text="atan" role="role-small11" />
            <Button text={<InlineMath math="log_{10}"/>} role="role-small12" />
            <Button text="7" role="role-small13" />
            <Button text="8" role="role-small14" />
            <Button text="9" role="role-small15" />
            <Button text="4" role="role-small16" />
            <Button text="5" role="role-small17" />
            <Button text="6" role="role-small18" />
            <Button text="1" role="role-small19" />
            <Button text="2" role="role-small20" />
            <Button text="3" role="role-small21" />
            <Button text="⌫" role="role-small22" />
            <Button text="0" role="role-small23" />
            <Button text="." role="role-small24" />
            <Button text="⏎" role="role-small25" />
        </div>
    )
}


function Button(props) {
    return (
        <div className={props.role}>
            {props.text}
        </div>
    )
}