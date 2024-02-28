import React, { useState, useEffect } from "react"
import {
    Box,
    Stack,
    ImageList,
    ImageListItem,
    IconButton,
    Typography,
} from "@mui/material"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline"
import PauseCircleIcon from "@mui/icons-material/PauseCircle"

type Photo = {
    id: string
    title: string
    url: string
    summary: string
}

type CarousalProps = {
    photos: Photo[]
}

function Carousal({ photos }: CarousalProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [intervalId, setIntervalId] = useState<NodeJS.Timer | undefined>()

    useEffect(() => {
        resumeFunction()
        return () => clearInterval(intervalId as NodeJS.Timer)
    }, [])

    const pauseFunction = () => {
        if (intervalId) {
            clearInterval(intervalId)
            setIntervalId(undefined)
        }
    }

    const resumeFunction = () => {
        const id = setInterval(myTimer, 3000)
        setIntervalId(id)
    }

    const myTimer = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length)
    }

    const next = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length)
    }

    const prev = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + photos.length) % photos.length
        )
    }

    return (
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} padding={1}>
            <Box sx={{ width: { xs: "100%", md: "50%" }, p: 1 }}>
                <Stack
                    spacing={2}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ width: "100%", maxHeight: "100%" }}>
                    <ImageList
                        sx={{
                            // width: "100%",
                            // height: { xs: 200, md: 350 },
                            display: "flex",
                            // position: "relative",
                        }}>
                        <ImageListItem>
                            <img
                                src={photos[currentIndex].url}
                                alt={photos[currentIndex].title}
                                style={{ borderRadius: 8 }}
                            />
                        </ImageListItem>
                    </ImageList>
                    <Box>
                        <IconButton
                            onClick={
                                intervalId ? pauseFunction : resumeFunction
                            }>
                            {intervalId ? (
                                <PauseCircleIcon />
                            ) : (
                                <PlayCircleOutlineIcon />
                            )}
                        </IconButton>
                    </Box>
                    <Box>
                        <IconButton onClick={prev}>
                            <ArrowBackIosIcon />
                        </IconButton>
                        <IconButton onClick={next}>
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Box>
                </Stack>
            </Box>
            <Box sx={{ width: { xs: "100%", md: "50%" }, p: 1 }}>
                <Typography variant="h6" gutterBottom align="center">
                    {photos[currentIndex].title}
                </Typography>
                <Typography align="center">
                    {photos[currentIndex].summary}
                </Typography>
            </Box>
        </Stack>
    )
}

export default Carousal
