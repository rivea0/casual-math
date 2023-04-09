import Option from './Option';

export default function Options({ options, handleOptionClick }) {
  return (
    <div className="options" data-testid="options">
      {
      Object.entries(options).map(([k, val]) => (
        <Option key={val.id} name={val.name} id={k} onClick={handleOptionClick} />))
    }
    </div>
  );
}
