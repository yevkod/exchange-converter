import React from 'react';
import './CurrencyInput.css'

export default function CurrencyRow(props) {
    const {
        currencyOptions,
        selectedCurrency,
        onChangeCurrency,
        onChangeAmount,
        amount
    } = props

    return (
        <div className='group'>
            <input type="number" className="input" value={amount} onChange={onChangeAmount} />
            <select value={selectedCurrency} onChange={onChangeCurrency}>
                {currencyOptions.map((option,index) => (
                    <option key={index} value={option} >{option} </option>
                ))}
            </select>
        </div>
    )
}
