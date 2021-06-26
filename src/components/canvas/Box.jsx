import useStore from '@/helpers/store'
import { A11y } from '@react-three/a11y'
import { ContactShadows, Text, Environment, useTexture, PointerLockControls, Reflector} from '@react-three/drei'
import { useResource } from '@react-three/fiber'
import React, { Suspense, useRef, useState, useEffect } from 'react'
import Model from './Scene'
import Mouse from './Mouse'
import Desk from './Desk'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette,  } from '@react-three/postprocessing'

const HPI = Math.PI / 2

function Ground() {
  const [floor, normal] = useTexture(['/SurfaceImperfections003_1K_var1.jpg', '/SurfaceImperfections003_1K_Normal.jpg'])
  return (
    <Reflector position={[0, -14.225, 0]} scale={[100.1, 100, 1]} resolution={512} args={[10, 10]} mirror={0.5} mixBlur={7} mixStrength={0.8} rotation={[-HPI, 0, HPI]} blur={[400, 50]}>
      {(Material, props) => <Material color="#858585" metalness={0.5} roughnessMap={floor} normalMap={normal} normalScale={[0.1, 0.1]} {...props} />}
    </Reflector>
  )
}

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
        <Text curveRadius={0.4} scale={[20,20,20]} position={[-3,9, -15]} color="black" anchorX="center" anchorY="middle">
          The Main Frame
        </Text>
        {/* <PerspectiveCamera     ref={myCamera}/> */}

        <EffectComposer>
          <Vignette eskil={false} offset={0.01} darkness={0.9} />
          <Noise opacity={0.035} />
        </EffectComposer>
        <PointerLockControls  makeDefault />

        {/* <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 5]} />
        <pointLight position={[-10, -10, -5]} /> */}


        <Suspense fallback={null}>
        <fog attach="fog" args={['lightpink', 60, 100]} />
          <Environment preset="dawn" />
          <ContactShadows rotation-x={Math.PI / 2} position={[0, -14, 0]} opacity={0.4} width={200} height={200} blur={2} far={60.5} />
          <Desk position={[0, -14, -1]} scale={[0.1545, 0.1545, 0.1545]} />
          <Model position={[-1, 0, 3]} scale={[0.4, 0.4, 0.4]} rotation={[0.1,0.1,0]} />
          <Mouse position={[4, -1, 2]} scale={[0.0045, 0.0045, 0.0045]} />
        </Suspense>
        
      </>
    </A11y>
  )
}
export default BoxComponent
