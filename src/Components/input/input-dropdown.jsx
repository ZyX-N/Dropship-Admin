import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const InputDropdown = ({
  type,
  placeholder,
  classes,
  containerClasses,
  value,
  setValue,
  option = [],
}) => {
  const [showOption, setShowOption] = useState(false);
  //   const [showOption, setShowOption] = useState(false);
  return (
    <div
      className={`size-full relative border border-gray-400 rounded-md z-20 ${
        containerClasses || ""
      }`}
    >
      <div
        className={`size-full bg-transparent outline-none p-2 cursor-pointer ${
          classes || ""
        }`}
        onClick={() => setShowOption(!showOption)}
      >
        {value}
      </div>

      <ChevronDownIcon
        className={`absolute right-2 top-1/2 -translate-y-1/2 size-5 cursor-pointer transition-all ${
          showOption && "rotate-180"
        }`}
        onClick={() => setShowOption(!showOption)}
      />

      {showOption && (
        <ul className="flex flex-col w-full z-10 absolute top-[calc(100%+5px)] rounded-md divide-y bg-blue-600 border border-gray-400">
          {option.map((item) => (
            <li
              className="p-2 text-white hover:bg-blue-700 cursor-pointer"
              onClick={() => {
                setValue(item);
                setShowOption(false);
              }}
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputDropdown;
