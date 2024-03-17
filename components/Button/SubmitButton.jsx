import React from "react";

function SubmitButton({
  disabled = false,
  type = "submit",
  children,
  onClick = () => {},
}) {
  return (
    <div className={``}>
      <button
        onClick={onClick}
        type={type}
        className={`bg-cyan-600 text-white font-semibold text-md py-2 px-4 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-[1px] focus:ring-offset-2 focus:ring-accent
        ${disabled ? "bg-gray-300 text-gray-600 cursor-not-allowed" : ""}
        `}
      >
        {type === "submit" ? "Submit" : children}
      </button>
    </div>
  );
}

export default SubmitButton;
