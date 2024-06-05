import statesMapping from '../assets/StatesMapping.json';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

//should this component be separate from the search?
//is it better to load options from a db? or store as a json and read based on that?
//when you pick a state, load all possible cities (dont have to pick one)
//imo should just change based on filters, shouldnt have to even click search
//just pick your desired filters and shows for a week(?) should immediately pop up
/*

                {Object.keys(statesMapping).map((key, i) => (
                    <p key={i}>
                        <span>key: {key}</span>
                        <span>value: {statesMapping[key]}</span>
                    </p>
                ))}
                */
//limit amount of cities shown?
//add search to cities and state
function ShowList() {
    const [stateCode, setStateCode] = useState('');
    const [cityList, setCityList] = useState([]);
    const [city, setCity] = useState('');
    const [showList, setShowList] = useState([]);

    const handleStateChange = (event) => {
        setStateCode(event.target.value);
        setCityList(statesMapping[event.target.value]);
        //this should search each time this filter changes
        fetchShows()
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
        //this should search each time this filter changes
        fetchShows()
    }

    const fetchShows = () => {
        var requestBody = {state: '', city: ''}
        if (stateCode !== '') {
            requestBody.state = stateCode;
        }
        if (city !== '') {
            requestBody.city = city;
        }
        console.log("request body is: " + JSON.stringify(requestBody));
        //set show list to whatever the results are
    }

    return (
        <>
            <Box sx={{ minWidth: 160 }}>
                <FormControl sx={{m: 1, minWidth: 120}}>
                    <InputLabel id="demo-simple-select-label">State</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={stateCode}
                        label="StateCode"
                        onChange={handleStateChange}
                    >
                    {
                        Object.keys(statesMapping).map((key, i) => (
                            <MenuItem key={i} value={key}>{key}</MenuItem>
                        )) 
                    }
                    </Select>
                </FormControl>
                {stateCode && <FormControl sx={{m: 1, minWidth: 160}}>
                    <InputLabel id="demo-simple-select-label-2">City / Town / Municipality</InputLabel>
                    <Select
                        labelId="demo-simple-select-label-2"
                        id="demo-simple-select-2"
                        value={city}
                        label="City"
                        onChange={handleCityChange}
                    >
                    {cityList.map((city) => (
                        <MenuItem value={city}>{city}</MenuItem>
                    ))}
                    </Select>
                </FormControl>}
            </Box>
            {(showList.length === 0) && <p>Choose filters to find shows near you!</p>}
        </>
    )
}

export default ShowList;