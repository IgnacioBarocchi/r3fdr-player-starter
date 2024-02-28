import { HitBox } from '../../../components/utility/HitBox/HitBox';
import {
    MutantHitBoxes,
    ZombieHitBoxes,
} from '../../../components/utility/HitBox/hitBoxes';

export const Dummies = ({ teamName }: { teamName: 'Zombie' | 'Mutant' }) => {
    const records = { Mutant: MutantHitBoxes, Zombie: ZombieHitBoxes }[
        teamName
    ];
    
    return (
        <>
            {Object.keys(records).map((skill, i) => {
                return (
                    <group position={[1, 0.05, i * 2]} key={skill + i}>
                        <HitBox
                            stateValue={skill}
                            hitBoxesRecords={records}
                            teamName={teamName}
                        />
                    </group>
                );
            })}
        </>
    );
};
