import { Canvas , useThree} from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { A11yUserPreferences } from '@react-three/a11y'
import useStore from '@/helpers/store'
import { Controls, useControl } from 'react-three-gui';
import {useEffect, useRef} from "react"
import { Html, Loader, PerspectiveCamera, Sky, FlyControls} from '@react-three/drei'

const LCanvas = ({ children }) => {
  const dom = useStore((state) => state.dom)
  const isLocked = useRef(false);
  const controlsRef = useRef();


  return (
    <Canvas
      mode='concurrent'
      style={{
        position: 'absolute',
        top: 0,
      }}
      raycaster={(raycaster) => {
        console.log(raycaster)
      }}
      gl={{antialias: true}}
      camera={{ position: [0, 5, 12], fov: 50 }}
      onCreated={(state) => state.events.connect(dom.current)}
    >
      
      <A11yUserPreferences>
        <Preload all />
        <color attach="background" args={["#AFEEEE"]} />
        {children}


      </A11yUserPreferences>
    </Canvas>
  )
}

export default LCanvas
