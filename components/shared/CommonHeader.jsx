import { FiFilter, FiPlus } from "react-icons/fi";
import ListHeaderIconButton from "../Button/IconButton";
import Modal from "../Modal/Modal";
import AddEditTodo from "../Form/AddEditTodo";
import { useState } from "react";
import { PRIORITY } from "@/constant/data";

const CommonHeader = ({
  title = "",
  showItems = ["add"],
  onClickAdd = () => {},
  handleFilter = () => {},
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [viewOptions, setViewOptions] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  const handleOnSubmit = () => {
    onClickAdd();
    setOpen(false);
  };
  const onClickAddIconButton = () => {
    setOpen(true);
  };

  const onClickFilterIconButton = () => {
    setViewOptions(true);
  };

  const AddIconButtonIcon = (
    <ListHeaderIconButton onClick={onClickAddIconButton}>
      <FiPlus />
    </ListHeaderIconButton>
  );
  const FilterIconButtonItem = (
    <ListHeaderIconButton onClick={onClickFilterIconButton}>
      <FiFilter />
    </ListHeaderIconButton>
  );
  return (
    <>
      <div
        className={`p-4 flex flex-col print:hidden md:items-center border-b md:flex-row justify-between border-borderColor pb-5`}
      >
        <h3 className="text-3xl font-light text-accent">{title}</h3>
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-1 space-y-1 md:space-y-0 mt-1 md:mt-0">
          <div>
            {FilterIconButtonItem}
            {viewOptions && (
              <div className="flex absolute right-[51px] z-50 cursor-pointer  mt-2 select-none rounded-lg text-accent justify-end gap-1 flex-col items-end bg-red dark:bg-sky-800 p-2">
                {PRIORITY.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setViewOptions(false);
                      handleFilter(item.value);
                    }}
                    className={`hover:bg-gray-200 dark:hover:bg-selectedOptionBg cursor-pointer w-full rounded-lg p-1 text-xs`}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {showItems.includes("add") ? AddIconButtonIcon : <></>}
        </div>
        <Modal title={"ADD TODO"} isOpen={open} onClose={onClose}>
          <AddEditTodo
            title={"ADD TODO"}
            formType="add"
            onChange={handleOnSubmit}
          />
        </Modal>
      </div>
    </>
  );
};

export default CommonHeader;
