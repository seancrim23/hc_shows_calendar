import statesMapping from '../assets/StatesMapping.json';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Grid from '@mui/material/Grid';


function ShowFilters({ setShowList, setHasError, setStateSelected }) {
    const [stateCode, setStateCode] = useState('');
    const [cityList, setCityList] = useState([]);
    const [city, setCity] = useState('');

    const handleStateChange = (event) => {
        setCity('')
        setStateCode(event.target.value);
        setStateSelected(event.target.value);
        setCityList(statesMapping[event.target.value]);
        fetchShows({ state: event.target.value, city: '' })
    };

    const handleCityChange = (event, newValue) => {
        setCity(newValue);
        fetchShows({ state: stateCode, city: newValue })
    }

    const handleClearSearchFilters = (event) => {
        setStateCode('');
        setStateSelected('');
        setCityList([]);
        setCity('');
        setShowList([]);
    }

    //TODO is query params best way? or does it matter?
    //TODO do i need to do anything to protect query params?
    async function fetchShows(filters) {
        //state at least will always be included in this request
        let url = "http://localhost:8080/show?state=" + encodeURIComponent(filters.state);
        //let url = process.env.HC_CALENDAR_APP_BACK_URL + '/show?state=' + filters.state;

        //if filters city exists and is not empty...
        if (filters.city && filters.city !== '') {
            url = url + '&city=' + encodeURIComponent(filters.city);
        }
        //if state is not empty
        //append &
        console.log("url: " + url);
        console.log("getting shows with filters: " + JSON.stringify(filters));
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const responseData = await response.json();
            if (responseData) {
                setShowList(responseData);
            } else {
                setShowList([]);
            }
        } catch (error) {
            console.log(error)
            console.log("log out the error here but don't return it to the user")
            console.log("do i need to add specific code handling?")
            setHasError(true);
        }
    }

    return (
            <Grid item size={12} sx={{display: 'static'}}>
                <FormControl sx={{ m: 1, minWidth: { xs: 210, sm: 65, md: 65, lg: 115, xl: 95 }, fontSize: { xs: 8, sm: 8 }, }}>
                    <InputLabel id="state-label">State</InputLabel>
                    <Select
                        labelId="state-label"
                        id="state-select"
                        value={stateCode}
                        label="StateCode"
                        onChange={handleStateChange}
                    >
                        {
                            Object.keys(statesMapping).map((key, i) => (
                                <MenuItem sx={{
                                }} key={i} value={key}>{key}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            {stateCode &&
                <>
                        <FormControl sx={{ m: 1,  minWidth: { xs: 40, sm: 60, md: 80, lg: 120, xl: 120 } }}>
                            <Autocomplete
                                disablePortal
                                id="city-list"
                                options={cityList}
                                sx={{width: { xs: 210, sm: 170, md: 175, lg: 240, xl: 220 } }}
                                renderInput={(params) => <TextField {...params} label="City" />}
                                value={city}
                                onChange={handleCityChange}
                                isOptionEqualToValue={(city, value) => city.value === value.value}
                            />
                        </FormControl>
                        <Button underline="none" variant="outlined" component="button" color="inherit" sx={{ 
                            marginTop: {xs: '3px', sm:'15px', md: '17px', lg:'17px', xl: '17px'}, 
                            marginLeft: {xs: '50px', sm: '8px', md: '10px', lg: '18px', xl: '18px'},
                            marginBottom: {xs: '7px', sm: '0px', md: '0px', lg: '0px', xl: '0px'},
                            fontSize: { xs: 10, sm: 13, md: 13, lg: 14, xl: 14 }
                        }} 
                        onClick={handleClearSearchFilters}>Clear filters</Button>
                </>}
                </Grid>
    )
}

export default ShowFilters;