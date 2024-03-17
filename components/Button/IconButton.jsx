import React from "react";
import PropTypes from "prop-types";

const ListHeaderIconButton = ({
  icon,
  onClick = () => {},
  disabled = false,
  children,
  className = "",
  ...restProps
}) => {
  const onClickButton = (event) => {
    if (onClick) onClick(event);
  };

  return (
    <button
      className={`flex items-center active:bg-opacity-80 hover:bg-gray-200 justify-center border border-1 rounded-full w-full md:w-10 h-10 bg-white text-black disabled:opacity-30 hover:cursor-pointer ${className}`}
      onClick={onClickButton}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default ListHeaderIconButton;
