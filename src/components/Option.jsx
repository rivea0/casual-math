// export default function Options(props) {

//     return (
//         <div id="options">
//             <Option 
//                 name="Simplify" 
//                 onClick={props.simplify}
//             />
//             <Option name="Factor" />
//             <Option name="Derive" />
//             <Option name="Integrate" />
//             <Option name="Find 0's" />
//             <Option name="Find Tangent Line" />
//             <Option name="Find Area Under Curve" />

//         </div>
//     )
// }

export default function Option({ name, onClick }) {
    return <div className="option" onClick={onClick}>{name}</div>;
}