import {
    RobotGenericAnimationsWithActions,
    loopableAnimationClips,
} from '../../components/Entities/Robot/types/Robot3DModel'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect, useMemo, useRef } from 'react'

import { AppContext } from '../../providers/GameSettingsProvider'
import { ChampionMachineStateEvents } from '../../constants/ChampionStateMachineObject'
import { Group } from 'three'
import { StateValue } from 'xstate'
import getAnimationClipMilliseconds from '../../lib/getAnimationClipDuration'
import { useContext } from 'react'
import { useGameStore } from '../useGameStore/useGameStore'

export const use3DModelLogic = <T,>(
    state: StateValue,
    player: boolean,
    modelPath: string,
    givenDependantGroupRef?: React.MutableRefObject<THREE.Group>
): ModelResultType<T> => {
    const {
        state: { GRAPHICS },
    } = useContext(AppContext)

    const group = givenDependantGroupRef
        ? givenDependantGroupRef
        : useRef<Group>(null)

    const { scene, nodes, materials, animations } = useGLTF(
        modelPath
    ) as unknown as ModelResultType<T>

    const { actions } = useAnimations<RobotGenericAnimationsWithActions>(
        animations as RobotGenericAnimationsWithActions[],
        group
    )

    const { characterState, setCharacterState } = useGameStore((state) => ({
        characterState: state.characterState,
        setCharacterState: state.setCharacterState,
    }))

    useMemo(() => {
        if (GRAPHICS === 'LOW') return

        scene.traverse((obj) => {
            obj.castShadow = true

            if (GRAPHICS === 'HIGH') {
                obj.receiveShadow = true
            }
        })
    }, [scene, GRAPHICS])

    useEffect(() => {
        if (player) {
            if (group?.current !== null || group?.current !== undefined) {
                const payload = group?.current
                setCharacterState({ ...characterState, ...{ group: payload } })
                console.log(characterState.action)
            }
        }
    }, [])

    useEffect(() => {
        console.log(state)
        let timeout = 0

        if (!state) return
        const currentAnimation = state
        // @ts-ignore
        if (!actions || !currentAnimation || !actions[currentAnimation]) return

        if (loopableAnimationClips.includes(currentAnimation as string)) {
            // @ts-ignore

            actions[currentAnimation]?.reset().fadeIn(0.2).play()

            return () => {
                // @ts-ignore

                actions[currentAnimation]?.fadeOut(0.2)
            }
        } else {
            // @ts-ignore

            setCharacterState({
                ...characterState,
                ...{ ability: currentAnimation },
            })

            const secondsOfDeathAnimation = getAnimationClipMilliseconds(
                actions,
                // @ts-ignore
                currentAnimation
            )
            // @ts-ignore

            actions[currentAnimation]?.reset().play()

            timeout = setTimeout(() => {
                // @ts-ignore

                actions[currentAnimation]?.stop()
                setCharacterState({
                    ...characterState,
                    ...{ ability: ChampionMachineStateEvents.IDLE },
                })
            }, secondsOfDeathAnimation)
        }

        return () => {
            // @ts-ignore

            actions[currentAnimation]?.fadeOut(0.2)
            clearTimeout(timeout)
        }
    }, [state])

    return { group, scene, nodes, materials, animations }
}

type ModelResultType<T> = {
    scene: Group
    nodes: {
        mesh: THREE.SkinnedMesh
        mixamorigHips: THREE.Bone
    }
    materials: {
        robot: THREE.MeshStandardMaterial
    }
    animations: T
    group: React.RefObject<Group>
}
