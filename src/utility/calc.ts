/* 
Assuming we get an array of items we will want to:
    1. Tally the items
    2. Determine whether the item is imported
    3. 


*/
  
export class Item {
    price: number;
    quantity: number;
    imported: boolean;
    description: string;
    duty: number;
    taxes: number;
    taxable: boolean;

    constructor(str: string){
        this.price = this.getPrice(str);
        this.quantity = this.getQty(str);
        this.imported = this.isImported(str);
        this.description = this.getDesc(str);
        this.taxable = this.isTaxable();
        this.duty = this.calcDuty();
        this.taxes = this.calcTaxes();
    }

    getPrice(str: string):number {
        const [price] = str.split(' ').reverse();

        return Number(price);
    }

    getQty(str: string): number {
        const [qty] = str.split(' ');

        return Number(qty);
    }

    isImported(str: string): boolean {

        return str.toLowerCase().includes('imported');
    }

    getDesc(str: string): string {
        const importIndex = this.imported ? 10 : 1;
        const prefixRemoved = str.slice(str.indexOf(' ') + importIndex, str.lastIndexOf(' '));
        const suffixRemoved = prefixRemoved.slice(0, prefixRemoved.lastIndexOf(' '))
        return suffixRemoved;
    }

    calcDuty(): number {
        if (!this.imported) return 0;

        return this.price * 0.05
    }

    isTaxable(): boolean {
        const books = ['book', 'books'];
        const food = ['chocolate', 'chocolates'];
        const medicine = ['medicine', 'pills'];

        return [...books, ...food, ...medicine].some((word)=>{
            return this.description.toLowerCase().includes(word);
        })
    }

    calcTaxes(): number {
        if (!this.taxable) return 0;

        const exact = this.price * 0.1;
        const roundUp = Math.ceil(exact * 20) / 20;

        return roundUp;
    }

    get subTotal():number {
        return this.price + this.duty
    }
}