import React from "react";

const NoDataFound = (props) => {
  const { heading, message, button, children } = props;

  return (
    <div className="text-center flex flex-col flex-1 justify-center items-center p-4">
      <div className="text-center mt-6">
        <h3 className="font-semibold text-xl text-center md:text-md text-accent">
          {heading}
          {button ? (
            <span className="cursor-pointer underline hover:text-teal transition">
              {" "}
              {button}
            </span>
          ) : (
            <></>
          )}
        </h3>
        {message ? (
          <p className="font-light text-lg text-center md:text-md text-inputError">
            {message}
          </p>
        ) : (
          <></>
        )}
        {children}
      </div>
    </div>
  );
};

export default NoDataFound;
