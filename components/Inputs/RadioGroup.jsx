import { Fragment } from "react";

const RadioGroup = (props) => {
  const {
    size = "",
    value = "",
    groupname = "",
    disabled = false,
    items = [],
    onChange = () => {},
  } = props;

  const handleOnChange = (e) => {
    onChange(e);
  };

  return (
    <Fragment>
      <div className="flex flex-col md:flex-row gap-4">
        {items.map((item, index) => (
          <div key={index} className={`flex items-center justify-normal mr-1`}>
            <input
              type="radio"
              disabled={disabled}
              checked={item.value === value}
              className={`${size === "sm" ? "w-3 h-3 p-1" : "w-5 h-5 p-2"} ${
                disabled
                  ? "cursor-not-allowed text-gray-600 arrow-hide"
                  : "cursor-pointer "
              } mx-2 text-teal-500 border border-accent hover:border-teal-500 focus:ring-0 focus:ring-transparent rounded-sm`}
              onChange={(e) => {
                handleOnChange(e);
              }}
              value={item.value}
              id={item.id}
              name={groupname}
            />
            {item.label ? (
              <label
                htmlFor={item.label + item.id}
                className={` pt-[2px] ${
                  disabled
                    ? "cursor-not-allowed !text-gray-500 arrow-hide"
                    : "cursor-pointer "
                } ${
                  size === "sm" ? "text-xs" : "text-md"
                } font-medium break-all text-accent`}
              >
                {item.label}
              </label>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default RadioGroup;
