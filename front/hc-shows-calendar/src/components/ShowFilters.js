import statesMapping from '../assets/StatesMapping.json';
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

    //TODO dont think error setting is the best way i can do it, update when have time
    async function fetchShows(filters) {
        let url = process.env.REACT_APP_BACK_URL + '/show?state=' + encodeURIComponent(filters.state) + "&date_range=week";

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
                            Object.keys(statesMapping)
                            .sort((a, b) => a.localeCompare(b))
                            .map((key, i) => (
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