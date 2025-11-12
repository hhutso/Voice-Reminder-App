import { useAudioPlayer, useAudioPlayerStatus, setAudioModeAsync} from 'expo-audio';
import { useEffect, useState } from 'react';

export function usePlayback(uri: string | null){
    const player = useAudioPlayer(null);
    const status = useAudioPlayerStatus(player);
    const [isSourceLoaded, setIsSourceLoaded] = useState(false);
    
    useEffect(() => {
        if (uri){
            try {
                player.pause();

                player.replace(uri);
                setIsSourceLoaded(true);
            } 
            catch (error){
                console.error("Error loading audion source:", error);
                setIsSourceLoaded(false);
            }
        }
        else {
            setIsSourceLoaded(false);
        }

        return () => {
            player.pause();
        };
    }, [uri, player]);
    
    const play = () => {
        if (isSourceLoaded && status.isLoaded){
            if (status.didJustFinish){
                player.seekTo(0);
            }
            player.play();
        }
        else{
            console.log("Audio not loaded or Uri is missing");
        }
    };

    const pause = () => {
        player.pause();
    }

    return {
        play,
        pause,
        playing: status.playing,
        isLoaded: status.isLoaded,
    };
}