import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const InputDropdown = ({
  classes,
  containerClasses,
  value,
  setValue,
  option = [],
  disable = false,
}) => {
  const [showOption, setShowOption] = useState(false);

  return (
    <div
      className={`size-full relative border border-gray-400 rounded-md z-20 ${
        containerClasses || ""
      }`}
    >
      <div
        className={`size-full bg-transparent outline-none px-2 h-10 flex justify-start items-center cursor-pointer ${
          classes || ""
        }`}
        onClick={() => !disable && setShowOption(!showOption)}
      >
        {value}
      </div>

      <ChevronDownIcon
        className={`absolute right-2 top-1/2 -translate-y-1/2 size-5 transition-all ${
          showOption && "rotate-180"
        } ${disable ? "cursor-not-allowed" : "cursor-pointer"}`}
        onClick={() => !disable && setShowOption(!showOption)}
      />

      {!disable && showOption && (
        <ul className="flex flex-col w-full z-20 absolute top-[calc(100%+5px)] rounded-md divide-y divide-gray-400 bg-white border border-gray-400 max-h-[247px] overflow-y-auto shadow-2xl">
          {option.length > 0 ? (
            option.map((item) => (
              <li
                key={item._id}
                className="p-2 text-black hover:text-white hover:bg-blue-600 cursor-pointer"
                onClick={() => {
                  setValue(item);
                  setShowOption(false);
                }}
              >
                {item.title}
              </li>
            ))
          ) : (
            <img
              src="/static/image/no-data.jpg"
              className="w-full h-[245px] object-cover"
            />
          )}
        </ul>
      )}
    </div>
  );
};

export default InputDropdown;
