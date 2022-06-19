import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow'

const BASE_URL = 'https://api.apilayer.com/exchangerates_data/latest'

function App() {
    const [currencyOptions, setCurrencyOptions] = useState([])
    const [fromCurrency, setFromCurrency] = useState()
    const [toCurrency, setToCurrency] = useState()
    const [exchangeRate, setExchangeRate] = useState()
    const [amount, setAmount] = useState(1)
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)



    const myHeaders = new Headers();
    myHeaders.append("apikey", "54oATgfWEn3Bej52EnVaCvItzKvTi8tM");

    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };


    useEffect(() => {

        fetch("https://api.apilayer.com/exchangerates_data/latest", requestOptions)
            .then(response => response.text())
            .then(data => {

                const FormattedData = JSON.parse(data);
                const firstCurrency = Object.keys(FormattedData.rates)[0]
                setCurrencyOptions([FormattedData.base,...Object.keys(FormattedData.rates)])
                setFromCurrency(FormattedData.base)
                setToCurrency(firstCurrency)
                setExchangeRate(FormattedData.rates[firstCurrency])

            })
            .catch(error => console.log('error', error));
    }, [])

    useEffect(() => {
            if (fromCurrency != null && toCurrency != null) {
            fetch(`${BASE_URL}?symbols=${toCurrency}&base=${fromCurrency}`,requestOptions)
                .then(res => res.json())
                .then(data => setExchangeRate(data.rates[toCurrency]))
        }
    }, [fromCurrency, toCurrency])

    function handleFromAmountChange(e) {
        setAmount(e.target.value)
        setAmountInFromCurrency(true)
    }

    function handleToAmountChange(e) {
        setAmount(e.target.value)
        setAmountInFromCurrency(false)
    }

    let toAmount, fromAmount

    if (amountInFromCurrency) {
        fromAmount = amount
        toAmount = (amount * exchangeRate).toFixed(2)

    } else {
        toAmount = amount
        fromAmount = (amount / exchangeRate).toFixed(2)
    }


    return (
        <>
            <h1>Exchange Converter 💸</h1>
            <CurrencyRow
                key={2}
                currencyOptions={currencyOptions}
                selectedCurrency={fromCurrency}
                onChangeCurrency={e => setFromCurrency(e.target.value)}
                onChangeAmount={handleFromAmountChange}
                amount={fromAmount}

            />
            <div className="equals">=</div>
            <CurrencyRow
                key={1}
                currencyOptions={currencyOptions}
                selectedCurrency={toCurrency}
                onChangeCurrency={e => setToCurrency(e.target.value)}
                onChangeAmount={handleToAmountChange}
                amount={toAmount}
            />
        </>
    );
}

export default App;