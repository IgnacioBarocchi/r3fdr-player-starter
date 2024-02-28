import { PositionalAudio } from '@react-three/drei';

export const Footsteps = () => {
    return (
        <PositionalAudio
            load
            autoplay
            // loop={false}
            loop
            distance={1}
            url="/sounds/Entity/kick.mp3"
        />
    );
};
