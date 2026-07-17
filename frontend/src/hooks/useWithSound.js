import { useRef, useEffect } from 'react';

export const useWithSound = (audioSource) => {
    // Create Reference for Audio Source
    const soundRef = useRef();

    // Create New Audio Instance w/ Audio Source & Store in Ref
    useEffect(() => {
        soundRef.current = new Audio(audioSource);
    }, []);

    // Play & Pause Functions
    const playSound = () => {
        soundRef.current.play();
    }

    const pauseSound = () => {
        soundRef.current.pause();
    }

    // Return Play & Pause Functions
    return {
        playSound,
        pauseSound
    }
}