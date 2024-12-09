const formatMoney = (monney) => {
    const formatter = new Intl.NumberFormat("de-VN", {
        style: "currency",
        currency: "VND",
    });

    return formatter.format(monney);
};
export default formatMoney;