import { EntityModel } from '../../../providers/entities';
import { HitBox } from '../../../components/utility/Hitbox/HitBox';
import { useMemo } from 'react';

export const Dummy = ({ teamName }: { teamName: 'Zombie' | 'Mutant' }) => {
    const abilities = useMemo(() => {
        return {
            Zombie: ['Attacking1', 'Attacking2', 'Attacking3'],
            Mutant: ['CrossPunching', 'Kicking', 'SidePunching', 'Slamming'],
        }[teamName];
    }, [teamName]);

    return (
        <>
            {abilities.map((ability, i) => {
                return (
                    <group position={[1, 0.05, i * 2]}>
                        <HitBox
                            stateValue={ability}
                            entity={EntityModel[teamName]}
                            teamName={teamName}
                        />
                    </group>
                );
            })}
        </>
    );
};
