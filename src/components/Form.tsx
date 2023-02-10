import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Item } from '../api/item';
import { handleDuplicates, placeholder } from '../utility/utility';
import Receipt from './Receipt';

const Form = () => {

  const [ textInput, setTextInput ] = useState('');
  const [ itemsArray, setItemsArray ] = useState<string[]>([]);
  const [ listOutput, setListOutput ] = useState<Item[]>([]);
  const [ totalTax, setTotalTax ] = useState('');
  const [ grandTotal, setGrandTotal ] = useState('');
  const [ isError, setIsError ] = useState(false);

  useEffect(() => {
    try {
      const newArray = itemsArray.map(item=>new Item(item));
      setListOutput(newArray);
      setTotalTax(Item.taxTotal(...newArray));
      setGrandTotal(Item.grandTotal(...newArray));
    } catch(e) {
      console.log(e);
      setIsError(true);
    }
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
    setItemsArray([]);
    setIsError(false);
  }

  const errorStyles = {display: isError ? 'block' : 'none', color: '#f00'}

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h3 className="form__title">Items Input</h3>
        <p className="form__description">Enter items to calculate your sales tax</p>
        <textarea
          className={`form__input ${isError ? 'error' : ''}`}
          placeholder={placeholder}
          onChange={updateTextArea}
          value={textInput} 
          required/>
        <p className="form__error-message" style={errorStyles}>Please check your input and try again.</p>
        <button className="form__button" type="submit">
          Calculate 
          <i className="form__button-arrow">&#x2192;</i>
          </button>
      </form>
      <Receipt listOutput={listOutput} totalTax={totalTax} grandTotal={grandTotal} />
    </div>
  );
}

export default Form;