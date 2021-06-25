import useStore from '@/helpers/store'
import { A11y } from '@react-three/a11y'
import { Html, Loader, PerspectiveCamera, Sky, PointerLockControls} from '@react-three/drei'
import { useResource } from '@react-three/fiber'
import React, { Suspense, useRef, useState, useEffect } from 'react'
import Model from './Scene'
import Mouse from './Mouse'
import Lamp from './Lamp'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'

const BoxComponent = ({ route }) => {
  const router = useStore((s) => s.router)
  // This reference will give us direct access to the THREE.Mesh object

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
