import { HitBox } from "../../../components/utility/HitBox/HitBox";
import { MutantHitBoxes } from "../../../components/utility/HitBox/hitBoxes";

export const Dummies = ({ teamName }: { teamName: 'Zombie' | 'Mutant' }) => {
    return (
        <>
            {Object.entries(MutantHitBoxes).map(([ability, value], i) => {
                return (
                    <group position={[1, 0.05, i * 2]} key={ability + i}>
                        <HitBox
                            stateValue={ability}
                            hitBoxesRecords={MutantHitBoxes}
                            teamName={teamName}
                        />
                    </group>
                );
            })}
        </>
    );
};
