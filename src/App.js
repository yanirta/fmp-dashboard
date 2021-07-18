//https://material-ui.com/


import React, { useState } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import PrimarySearchAppBar from './PrimarySearchAppBar';

const fmp_api = "https://fmpcloud.io/api/v3";
const from_profile_api = fmp_api + '/profile/'
function App() {
  const [symbol, setSymbol] = useState("");
  // useEffect(() => { retrieveProfile('AAPL') }, [])

  return (
    <div>
      <CssBaseline />
      <PrimarySearchAppBar onSearch={setSymbol}></PrimarySearchAppBar>
      <h1>Financial Modeling Prep Dashboard</h1>
      <Profile symbol={symbol}></Profile>
      {/* <p> api url = {fmp_api}</p> */}
      {/* <p> apikey={process.env.REACT_APP_APIKEY}</p> */}
    </div>
  );
}

function Profile({ symbol }) {
  if (!symbol || symbol === undefined || symbol === "") { return null; }
  const [data, setData] = useState();
  const retrieveProfile = async (symbol) => {
    const fmp_profile = new URL(symbol, from_profile_api);
    fmp_profile.searchParams.append("apikey", process.env.REACT_APP_APIKEY);
    var res = await fetch(fmp_profile).catch((e) => alert(e));
    var data = await res.json();
    setData(JSON.stringify(data))
  }

  retrieveProfile(symbol);
  // useEffect(() => { retrieveProfile(symbol) }, [])

  return (
    <p>
      {data}
    </p>);
}
export default App;
