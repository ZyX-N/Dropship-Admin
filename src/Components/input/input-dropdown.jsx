import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const InputDropdown = ({
  type,
  classes,
  containerClasses,
  value,
  setValue,
  option = [],
}) => {
  const [showOption, setShowOption] = useState(false);

  return (
    <div
      className={`size-full relative border border-gray-400 rounded-md z-20 ${containerClasses || ""
        }`}
    >
      <div
        className={`size-full bg-transparent outline-none px-2 h-10 flex justify-start items-center cursor-pointer ${classes || ""
          }`}
        onClick={() => setShowOption(!showOption)}
      >
        {value}
      </div>

      <ChevronDownIcon
        className={`absolute right-2 top-1/2 -translate-y-1/2 size-5 cursor-pointer transition-all ${showOption && "rotate-180"
          }`}
        onClick={() => setShowOption(!showOption)}
      />

      {showOption && (
        <ul className="flex flex-col w-full z-10 absolute top-[calc(100%+5px)] rounded-md divide-y bg-blue-600 border border-gray-400 max-h-[247px] overflow-y-auto">
          {option.map((item) => (
            <li
              key={item._id}
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
