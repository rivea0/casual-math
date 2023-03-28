export default function Option({ name, id, onClick }) {
    return <div className="option" id={id} onClick={onClick}>{name}</div>;
}