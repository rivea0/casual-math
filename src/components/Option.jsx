/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
export default function Option({ name, id, onClick }) {
  return <div className="option" id={id} onClick={onClick}>{name}</div>;
}
