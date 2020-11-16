import React, { Component } from 'react'
import './style.css'
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        display: 'flex',
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
            regions: [],

        };

      

     }

     componentDidMount()
     {
        fetch("https://restcountries.eu/rest/v2/all")
        .then(resp => resp.json())
        .then(data => {
            
            this.setState({
                items: data,
                regions: this.getUniqueRegions(data),
            })
            //console.log(data);
            
         })
        .catch(err => console.log("Error:",err));



    }


    getUniqueRegions = (items) => {
        // var regionsArray = new Set();
        // items.map(r => regionsArray.add(r.region));

        const regions = [];

        items.map(r => {
        if (regions.indexOf(r.region) === -1) {
        regions.push(r.region)}
         });

        return regions;

    }
    



    selectRegion = (event,items) =>
    {
        this.setState({ value: event.target.value});
        // console.log(event.target.value);   
        

    }

    selectCountry = (event) =>
    {
        

        const {items} = this.state;
        const countriesData =  items.find(country => country.alpha3Code === event.target.value);

        // console.log(countriesData);

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
        const { items, regions} = this.state;
       

        return (
            
            <div>

                <div id="main-container" >
                    
                

                    <div className="root" >
                    <Avatar  style={{ height: '100px', width: '100px' }} variant="rounded" alt="Flag Of country" src={this.state.flag}>Flag</Avatar>
                
                    </div>
                    <div id="info-container">
                        
                    <select id="region" onChange={this.selectRegion} ref={this.inputRef} >
                        
                        
                            {regions.map(item => (
                                <option key={item.region} value={item.region}>
                                {item}
                                </option>
                            )) 
                            }
                            
                        </select>
            
                        <select id="countries" onChange={this.selectCountry} >

                        {items.filter(item => item.region === this.inputRef.current.value).map(item => (
                                <option key={item.name} value={item.alpha3Code}>
                                {item.name}
                                </option>
                            ))}

                            
                            
                        </select>  


                        
                        
                        <TextField margin="normal" id="selectedContry" label="Country" value={this.state.name} variant="outlined"></TextField>
                        <TextField margin="normal" id="capital" label="Capital" value={this.state.capital} variant="outlined"></TextField>
                        <TextField margin="normal" id="demonym" label="Demonym" value={this.state.demonym} variant="outlined"></TextField>
                        <TextField margin="normal" id="calling-code" label="Calling Codes" value={this.state.callingCodes} variant="outlined"></TextField>
                        <TextField margin="normal" id="currencies" label="Currencies" value={this.state.currencies} variant="outlined"></TextField>
                        <TextField margin="normal" id="population" label="Population" value={this.state.population} variant="outlined"></TextField>
                


                 </div>

            </div>          
                       
                        
    </div>
                        
          
            
        
        )
        
    }
}


export default withStyles(styles) (CountriesAPI);
