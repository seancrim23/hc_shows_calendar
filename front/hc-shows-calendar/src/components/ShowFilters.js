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
        <>
            <Box sx={{ minWidth: 160 }}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
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
                                <MenuItem key={i} value={key}>{key}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                {stateCode &&
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 160 }}>
                            <Autocomplete
                                disablePortal
                                id="city-list"
                                options={cityList}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="City" />}
                                value={city}
                                onChange={handleCityChange}
                                isOptionEqualToValue={(city, value) => city.value === value.value}
                            />
                        </FormControl>
                        <Button underline="none" component="button" color="inherit" onClick={handleClearSearchFilters}>Clear filters</Button>
                    </div>}
            </Box>
        </>
    )
}

export default ShowFilters;