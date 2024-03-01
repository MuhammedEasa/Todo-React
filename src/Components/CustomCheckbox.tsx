import './CustomCheckbox.css';

interface CustomCheckboxProps {
 checked: boolean;
 onChange: () => void;
}

function CustomCheckbox({ checked, onChange }: CustomCheckboxProps) {
 return (
    <div
      className={`custom-checkbox ${checked ? "checked" : ""}`}
      onClick={onChange}
    >
      {checked ? "✔" : ""}
    </div>
 );
}

export default CustomCheckbox;
