import { Item } from '../utility/calc';

const Receipt = ({ listOutput, totalTax, grandTotal }: { listOutput: Item[], totalTax: string, grandTotal: string}) => {
    return listOutput.length !== 0 ? (
      <ul>
        {listOutput.map((item, i) => {
          const qty = item.quantity
          const multiple = qty > 1;
          const desc = item.description;
          const subTotal = item.subTotal();
          const total = (item.quantity * subTotal).toFixed(2);
  
          return (
            <li key={`${i}_${item}`}>
              {multiple ?
              `${desc}: ${total} (${qty} @ ${subTotal.toFixed(2)})`:
              `${desc}: ${subTotal.toFixed(2)}`}
            </li>
          )
        })}
        <li>Sales Taxes: {totalTax}</li>
        <li>Total: {grandTotal}</li>
      </ul>
    ) : null;
  }

  export default Receipt;