const InputCheckbox = ({ id, classes, containerClasses, onChange, value }) => {
  return (
    <div className={containerClasses || ""}>
      <input
        type="checkbox"
        id={id || null}
        className={`size-full bg-transparent outline-none p-2 border-b-2 border-gray-400 focus:border-transparent ${
          classes || ""
        }`}
        value={value}
        onChange={onChange || null}
      />
    </div>
  );
};

export default InputCheckbox;
