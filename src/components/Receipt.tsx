import { Item } from '../api/item';
import ReceiptItem from './ReceiptItem';

const Receipt = ({ listOutput, totalTax, grandTotal }: { listOutput: Item[], totalTax: string, grandTotal: string}) => {
    return listOutput.length !== 0 ? (
      <ul className="receipt">
        {listOutput.map((item, i) => (
            <ReceiptItem key={`${i}_${item}`} description={item.description} subTotal={item.subTotal()} quantity={item.quantity} />
          )
        )}
        <hr />
        <li className="receipt__tax">Sales Taxes: {totalTax}</li>
        <li className="receipt__total">Total: {grandTotal}</li>
      </ul>
    ) : null;
  }

  export default Receipt;