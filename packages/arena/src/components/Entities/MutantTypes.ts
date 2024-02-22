import * as THREE from 'three'

import { GLTF } from 'three-stdlib'

export type GLTFResult = GLTF & {
    nodes: {
        Plane: THREE.Mesh
        mesh: THREE.SkinnedMesh
        mixamorigHips: THREE.Bone
    }
    materials: {
        RHReference: THREE.MeshStandardMaterial
        ['Main material']: THREE.MeshStandardMaterial
    }
}

type ActionName =
    | 'CrossPunching'
    | 'Dying'
    | 'Idle'
    | 'Kicking'
    | 'Running'
    | 'SidePunching'
    | 'Slamming'
    | 'Stunned'
    | 'TakingDamage'

export type GLTFActions = Record<ActionName, THREE.AnimationAction>
