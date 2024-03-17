import React from "react";
import { Controller } from "react-hook-form";
import Label from "../Inputs/Label";
import TextInput from "../Inputs/TextInput";
import ErrorMessage from "../Message/ErrorMessage";
import TextArea from "../Inputs/TextArea";
import Form from "./Form";
import RadioGroup from "../Inputs/RadioGroup";

function AddEditTodo({
  formType = "add",
  onChange = () => {},
  defaultValues = {},
  onClose = () => {},
}) {
  const existingData = {
    ...defaultValues,
    status: defaultValues?.status ? defaultValues?.status?.toString() : "",
  };
  return (
    <Form
      defaultValues={existingData}
      isLoading={false}
      formType={formType}
      onSuccessfulSubmit={onChange}
      onChange={onChange}
      onClear={onClose}
    >
      {({ control, errors, watch, setValue, reset }) => {
        return (
          <div className="flex flex-col">
            <Controller
              name="name"
              control={control}
              defaultValue={existingData.name || ""}
              rules={{
                required: {
                  value: true,
                  message: "This field is required",
                },
                maxLength: {
                  value: 50,
                  message: "Max length is 50 characters",
                },
              }}
              render={({ field: { onChange, value, onBlur } }) => {
                return (
                  <div className="my-3 flex flex-col">
                    <Label>Name</Label>
                    <TextInput
                      type="text"
                      onBlur={onBlur}
                      value={value}
                      placeholder="Enter Todo Name"
                      error={errors.name}
                      onChange={onChange}
                    />
                    {errors.firstName && (
                      <ErrorMessage message={errors.name.message} />
                    )}
                  </div>
                );
              }}
            />
            <Controller
              name="description"
              control={control}
              defaultValue={existingData.description || ""}
              rules={{
                required: {
                  value: true,
                  message: "This field is required",
                },
                maxLength: {
                  value: 50,
                  message: "Max length is 50 characters",
                },
              }}
              render={({ field: { onChange, value, onBlur } }) => {
                return (
                  <div className="my-3 flex flex-col">
                    <Label>Description</Label>
                    <TextArea
                      value={value}
                      onBlur={onBlur}
                      placeholder="Enter Todo Description"
                      error={errors.description}
                      onChange={onChange}
                    />
                    {errors.description && (
                      <ErrorMessage message={errors.description.message} />
                    )}
                  </div>
                );
              }}
            />
            <Controller
              name="status"
              control={control}
              defaultValue={existingData.status || ""}
              rules={{
                required: {
                  value: true,
                  message: "This field is required",
                },
              }}
              render={({ field: { onChange, value } }) => {
                return (
                  <div className="my-3 flex flex-col">
                    <Label>Status</Label>
                    <RadioGroup
                      value={value}
                      groupname="status"
                      items={[
                        {
                          label: "Done",
                          value: "done",
                          id: "1",
                        },
                        {
                          label: "Not Completed",
                          value: "not completed",
                          id: "2",
                        },
                        {
                          label: "In Progress",
                          value: "in progress",
                          id: "3",
                        },
                        {
                          label: "Canceled",
                          value: "canceled",
                          id: "4",
                        },
                      ]}
                      onChange={onChange}
                    />
                    {errors.status && (
                      <ErrorMessage message={errors.status.message} />
                    )}
                  </div>
                );
              }}
            />
            <Controller
              name="priority"
              control={control}
              defaultValue={existingData.priority || ""}
              rules={{
                required: {
                  value: true,
                  message: "This field is required",
                },
              }}
              render={({ field: { onChange, value } }) => {
                return (
                  <div className="my-3 flex flex-col">
                    <Label>Priority</Label>
                    <RadioGroup
                      value={value}
                      groupname="priority"
                      items={[
                        {
                          label: "High",
                          value: "high",
                          id: "high",
                        },
                        {
                          label: "Medium",
                          value: "medium",
                          id: "medium",
                        },
                        {
                          label: "Low",
                          value: "low",
                          id: "low",
                        },
                      ]}
                      onChange={onChange}
                    />
                    {errors.priority && (
                      <ErrorMessage message={errors.priority.message} />
                    )}
                  </div>
                );
              }}
            />
          </div>
        );
      }}
    </Form>
  );
}

export default AddEditTodo;
