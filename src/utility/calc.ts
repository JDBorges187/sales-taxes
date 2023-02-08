/* 
Assuming we get an array of items we will want to:
    1. Tally the items
    2. Determine whether the item is imported
    3. 


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

    constructor(str: string){
        this.itemString = str.trim()
        this.price = this.getPrice();
        this.quantity = this.getQty();
        this.imported = this.isImported();
        this.description = this.getDesc();
        this.taxable = this.isTaxable();
        this.duty = this.calcDuty();
        this.taxes = this.calcTaxes();
    }

    getPrice():number {
        const str = this.itemString;
        const [price] = str.split(' ').reverse();
  
        return Number(price);
    }
    
    getQty(): number {
        const str = this.itemString;
        const [qty] = str.split(' ');
        
        return Number(qty);
    }
    
    isImported(): boolean {
        const str = this.itemString;
        
        return str.toLowerCase().includes('imported');
    }
    
    getDesc(): string {
        const str = this.itemString;
        
        const importIndex = this.imported ? 10 : 1;
        const prefixRemoved = str.slice(str.indexOf(' ') + importIndex, str.lastIndexOf(' '));
        const suffixRemoved = prefixRemoved.slice(0, prefixRemoved.lastIndexOf(' '))
        return suffixRemoved;
    }

    calcDuty(): number {
        if (!this.imported) return 0;

        const exact = this.price * 0.05;
        const roundUp = Math.ceil(exact * 20) / 20;
        return roundUp; 
    }

    isTaxable(): boolean {
        const books = ['book', 'books'];
        const food = ['chocolate', 'chocolates'];
        const medicine = ['medicine', 'pills'];

        const exempt = [...books, ...food, ...medicine].some((word)=>{
            return this.description.toLowerCase().includes(word);
        })

        return !exempt;
    }

    calcTaxes(): number {

        if (!this.taxable) return 0;
        
        const exact = this.price * 0.1;
        const roundUp = Math.ceil(exact * 20) / 20;
        // console.log(exact, roundUp);

        return roundUp;
    }

    subTotal():number {
        return this.price + this.duty + this.taxes;
    }

    static taxTotal(...items: Item[]) {
        return items.reduce((acc, item) => {
            // add the taxes and duty for every item
           return (acc + item.taxes + item.duty)
        }, 0).toFixed(2);
    }

}
