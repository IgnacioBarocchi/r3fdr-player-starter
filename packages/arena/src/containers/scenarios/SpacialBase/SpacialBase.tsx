import { Physics, RigidBody } from '@react-three/rapier'
import { useContext, useEffect, useState } from 'react'

import { AppContext } from '../../../providers/GameSettingsProvider'
import Player2 from '../../../components/Entities/Robot/Player2.tsx'
import Terrain from './Piso.tsx'
import { Vector3 } from 'three'
import { useControls } from 'leva'

const SpacialBase = () => {
    const {
        state: { USE_ORBIT_CONTROLS, DEBUG_APP },
    } = useContext(AppContext)

    const { mockOrbitControls } = useControls({ mockOrbitControls: false })
    const [terrainIsLoading, setTerrainIsLoading] = useState(true)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setTerrainIsLoading(false)
        }, 200)
        return () => {
            clearTimeout(timeout)
        }
    }, [])
    return (
        <Physics timeStep="vary" debug={true}>
            <RigidBody type={'fixed'} colliders="hull">
                <Terrain
                    position={new Vector3(0, 0.2, 0)}
                    scale={new Vector3(50, 0.2, 50)}
                />
            </RigidBody>
            {!terrainIsLoading && (
                <>
                    <Player2
                        useOrbitControls={
                            USE_ORBIT_CONTROLS && mockOrbitControls
                        }
                    />
                </>
            )}
        </Physics>
    )
}

export default SpacialBase
