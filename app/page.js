"use client";

import AddEditTodo from "@/components/Form/AddEditTodo";
import List from "@/components/List/List";
import Modal from "@/components/Modal/Modal";
import CommonHeader from "@/components/shared/CommonHeader";
import { PRIORITY, TODO } from "@/constant/data";

import { get, isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const DISPLAY = {
  title: () => "ISSUES",
  content: {
    properties: ["name", "description", "status", "priority", "createdAt"],
    headerClass: {},
    bodyClass: {},
    style: {
      columnWidth: "md:grid-cols-[0.5fr_1fr_2fr_1fr_1fr_1fr]",
    },
    header: () => {
      return {
        name: "Name",
        description: "Description",
        status: "Status",
        priority: "Priority",
        createdAt: "Date",
      };
    },
    body: ({ row, column }) => {
      const Status = (value, text) => {
        return value === "done" ? (
          <span className="text-green-600">{text}</span>
        ) : value === "not completed" ? (
          <span className="text-red-600">{text}</span>
        ) : value === "in progress" ? (
          <span className="text-orange-500">{text}</span>
        ) : value === "canceled" ? (
          <span className="text-gray-500">{text}</span>
        ) : (
          <span>{text}</span>
        );
      };
      if (column === "name") {
        const name = get(row, "name", "N/A");
        return <span className="font-semibold">{name}</span>;
      }

      if (column === "status") {
        const status = get(row, "status", "done");
        return Status(status, status);
      }

      if (column === "priority") {
        const priority = get(row, "priority", "N/A");
        return (
          <span
            className={`${
              priority === "high"
                ? "text-red-600"
                : priority === "medium"
                ? "text-orange-300"
                : "text-gray-700"
            }`}
          >
            {priority}
          </span>
        );
      }

      if (column === "createdAt") {
        const createdAt = get(row, "createdAt", new Date());
        return <span>{new Date(createdAt).toLocaleDateString()}</span>;
      }

      const typeOfData = typeof row[column];
      return typeOfData === "string"
        ? row[column]
        : typeOfData === "number"
        ? row[column]
        : "abc";
    },
    contextMenu: ({ row, setEditTodo, fetchData }) => {
      return [
        {
          icon: <FaEdit size={18} />,
          name: "Edit",
          function: () => {
            setEditTodo(row);
          },
        },
        {
          icon: <MdDelete size={18} />,
          name: "Delete",
          function: () => {
            const removeOrder = () => {
              const localData = localStorage.getItem("TODO");
              const results = get(JSON.parse(localData), "results", []);
              const filteredData = results.filter((item) => item.id !== row.id);
              const prepareData = {
                results: [...filteredData],
              };
              localStorage.setItem("TODO", JSON.stringify(prepareData));
              setEditTodo({});
              fetchData();
            };

            const onSuccess = (result) => {
              const isConfirmed = get(result, "isConfirmed", false);
              toast.error("Todo deleted successfully!");
              if (isConfirmed) removeOrder();
            };

            Swal.fire({
              title: "Are you sure?",
              icon: "warning",
              text: "Todo will be deleted permanently!",
              showCancelButton: true,
              confirmButtonText: "YES",
              cancelButtonText: "CANCEL",
            }).then(onSuccess);
          },
        },
      ];
    },
  },
};

export default function Home() {
  const [todo, setTodo] = useState([]);
  const [open, setOpen] = useState(false);
  const [editTodo, setEditTodo] = useState({});

  const [filterBadge, setFilterBadge] = useState("");

  const onEditClose = () => {
    setEditTodo({});
    setOpen(false);
  };

  const fetchData = () => {
    const localData = localStorage.getItem("TODO");
    const results = get(JSON.parse(localData), "results", []);
    if (results?.length > 0) {
      setTodo(JSON.parse(localData));
    } else {
      const prepareData = {
        results: [...TODO],
      };
      setTodo(prepareData);
    }
    setOpen(false);
    setEditTodo({});
  };

  const handleFilter = (value) => {
    const badgeName = PRIORITY.find((item) => item.value === value).label;
    setFilterBadge(badgeName);
    const localValues = JSON.parse(localStorage.getItem("TODO"));
    const results = localValues?.results;

    const filteredData = results.filter((item) => item.priority === value);
    const prepareData = {
      results: [...filteredData],
    };
    setTodo(prepareData);
  };

  const removeFilterItem = () => {
    setFilterBadge("");
    fetchData();
  };

  useEffect(() => {
    const localData = localStorage.getItem("TODO");
    const results = get(JSON.parse(localData), "results", []);
    const prepareData = {
      results: localData?.length ? [...results] : [...TODO],
    };
    setTodo(prepareData);
    if (!localData?.length) {
      localStorage.setItem("TODO", JSON.stringify(prepareData));
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(editTodo)) {
      setOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editTodo, open]);

  return (
    <div>
      <CommonHeader
        title={"Todo List"}
        handleFilter={handleFilter}
        onClickAdd={fetchData}
        showItems={["add"]}
      />
      {
        <div className="">
          {filterBadge && (
            <div className="flex my-3 ml-3 bg-default flex-row w-fit items-center p-1 px-2  text-accent rounded-md">
              <span>{filterBadge}</span>
              <span className="cursor-pointer print:hidden text-inputError ml-2">
                <FiX onClick={removeFilterItem} />
              </span>
            </div>
          )}
        </div>
      }
      <List
        title={"Issues"}
        data={todo}
        onChange={fetchData}
        renderDropdownItem={true}
        contextMenuData={({ row }) =>
          DISPLAY.content.contextMenu({ row, setEditTodo, fetchData })
        }
        properties={DISPLAY.content.properties}
        header={DISPLAY.content.header()}
        body={DISPLAY.content.body}
        style={DISPLAY.content.style}
      />
      <Modal
        title={"EDIT TODO"}
        isOpen={open && !isEmpty(editTodo) ? true : false}
        onClose={onEditClose}
      >
        <AddEditTodo
          title={"EDIT TODO"}
          formType="edit"
          onChange={fetchData}
          defaultValues={editTodo}
          onClose={onEditClose}
        />
      </Modal>
    </div>
  );
}
