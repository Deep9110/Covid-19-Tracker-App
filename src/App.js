import React from 'react';

// import Cards from './components/Cards/Cards';
// import Chart from './components/Chart/Chart';
// import CountryPicker from './components/CountryPicker/CountryPicker';

import { Cards, Chart, CountryPicker,} from './components';
import styles from './App.module.css';

//import { ThemeProvider, cssBaseLine, Switch } from '@material-ui/core';
import { fetchData} from './api';

import coronaImage from './images/image.png';


            
class App extends React.Component{

    
    state ={
        data: {},
        country: '',
        

    }

    async componentDidMount(){
        const fetchedData = await fetchData();

        this.setState({data:fetchedData})
    }

    handleCountryChange = async(country) =>{
        const fetchedData = await fetchData(country);

        this.setState({data:fetchedData, country:country});
        
        //fetch the data
        //set the state
    }

    render(){
        const{data, country} = this.state;
        
        return(
            <div className={styles.container}>
            
                <img className={styles.image} src={coronaImage} alt="COVID-19"/> 
            <Cards data={data} />
            <CountryPicker handleCountryChange={this.handleCountryChange} />
            <Chart data={data} country={country}/>
            </div>
        );
    }
}

// export default function App() {
//     const [darkMode, setDarkMode] = useState(false);
//     return (
//       <div className={darkMode ? "dark-mode" : "light-mode"}>
//         <div className="container">
//           <span style={{ color: darkMode ? "grey" : "yellow" }}>☀︎</span>
//           <div className="switch-checkbox">
//             <label className="switch">
//               <input type="checkbox" onChange={() => setDarkMode(!darkMode)} />
//               <span className="slider round"> </span>
//             </label>
//           </div>
//           <span style={{ color: darkMode ? "#c96dfd" : "grey" }}>☽</span>
//         </div>
//       </div>
//     );
//   }
    
                
export default App;