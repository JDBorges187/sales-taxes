import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Item } from '../utility/calc';

const Form = () => {

  const [ textInput, setTextInput ] = useState('');
  const [ itemsArray, setItemsArray ] = useState<string[]>([]);
  const [ listOutput, setListOutput ] = useState<Item[]>([]);

  useEffect(() => {
    const newArray = itemsArray.map(item=>new Item(item));
    console.log(newArray);
    setListOutput(newArray);

    console.log(Item.taxTotal(...newArray));
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
      console.log(itemDesc, numCount)

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
        {/* {listOutput.length && 
        listOutput.map((item) => {
          const desc = (item.imported ? "Imported ": "") + item.description
          return <li key={desc}>{desc}: {item.totalPrice}</li>
        })} */}
      </ul>
    </div>
  );
}

export default Form