import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'
import Coin from './Coin';

function App() {

  const[coins, setCoins] = useState([]);
  const[search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false').then
    (res => {
      setCoins(res.data);
      console.log(res.data);
    }).catch(error => console.log('error'));
  },[])

  const handleChanged = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div className='coin-app'>
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input type="text" placeholder='search' className="coin-input" onChange={handleChanged} />
        </form>
      </div>
      {filteredCoins.map(coin => {
        return(
          <Coin key={coin.id}
                name={coin.name}
                symbol={coin.symbol}
                image={coin.image}
                price={coin.current_price}
                marketcap={coin.market_cap}  
                priceChange={coin.price_change_percentage_24h}
                volume={coin.total_volume}  />
        )
      })}
    </div>
  )
}

export default App