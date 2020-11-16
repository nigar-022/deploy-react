import React, { Component } from 'react'
import './style.css'
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        display: 'flex',
        '& > *': {


          
        },
      },
      
  };

 class CountriesAPI extends Component {
     constructor(props) {
        super(props);

        this.inputRef = React.createRef();

        this.state = {
            items: [],
            demonym: '',
            currencies: [],
            population: '',
            callingCodes: [],
            name:'',
            flag: '',
            capital: '',

        };

      

     }

     componentDidMount()
     {
        fetch("https://restcountries.eu/rest/v2/all")
        .then(resp => resp.json())
        .then(data => {
            
            this.setState({
                items: data,
            })
            console.log(data);
            
         })
        .catch(err => console.log("Error:",err));

        console.log(this.inputRef.current);


    }

    selectRegion = (event) =>
    {
        this.setState({ value: event.target.value});
        console.log(event.target.value);
        
    }

    selectCountry = (event) =>
    {
        
        //console.log(event.target.value);

        const {items} = this.state;
        const countriesData =  items.find(country => country.alpha3Code === event.target.value);

        console.log(countriesData);

        this.setState({

            value: event.target.value,
            demonym: countriesData.demonym,
            capital: countriesData.capital,
            population: countriesData.population,
            currencies: countriesData.currencies.filter(c => c.name).map(c => `${c.name}  (${c.code})`).join(", "),
            callingCodes:`+${countriesData.callingCodes[0]}`,
            name: countriesData.name,
            flag: countriesData.flag,
        


        });
        

        
    };



    render() {
        const { items} = this.state;
       

        return (
            
            <div>

                <div id="main-container" >
                    
                

                    <div className="root" >
                    <Avatar style={{ height: '100px', width: '100px'}} variant="rounded" alt="Flag Of country" src={this.state.flag}>Flag</Avatar>
                
                    </div>
                    <div id="info-container">
                        
                    <select id="region" onChange={this.selectRegion} ref={this.inputRef}>
                            {items.map(item => (
                                <option key={item.value} value={item.region}>
                                {item.region}
                                </option>
                            )) 
                            }
                            
                        </select>
            
                        <select id="countries" onChange={this.selectCountry} >

                        {items.filter(item => item.region === this.inputRef.current.value).map(item => (
                                <option key={item.value} value={item.alpha3Code}>
                                {item.name}
                                </option>
                            ))}

                            
                            
                        </select>  

                        
                        
                        <TextField id="selectedContry" label="Country" value={this.state.name} variant="outlined"></TextField>
                        <TextField id="capital" label="Capital" value={this.state.capital} variant="outlined"></TextField>
                        <TextField id="demonym" label="Demonym" value={this.state.demonym} variant="outlined"></TextField>
                        <TextField id="calling-code" label="Calling Codes" value={this.state.callingCodes} variant="outlined"></TextField>
                        <TextField id="currencies" label="Currencies" value={this.state.currencies} variant="outlined"></TextField>
                        <TextField id="population" label="Population" value={this.state.population} variant="outlined"></TextField>
                


                 </div>

            </div>          
                       
                        
    </div>
                        
          
            
        
        )
        
    }
}


export default withStyles(styles) (CountriesAPI);
