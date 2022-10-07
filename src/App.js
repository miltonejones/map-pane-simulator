import React from 'react'; 
import './App.css';

import {
  Button,
  Card,
  Divider,
  TextField,
  Stack,
  Box,
  Menu,
  MenuItem,
  Alert,
  IconButton,
  Typography,
  Slider,
  styled,
} from '@mui/material';


const IMAGE_ROOT = "https://associate-ui.s3.amazonaws.com/"

const IMAGES = [
  {
    src: 'map_layer_arlington',
    left: -1050,
    top: -496,
  },
  {
    src: 'map_layer_irving',
    left: -1130,
    top: -357,

  },
  {
    src: 'map_layer_carrollton',
    left: -1225,
    top: -230,

  },
]

const Pane = styled(Box)(() => ({
  position: 'relative',
  width: 400,
  height: 500,
  outline: 'solid 2px #371',
  overflow: 'hidden',
  borderRadius: 5
}));

function App() {
  const [state, setState] = React.useState({
    index: 2,
    offX: 0,
    offY: 0,
    factor: 1.5
  });
  const { index, offX, offY, factor } = state;
  const image = IMAGES[index];
  const { src, left, top } = image;
  const source = `${IMAGE_ROOT}${src}.png`;
 

  const style = {
    position: 'absolute',
    transition: "top 0.8s ease-out",

    left: (left + offX) * factor,
    top: (top + offY) * factor,


    width: 1920 * factor,
    height: 1080 * factor
  };

  return (
    <div className="App">
      <Stack sx={{p: 4}}>
        <Stack direction="row">
          
          {[0,1,2].map(num => <Button
          onClick={() => setState(s => ({...s, index: num}))}
          key={num} sx={{mr: 1, mb: 1}} disabled={num === index} variant="contained">{num}</Button> )}

        </Stack>
        <Pane  >
          <img src={source} alt="map" style={style} />
        </Pane>

       </Stack>

      <Card sx={{p: 2, m: 4, width: 360}}>

        <Typography>Settings</Typography>   
        <Divider sx={{mb: 2}}/>
        <Stack>

        <Typography> zoom: { factor }</Typography>   

        <Stack spacing={2} direction="row"> 
          <Slider aria-label="Volume" value={factor}
            marks
            step={.1}
            min={.5}
            max={2}
            onChange={(x,y) => setState(s => ({...s, factor: y}))} />
          <Button disabled={factor===1.5} variant="contained"
            onClick={() => setState(s => ({...s, factor: 1.5}))} >reset</Button>
        </Stack>

        <Typography>offset X: {offX}, left: {left + offX} </Typography>   

        <Stack spacing={2} direction="row"> 
          <Slider aria-label="Volume" value={offX}
            marks
            min={-100}
            max={100}
            onChange={(x,y) => setState(s => ({...s, offX: y}))} />
          <Button disabled={offX===0} variant="contained"
            onClick={() => setState(s => ({...s, offX: 0}))} >reset</Button>
        </Stack>

          <Typography>offset Y: {offY}, top: {top + offY} </Typography>   


          <Stack spacing={2} direction="row"> 
            <Slider aria-label="Volume" value={offY}
            
              marks
              min={-100}
              max={100}

              onChange={(x,y) => setState(s => ({...s, offY: y}))} />
 
            <Button disabled={offY===0} variant="contained"
               onClick={() => setState(s => ({...s, offY: 0}))} >reset</Button>
          </Stack>

        </Stack>
      </Card>
    </div>
  );
}

export default App;
