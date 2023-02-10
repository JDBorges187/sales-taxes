/* 
Assuming we get an array of items we will want to:
    1. Tally the items
    2. Determine whether the item is imported
    3. Filter out the price, description and quantity
    4. Provide a way to get Total Tax, subTotal and Grand Total

*/

/**
 * Class representing a single Item.
 * @param {string} str - string representing the item
 */
export class Item {
    itemString: string;
    price: number;
    quantity: number;
    imported: boolean;
    description: string;
    duty: number;
    taxes: number;
    taxable: boolean;

    constructor(str: string) {
        this.itemString = str.trim()
        this.price = this.getPrice();
        this.quantity = this.getQty();
        this.imported = this.isImported();
        this.description = this.getDesc();
        this.taxable = this.isTaxable();
        this.duty = this.calcDuty();
        this.taxes = this.calcTaxes();
    }

    /**
     * Returns the price of the item
     * @returns {number} - price of the item
     */
    getPrice(): number {
        const str = this.itemString;
        const [price] = str.split(' ').reverse();

        const priceNum = Number(price);
        if (isNaN(priceNum)) throw new Error(`error processing ${str}`);

        return priceNum;
    }

    /**
     * Returns the quantity of the item
     * @returns {number} - quantity of the item
     */
    getQty(): number {
        const str = this.itemString;
        const [qty] = str.split(' ');

        const qtyNum = Number(qty);
        if (isNaN(qtyNum)) throw new Error(`error processing ${str}`);

        return qtyNum;
    }

    /**
     * Returns whether the item is imported
     * @returns {boolean} - indicating whether the item is imported
     */
    isImported(): boolean {
        const str = this.itemString;

        return str.toLowerCase().includes('imported');
    }

    /**
     * Returns the description of the item
     * @returns {string} - description of the item
     */
    getDesc(): string {
        const str = this.itemString;

        const prefixRemoved = str.slice(str.indexOf(' ') + 1, str.lastIndexOf(' '));
        const suffixRemoved = prefixRemoved.slice(0, prefixRemoved.lastIndexOf(' '))
        return suffixRemoved;
    }

    /**
     * Returns the duty calculated for the item
     * @returns {number} - duty calculated for item
     */
    calcDuty(): number {
        if (!this.imported) return 0;

        const exact = this.price * 0.05;
        const roundUp = Math.ceil(exact * 20) / 20;
        return roundUp;
    }

    /**
     * Returns whether the item is taxable
     * @returns {boolean} - is item taxable
     */
    isTaxable(): boolean {
        const books = ['book', 'books'];
        const food = ['chocolate', 'chocolates'];
        const medicine = ['medicine', 'pills'];

        const exempt = [...books, ...food, ...medicine].some((word) => {
            return this.description.toLowerCase().includes(word);
        })

        return !exempt;
    }

    /**
     * Returns the taxes calculated for the item
     * @returns {number} - tax calculated for item
     */
    calcTaxes(): number {

        if (!this.taxable) return 0;

        const exact = this.price * 0.1;
        const roundUp = Math.ceil(exact * 20) / 20;
        // console.log(exact, roundUp);

        return roundUp;
    }
    
    /**
     * Returns the subtotal including tax and duty for the item
     * @returns {number} - total calculated for item
     */
    subTotal(): number {
        return this.price + this.duty + this.taxes;
    }

    /**
     * Calculates the total tax of all the items in the list.
     * @param items The list of items to calculate the taxes for.
     * @returns The total tax of all the items in the list, rounded to 2 decimal places.
     */
    static taxTotal(...items: Item[]) {
        return items.reduce((acc, item) => {
            // add the taxes and duty for every item
            return (acc + ((item.taxes + item.duty) * item.quantity))
        }, 0).toFixed(2);
    }

    /**
     * Calculates the grand total (i.e., the sum of the subtotal) for all the items in the list.
     * @param items The list of items to calculate the grand total for.
     * @returns The grand total for all the items in the list, rounded to 2 decimal places.
     */
    static grandTotal(...items: Item[]) {
        return items.reduce((acc, item) => {
            const subTotal = item.subTotal();
            const qty = item.quantity;
            return (acc + (subTotal * qty))
        }, 0).toFixed(2);
    }
}
