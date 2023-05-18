import React from 'react';
import './App.css';
import { Box} from '@mui/material';
import Carousal from './Components/Carousal';
import {photos} from './Assets/ImageList'


function App() {
  return (
    <Box height='100vh'>
    <div className="App">
      <Carousal photos={photos}/>
    </div>
    </Box>
  );
}

export default App;
