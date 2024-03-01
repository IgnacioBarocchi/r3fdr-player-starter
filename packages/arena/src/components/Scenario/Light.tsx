import { useHelper } from "@react-three/drei"
import { useRef } from "react"
import { Object3D, PointLightHelper } from "three"

const KeyLight = () => {
    const ref = useRef<Object3D>()
    // @ts-ignore
    useHelper(ref, PointLightHelper, 1)
      // @ts-ignore
    return <pointLight ref={ref} args={["lightblue", 1]} position={[-10, 13, 10]} />
  }
  
  const FillLight = () => {
    const ref = useRef<Object3D>()
    // @ts-ignore
    useHelper(ref, PointLightHelper, 1)
      // @ts-ignore
    return <pointLight ref={ref} args={[`pink`, 0.15]} position={[10, 11, 10]} />
  }
  
  const BackLight = () => {
    const ref = useRef<Object3D>()
    // @ts-ignore
    useHelper(ref, PointLightHelper, 1)
      // @ts-ignore
    return <pointLight ref={ref} args={[`pink`, 0.15]} position={[10, 13, -10]} />
  }

  export const Light = () => {
    return <>
    {/* <KeyLight /> */}
    {/* <FillLight />
    <BackLight /> */}
    </>
  }