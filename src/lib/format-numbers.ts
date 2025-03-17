
export const formatNumber = (num: number, slice: string = ","): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, slice);
};

export const formatCurrency = (num: number, currencySymbol: string): string => {
    return `${formatNumber(num, " ")} ${currencySymbol}`;
};
