export default function Options() {
    return (
        <div id="options">
            <Option name="Simplify" />
            <Option name="Factor" />
            <Option name="Derive" />
            <Option name="Integrate" />
            <Option name="Find 0's" />
            <Option name="Find Tangent Line" />
            <Option name="Find Area Under Curve" />

        </div>
    )
}

function Option(props) {
    return (
        <div className="option">
            {props.name}
        </div>
    )
}