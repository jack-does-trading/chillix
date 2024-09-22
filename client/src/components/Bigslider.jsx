import React, { useState, useEffect, useRef } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import bbvideo from '../assets/videos/bbvid.mp4';
import gotvideo from '../assets/videos/gotvid.mp4';
import friendsvideo from '../assets/videos/friendsvid.mp4';

const BigSlider = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [volume, setVolume] = useState(0.25); // Initial volume set to 50%
    const videoRefs = useRef([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const video = videoRefs.current[activeIndex];
            if (video) {
                video.play();
                video.style.opacity = '1';
            }
        }, 2500); // Delay video start and fade-in by 2.5 seconds

        return () => clearTimeout(timer);
    }, [activeIndex]);

    useEffect(() => {
        videoRefs.current.forEach(video => {
            if (video) {
                video.volume = volume;
            }
        });
    }, [volume]);

    const handleSlide = (selectedIndex) => {
        setActiveIndex(selectedIndex);
        videoRefs.current.forEach((video, index) => {
            if (video) {
                video.pause();
                video.currentTime = 0;
                video.style.opacity = '0';
            }
        });
    };

    const handleVolumeChange = (e) => {
        setVolume(parseFloat(e.target.value));
    };

    return (
        <div className="slider">
            <Carousel fade onSlide={handleSlide} interval={10000}>
            <Carousel.Item>
                    <img 
                        className="d-block w-100"
                        src="https://wallpapercat.com/w/full/c/f/2/117652-1920x1080-desktop-full-hd-friends-tv-series-wallpaper-photo.jpg" 
                        alt="Friends"
                    />
                    <video 
                        className="carousel-video d-block w-100"
                        src={friendsvideo}
                        ref={el => videoRefs.current[0] = el}
                        loop
                    />
                    <Carousel.Caption>
                        <h3>"An exhilarating ride that keeps you guessing until the very end."</h3>
                        <p>NonStop Reviews</p>
                    </Carousel.Caption>
                </Carousel.Item>
                
                <Carousel.Item>
                    <img 
                        className="d-block w-100"
                        src="https://images7.alphacoders.com/617/617964.jpg" 
                        alt="Breaking Bad"
                    />
                    <video 
                        className="carousel-video d-block w-100"
                        src={bbvideo}
                        ref={el => videoRefs.current[1] = el}
                        loop
                    />
                    <Carousel.Caption>
                        <h3>"An unforgettable performance that shines through every scene."</h3>
                        <p>-Michael Jordan</p>
                    </Carousel.Caption>
                </Carousel.Item>
                
                <Carousel.Item>
                    <img 
                        className="d-block w-100"
                        src="https://wallpaper.forfun.com/fetch/74/74e0cf575a3d7b35f8f8e3d4e90de58b.jpeg" 
                        alt="GOT"
                    />
                    <video 
                        className="carousel-video d-block w-100"
                        src={gotvideo}
                        ref={el => videoRefs.current[2] = el}
                        loop
                    />
                    <Carousel.Caption>
                        <h3>"A masterclass in storytelling with every episode."</h3>
                        <p>The Hindu</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <div className="volume-control">
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="volume-slider"
                />
            </div>
        </div>
    );
}

export default BigSlider;
