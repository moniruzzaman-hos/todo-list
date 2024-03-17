import clsx from "clsx";
import get from "lodash/get";
import uniqBy from "lodash/uniqBy";
import React, {
  Fragment,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import isEqual from "react-fast-compare";
import ContextMenu from "../menu/ContextMenu";
import NoDataFound from "../shared/NoDataFound";

const BodyListItem = React.memo(
  ({
    id,
    style,
    autoSerialNumber,
    properties,
    itemIndex,
    item,
    customColumnClassNames,
    extraBorder,
    pageStates,
    header,
    body,
    renderDropdownItem,
    contextMenuData,
    printStyles,
  }) => {
    const wrapperRef = useRef();
    const serialStyles = Array.isArray(customColumnClassNames)
      ? customColumnClassNames.find((item) => item.property === "si")
      : null;

    const contextMenuItems = renderDropdownItem
      ? contextMenuData({ row: item })
      : [];
    const isAnyContextMenuItemsTrue = contextMenuItems.some((item) => {
      return get(item, "display", true);
    });

    return (
      <Fragment>
        <div
          className={`py-2 px-4 md:px-0 print:px-0 ${
            extraBorder
              ? "print:border-b print:border-gray-500"
              : "print:border-b print:border-gray-50"
          } print:w-auto print:py-0`}
          ref={wrapperRef}
          id={id}
        >
          <div
            className={clsx(
              `grid grid-cols-2 border border-borderColor hover:border-teal transition duration-300 md:border-0 md:gap-4 md:px-4 print:md:px-0 print:py-1 print:gap-3 print:border-0` +
                " " +
                style.columnWidth +
                " " +
                style.printColumnWidth,
              printStyles.listItemBody
            )}
          >
            {autoSerialNumber ? (
              <Fragment key={`${id}-${itemIndex}`}>
                <h6 className="pl-4 py-2 md:hidden print:hidden">{"SL"}</h6>

                <div
                  className={`odd:bg-primary odd:md:bg-transparent text-right md:text-left pr-4 md:pr-0 py-2 md:py-0 print:text-left print:py-0 select-all ${
                    serialStyles ? serialStyles.className : ""
                  }`}
                >
                  {Number(itemIndex) + 1}
                </div>
              </Fragment>
            ) : (
              <></>
            )}
            {properties.map((propertyKey, propertyIndex) => {
              let hasCustomClassName = customColumnClassNames
                ? customColumnClassNames.filter(
                    (p) => p.property === propertyKey
                  )
                : [];
              return (
                <Fragment key={`${id}-${propertyKey}-${propertyIndex}`}>
                  <div className="md:hidden print:hidden odd-grid-cols-2:bg-default odd-grid-cols-2:md:bg-transparent print:odd-grid-cols-2:bg-transparent py-2 md:py-0 pl-4 md:pl-0">
                    {header[propertyKey]}
                  </div>
                  <div
                    className={`even-grid-cols-2:bg-default md:even-grid-cols-2:bg-transparent print:even-grid-cols-2:bg-transparent text-right md:text-left py-2 md:py-0 pr-4 md:pr-0 print:pr-0 print:even-grid-cols-2:bg-white print:text-left print:py-0 select-all ${
                      hasCustomClassName.length > 0
                        ? hasCustomClassName[0].className
                        : ""
                    }`}
                    style={{ wordBreak: "break-word" }}
                  >
                    {body({ row: item, column: propertyKey })}
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
        {renderDropdownItem && isAnyContextMenuItemsTrue && (
          <ContextMenu
            ref={wrapperRef}
            content={contextMenuData({ row: item })}
          />
        )}
      </Fragment>
    );
  },
  isEqual
);

BodyListItem.displayName = "BodyListItem";

const BodyItem = React.memo((props) => {
  const {
    listDataResults,
    lastElementRef,
    onAddRowClassName,
    style,
    autoSerialNumber,
    properties,
    customColumnClassNames,
    extraBorder,
    pageStates,
    header,
    body,
    renderDropdownItem,
    contextMenuData,
    printStyles,
  } = props;

  const renderAbleTableData = listDataResults;

  return renderAbleTableData?.map?.((item, itemIndex) => {
    const id = get(item, "id", "id");
    const refProp =
      renderAbleTableData.length === itemIndex + 1
        ? {
            ref: lastElementRef,
          }
        : {};
    const rowClassName =
      typeof onAddRowClassName === "function"
        ? onAddRowClassName({ row: item })
        : "";

    return (
      <div
        className={clsx(
          "print:py-0 print:break-inside-auto print:table-row-group md:border md:border-listItemBorder md:border-x-secondary md:border-t-secondary md:hover:bg-listItemHoverBg md:hover:!border-listItemHoverBorder",
          rowClassName,
          printStyles.listBody
        )}
        key={`${id}-${itemIndex}`}
        {...refProp}
      >
        <BodyListItem
          style={style}
          autoSerialNumber={autoSerialNumber}
          properties={properties}
          itemIndex={itemIndex}
          id={id}
          item={item}
          customColumnClassNames={customColumnClassNames}
          extraBorder={extraBorder}
          pageStates={pageStates}
          header={header}
          body={body}
          renderDropdownItem={renderDropdownItem}
          contextMenuData={contextMenuData}
          printStyles={printStyles}
        />
      </div>
    );
  });
}, isEqual);

BodyItem.displayName = "BodyItem";

const List = forwardRef((props, ref) => {
  const {
    loading,
    data,
    onChangeData,
    header,
    body,
    properties,
    autoSerialNumber,
    style,
    renderDropdownItem,
    contextMenuData,
    customColumnClassNames,
    extraBorder,
    onAddRowClassName,
    shouldRenderUniqueList,
    uniqueByIdentifier,
    printStyles,
  } = props;

  const [listData, setListData] = useState(data);
  const [isLoading, setIsLoading] = useState(loading);
  const [autoScroll, setAutoScroll] = useState(false);

  const listDataResults = useMemo(() => {
    const allListData = get(listData, "results", []);
    if (shouldRenderUniqueList) {
      return uniqBy(allListData, uniqueByIdentifier);
    } else {
      return allListData;
    }
  }, [listData, shouldRenderUniqueList, uniqueByIdentifier]);

  useEffect(() => {
    setListData(data);
    setIsLoading(loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading]);

  const renderAbleTableData = listDataResults;

  const HeaderItem = listDataResults?.map?.((item, itemIndex) => {
    const id = get(item, "id", "");
    const serialStyles = customColumnClassNames
      ? customColumnClassNames.find((item) => item.property === "si")
      : {};

    return itemIndex === 0 ? (
      <div
        key={`${id}-${itemIndex}-header`}
        className={`print:break-inside-avoid-page print:table-header-group  print:static z-10`}
      >
        <div
          className={clsx(
            `hidden md:grid gap-4 z-10 print:static top-16 px-4 print:px-0 py-4 border-y border-borderColor drop-shadow-md font-semibold text-xs uppercase print:capitalize text-left bg-default text-accent print:grid print:gap-x-3 print:bg-white print:font-bold print:border-b-2 print:border-t-2 print:py-1 print:my-2 print:border-y-0 print:border-b-black print:border-t-black print:drop-shadow-none print:text-black`,
            style.columnWidth,
            style.printColumnWidth,
            printStyles.listHeader
          )}
          style={{ wordBreak: "break-word" }}
        >
          {autoSerialNumber ? (
            <h6
              className={`print:self-end select-all ${
                serialStyles ? serialStyles.className : ""
              }`}
            >
              SL
            </h6>
          ) : (
            <></>
          )}
          {properties.map((propertyKey, propertyIndex) => {
            let hasCustomClassName = customColumnClassNames
              ? customColumnClassNames.filter((p) => p.property === propertyKey)
              : [];
            return (
              <h6
                key={`${propertyKey}-${propertyIndex}`}
                className={`print:self-end select-all ${
                  hasCustomClassName.length > 0
                    ? hasCustomClassName[0].className
                    : ""
                }`}
              >
                {header[propertyKey]}
              </h6>
            );
          })}
        </div>
      </div>
    ) : null;
  });

  const TableItem = (
    <div className="bg-secondary text-accent print:text-black print:table print:w-full print:divide-y print:divide-borderColor">
      {HeaderItem}
      <BodyItem
        listDataResults={renderAbleTableData}
        onAddRowClassName={onAddRowClassName}
        style={style}
        autoSerialNumber={autoSerialNumber}
        properties={properties}
        customColumnClassNames={customColumnClassNames}
        extraBorder={extraBorder}
        header={header}
        body={body}
        renderDropdownItem={renderDropdownItem}
        contextMenuData={contextMenuData}
        printStyles={printStyles}
      />
    </div>
  );

  const ListContentItem = (
    <div
      className={clsx(
        "text-sm flex flex-grow flex-col print:block print:px-4 print:pt-4 print:text-black",
        printStyles.listWrapper
      )}
    >
      {renderAbleTableData?.length > 0 ? (
        TableItem
      ) : (
        <>
          <NoDataFound
            heading="NO DATA FOUND"
            message="Please try again or change the filter."
          />
        </>
      )}
    </div>
  );

  return <>{ListContentItem}</>;
});

List.displayName = "List";

List.defaultProps = {
  useTanstackTable: false,
  autoSerialNumber: true,
  data: {},
  loading: false,
  renderDropdownItem: () => {},
  shouldRenderUniqueList: false,
  uniqueByIdentifier: "id",
  noDataFoundHeading: "",
  printStyles: {
    listWrapper: "print:text-sm",
    listHeader: "print:text-sm",
    listBody: "print:text-sm",
    listItemBody: "",
    printHeader: "print:text-sm",
    filterBadge: "print:text-sm",
  },
};

export default React.memo(List, isEqual);
