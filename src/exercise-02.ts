const prices: number[] = [10, 20, 30];

function getPrice(index: number) {
    return prices[index];
}

function applyDiscount(price: number, percent: number) {

    return price - price * (percent / 100);
}
const price = getPrice(1);
if (price === undefined) {
    console.log("price not found")
} else {
    const finalDisc = applyDiscount(price, 10);
    console.log(finalDisc);
}

