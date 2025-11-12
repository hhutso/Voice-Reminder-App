import { useAudioPlayer, useAudioPlayerStatus, setAudioModeAsync} from 'expo-audio';
import { useEffect } from 'react';

export function usePlayback(uri: string | null| undefined){
    const player = useAudioPlayer(uri);
    const status = useAudioPlayerStatus(player);

    useEffect(() => {
        (async () => {
            setAudioModeAsync({
                playsInSilentMode: true,
            });
        })();
    }, []);
    
    const play = () => {
        if (uri && status.isLoaded){
            if (status.didJustFinish){
                player.seekTo(0);
            }
        }

        player.play();
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