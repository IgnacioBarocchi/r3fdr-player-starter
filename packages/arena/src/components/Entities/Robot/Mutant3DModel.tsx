import { EntityModel } from '../../../providers/GLTFProvider'
import { FC } from 'react'
import { GLTFResult } from './MutantTypes'
import { StateValue } from 'xstate'
import { use3DModelLogic } from '../../../hooks/use3DModelLogic/use3DModelLogic'
import { useGLTF } from '@react-three/drei'

const path = EntityModel.Mutant
const Mutant3DModel: FC<{ state: StateValue }> = ({ state }) => {
    const { group, nodes, materials } = use3DModelLogic<GLTFResult>(
        state,
        true,
        path
    )

    return (
        <group ref={group} dispose={null}>
            <group name="Scene">
                <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={1}>
                    <primitive object={nodes.mixamorigHips} />
                    <skinnedMesh
                        name="mesh"
                        geometry={nodes.mesh.geometry}
                        // @ts-expect-error X
                        material={materials['Main material']}
                        skeleton={nodes.mesh.skeleton}
                    />
                </group>
            </group>
        </group>
    )
}

useGLTF.preload(path)

export default Mutant3DModel
