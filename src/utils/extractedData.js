export const extractedData = (dataSource, filterId, filterTitle) => {
  return dataSource.filter((dataItem) => dataItem[filterTitle] === filterId);
};
