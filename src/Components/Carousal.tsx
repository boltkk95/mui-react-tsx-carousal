import { Box, Stack, ImageList, ImageListItem ,IconButton, Typography} from '@mui/material';
import { useState, useEffect } from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

type CarousalProps = {
    photos:{
        id : string
        title: string
        url : string
        summary: string
    }[]
}
function Carousal(props: CarousalProps) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isplaying,setIsplaying] = useState(true)

    const [intervalId,setIntervalId] = useState<NodeJS.Timer | undefined>() 

    useEffect(() => {
          resumeFunction()
      }, []);
      
      function pauseFunction() {
        clearInterval(intervalId);
        setIsplaying(false)
         // Pause the interval
      }
      
      function resumeFunction() {
        setIntervalId(setInterval(myTimer, 3000));
        setIsplaying(true);
         // Resume the interval
      }
    
      let timer = currentIndex
    function myTimer() {
            timer= (timer+1) % props.photos.length;
            setCurrentIndex(timer);
    }

    const next = () => {
        setCurrentIndex((currentIndex + 1) % props.photos.length);
      };
    
    const prev = () => {
        setCurrentIndex((currentIndex - 1 + props.photos.length) % props.photos.length);
      };


    return (
      <>
        <Stack display='flex' spacing={2} direction={{xs: 'column', sm: 'row'}} padding={1}> 

            <Box sx={{ width: '48%' ,p:1}}> 

            <Stack spacing={2} direction= 'column'>

                        <ImageList sx={{ width: {xs:350 , sm: 550, md:800, lg:1200}, height: {xs:200, md: 350},position: 'relative'}}>
                                <ImageListItem sx={{borderRadius: 200}}>
                                    <img 
                                    src={props.photos[currentIndex].url} 
                                    alt={props.photos[currentIndex].title} 
                                    style={{borderRadius: 30}} />
                                </ImageListItem>
                        </ImageList>

                        <IconButton sx={{position: 'absolute',top: '49%',left: '24%'}} >
                                    {isplaying ? <PauseCircleIcon onClick={pauseFunction} /> : 
                                    <PlayCircleOutlineIcon onClick={resumeFunction} />}
                        </IconButton>

                        <Box sx={{ width: {xs:200 , sm: 300, md:350, lg:400}}}>
                            <Stack spacing={0.1} direction='row'>
                                <IconButton onClick={prev}>
                                    <ArrowBackIosIcon />
                                </IconButton>

                                <ImageList  sx={{ width: 'auto', height: '25' }} cols={5}>
                                    {props.photos.map((photo) => (
                                        <ImageListItem sx={{borderRadius: 20}}key={photo.id}>
                                            <img 
                                            src={photo.url} 
                                            alt={photo.title}  
                                            onClick={() => setCurrentIndex(props.photos.indexOf(photo))}/>
                                        </ImageListItem>
                                        ))}
                                </ImageList>

                                <IconButton onClick={next}>
                                    <ArrowForwardIosIcon />
                                </IconButton>

                            </Stack>
                        </Box>

                    </Stack>   
            </Box>

            <Box sx={{ width: '34%', p: 2}}> 
                <Typography variant='h3' component='h1' gutterBottom> {props.photos[currentIndex].title} </Typography>
                <Typography align='center'>
                    {props.photos[currentIndex].summary}
                </Typography>
            </Box>

        </Stack>
      </>
    );
  }
export default Carousal;