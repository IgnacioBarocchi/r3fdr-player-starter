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
            {Object.keys(records).map((ability, i) => {
                return (
                    <group position={[1, 0.05, i * 2]} key={ability + i}>
                        <HitBox
                            stateValue={ability}
                            hitBoxesRecords={records}
                            teamName={teamName}
                        />
                    </group>
                );
            })}
        </>
    );
};
