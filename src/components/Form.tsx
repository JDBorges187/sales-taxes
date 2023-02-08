import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Item } from '../utility/calc';

const Form = () => {

  const [ textInput, setTextInput ] = useState('');
  const [ itemsArray, setItemsArray ] = useState<string[]>([]);
  const [ listOutput, setListOutput ] = useState<Item[]>([]);
  const [ totalTax, setTotalTax ] = useState('');
  const [ grandTotal, setGrandTotal ] = useState('');

  useEffect(() => {
    const newArray = itemsArray.map(item=>new Item(item));
    
    setListOutput(newArray);
    setTotalTax(Item.taxTotal(...newArray));
    setGrandTotal(Item.grandTotal(...newArray));

  },[itemsArray])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const itemsList = textInput.split('\n').map((item)=>{
      return item.trim();
    });
    const deDupedList = handleDuplicates(itemsList);
    setItemsArray(deDupedList);
  }

  const updateTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.target.value.replace(/\n{2,}/g, '\n'))
  }

  const handleDuplicates = (arr: string[]): string[] => {
    interface mapType {
      [key:string]: number;
    }

    const freqMap: mapType = {};

    arr.forEach((item) => {
      if (item == '') return;
      const [count, ...rest] = item.split(' ');
      const itemDesc = rest.join(' ');
      const numCount = Number(count);
      if (numCount < 1) return;

      if (itemDesc in freqMap) {
        freqMap[itemDesc] += numCount;
      } else {
        freqMap[itemDesc] = numCount;
      }
    })
    
    const arrWithCount = Object.keys(freqMap).map((item)=>{
      return `${freqMap[item]} ${item}`
    })

    return arrWithCount;
  }

  const placeholder = `Enter your items here as a list...
Example:
1 Book at 12.49
1 Book at 12.49
1 Music CD at 14.99
1 Chocolate bar at 0.85`;

  const Receipt = listOutput.length !== 0 ? (
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

  return (
    <div className="form_wrapper">
      <form onSubmit={handleSubmit}>
        <h3>Items Input</h3>
        <p>Enter the items you would like to calculate</p>
        <textarea
          placeholder={placeholder}
          onChange={updateTextArea}
          value={textInput} />

        <button type={'submit'}>Calculate</button>
      </form>
      <ul>
        {Receipt}
      </ul>
    </div>
  );
}

export default Form