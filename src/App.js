import './App.css';
import { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useEffect } from 'react';

function App() {
  const [value, setValue] = useState(1);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("uah");
  const [variants, setVariants] = useState([]);
  const [information, setInformation] = useState({});

  const upperCase = (e) => {
    return e.toUpperCase()
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleFrom = (e) => {
    setFrom(e.value)
  }

  const handleTo = (e) => {
    setTo(e.value)
  }

  const fetchData = () => {
    fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
    .then(response => response.json())
    .then(data => setInformation(data[from]))
  }

  useEffect(() => {
    fetchData()
    setVariants(Object.keys(information))
  }, [information])

  return (
    <div className="App">
       <h1>Convert your currency fast!</h1>

       <div className='input_and_choose_currency'>
          <form>
            <label for="input_currency">Write a number in {upperCase(from)}</label>
            <input
            id='input_currency'
            value={value}
            onChange={handleChange}
            type = "text">
            </input>
          </form>

          <Dropdown options={variants} onChange={handleFrom} value={from}/>

          <div className='resault'>
            <p>Resault:</p>
            <p>{value === '' ? 0 : value} {upperCase(from)} = {value * information[to]} {upperCase(to)}</p>
          </div>

          <Dropdown options={variants} onChange={handleTo} value={to}/>
       
        </div>
    </div>
  );
}

export default App;
