export const checkDefinedValue = (value: any) => {
	return value === "" || value === null || value === undefined ? false : true;
};
