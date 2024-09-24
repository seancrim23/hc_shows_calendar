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


function ShowFilters({ setShowList, setHasError }) {
    const [stateCode, setStateCode] = useState('');
    const [cityList, setCityList] = useState([]);
    const [city, setCity] = useState('');

    const handleStateChange = (event) => {
        setCity('')
        setStateCode(event.target.value);
        setCityList(statesMapping[event.target.value]);
        fetchShows({ state: event.target.value, city: '' })
    };

    const handleCityChange = (event, newValue) => {
        setCity(newValue);
        fetchShows({ state: stateCode, city: newValue })
    }

    const handleClearSearchFilters = (event) => {
        setStateCode('');
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
        <>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                <FormControl sx={{width: {xs: '100%', sm: '100%', md: '95%', lg: '95%', xl: '95%'}}}>
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
            </Grid>
            {stateCode &&
                <>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <FormControl sx={{width: {xs: '100%', sm: '100%', md: '95%', lg: '95%', xl: '95%'}}}>
                            <Autocomplete
                                disablePortal
                                id="city-list"
                                options={cityList}
                                renderInput={(params) => <TextField {...params} label="City" />}
                                value={city}
                                onChange={handleCityChange}
                                isOptionEqualToValue={(city, value) => city.value === value.value}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} sx={{paddingTop:'10px'}}>
                        <Button sx={{width:'100%'}} underline="none" variant="outlined" component="button" color="inherit"
                            onClick={handleClearSearchFilters}>Clear filters</Button>
                    </Grid>
                </>}
        </>
    )
}

export default ShowFilters;