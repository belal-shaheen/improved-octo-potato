import useStore from '@/helpers/store'
import { A11y } from '@react-three/a11y'
import { Html, Loader, PerspectiveCamera, Sky, PointerLockControls} from '@react-three/drei'
import { useResource } from '@react-three/fiber'
import React, { Suspense, useRef, useState, useEffect } from 'react'
import { useThree, useLoader,useFrame } from '@react-three/fiber'
import Model from './Scene'
import Mouse from './Mouse'
import Lamp from './Lamp'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'

function Controls(props) {
  const ref = useRef()
  const { camera } = useThree()
  useRender(() => ref.current.obj.update())
  return <orbitControls ref={ref} args={[camera]} {...props} />
}

// function Paddle({ args = [2, 0.5, 1] }) {
//   const [ref, api] = useBox(() => ({ args }))

//   useFrame((state) => {
//     api.position.set(
//       (state.mouse.x * state.viewport.width) / 2,
//       -state.viewport.height / 2,
//       0
//     )
//     api.rotation.set(0, 0, state.mouse.x)
//   })

//   return (
//     <mesh ref={ref}>
//       <boxBufferGeometry args={args} />
//       <meshStandardMaterial color='lightblue' />
//     </mesh>
//   )
// }

const BoxComponent = ({ route }) => {
  const router = useStore((s) => s.router)
  // This reference will give us direct access to the THREE.Mesh object
	const { camera } = useThree()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame

  useEffect(() => {

    document.addEventListener("mousedown", () => {});

  }, [])



  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <A11y
      role='link'
      href={route}
      actionCall={() => {
        // router.push(route)
      }}
    >
      <>
        {/* <PerspectiveCamera     ref={myCamera}/> */}
        <EffectComposer>
          <Vignette eskil={false} offset={0.01} darkness={0.9} />
        </EffectComposer>
        {/* <PointerLockControls camera={camera}  makeDefault /> */}

        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 5]} />
        <pointLight position={[-10, -10, -5]} />
        <Suspense fallback={null}>
          <Model position={[-1, 0, 3]} scale={[0.4, 0.4, 0.4]} rotation={[0.1,0.1,0]} />
          <Mouse position={[4, -1, 2]} scale={[0.0045, 0.0045, 0.0045]} />
        </Suspense>
      </>
    </A11y>
  )
}
export default BoxComponent
