import './App.css';
import { useCallback, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useEffect } from 'react';
import svgIcon from './icons/exchange-svgrepo-com.svg'

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

  const changeCurrencyType = () => {
    setFrom(to)
    setTo(from)
  }

  const fetchData = useCallback(() => {
    fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
    .then(response => response.json())
    .then(data => setInformation(data[from]))
  }, [from])

  useEffect(() => {
    fetchData();
    setVariants(Object.keys(information));
  }, [fetchData, information])

  return (
    <div className="App">
       <h1>Convert your currency fast!</h1>

       <div className='container'>

       <div className='input_and_choose_currency'>

          <form>
            <label htmlFor="input_currency">Write a number in {upperCase(from)}</label>
            <input
            id='input_currency'
            value={value}
            onChange={handleChange}
            type = "text">
            </input>
          </form>

          <div className='convert_to'>
          <label htmlFor="to_currency">Convert to</label>
          <Dropdown id='to_currency' options={variants} onChange={handleTo} value={to}/>
          </div>

          <div className='resault'>
            <p>Resault:</p>
            <p>{value === '' ? 0 : value} {upperCase(from)} = {value * information[to]} {upperCase(to)}</p>
          </div>
          
          <div className='convert_from'>
          <label htmlFor="from_currency">Convert from</label>
          <Dropdown id='from_currency' options={variants} onChange={handleFrom} value={from}/>
          </div>
          
        </div>

        <div className='buttonChange'>
            <img onClick={changeCurrencyType} src={svgIcon} alt='Exchange button icon'></img>
        </div>

      </div>
      <p className='nameDev'>Created by Daria Afanasieva❤️</p>
  </div>
);}

export default App;
