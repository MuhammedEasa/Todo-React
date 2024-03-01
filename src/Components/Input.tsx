type InputProps = {
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    clearError: () => void;
  };
  
  export const Input = ({ inputValue, setInputValue, clearError }: InputProps) => {
    return (
      <input
        className="input form__input"
        placeholder="Add a todo"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
          clearError();
        }}
      />
    );
  };
  