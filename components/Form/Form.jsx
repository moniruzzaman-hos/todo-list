"use client";

import { get } from "lodash";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import ClearButton from "../Button/ClearButton";
import SubmitButton from "../Button/SubmitButton";

function Form({
  children,
  className = "",
  formType = "add",
  extraState = {},
  defaultValues = {},
  onClear = () => {},
  modifyExistingPayload = () => {},
  onSuccessfulSubmit = () => {},
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    const payload = { ...data, ...extraState };
    let modifiedPayload = {
      ...payload,
      ...(formType === "add" ? { createdAt: new Date() } : {}),
    };

    if (typeof modifyExistingPayload === "function") {
      const returnedPayload = modifyExistingPayload(payload);
      modifiedPayload = { ...returnedPayload, ...payload };
    }

    if (formType === "add") {
      const localTodo = JSON.parse(localStorage.getItem("TODO"));
      const getResults = get(localTodo, "results", []);
      getResults.push({ ...modifiedPayload, id: getResults?.length + 1 });
      localStorage.setItem("TODO", JSON.stringify({ results: getResults }));
      toast.success("Todo added successfully!");
    } else {
      const localTodo = JSON.parse(localStorage.getItem("TODO"));
      const getResults = get(localTodo, "results", []);
      const index = getResults.findIndex(
        (item) => item.id === defaultValues.id
      );
      getResults[index] = { ...modifiedPayload, id: defaultValues.id };
      localStorage.setItem("TODO", JSON.stringify({ results: getResults }));
      toast.success("Todo updated successfully!");
    }
    onSuccessfulSubmit();
  };

  const handleClear = () => {
    reset();
    onClear();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {children({ control, errors, watch, setValue, reset })}
      <div
        className={`flex justify-between items-center my-3 px-2 ${
          className ? className : ""
        }
      `}
      >
        <ClearButton onClick={() => handleClear()}>Clear Form</ClearButton>
        <SubmitButton type="submit" />
      </div>
    </form>
  );
}

export default Form;
