import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { A11yUserPreferences } from '@react-three/a11y'
import useStore from '@/helpers/store'

const LCanvas = ({ children }) => {
  const dom = useStore((state) => state.dom)

  return (
    <Canvas
      mode='concurrent'
      style={{
        position: 'absolute',
        top: 0,
      }}
      shadowMap 
      sRGB
      // raycaster={{
      //   computeOffsets: () => ({
      //     offsetX: window.innerWidth / 2,  // <-- `width` and `height` are tricky here! 
      //     offsetY: window.innerHeight / 2, // <-- These are hard to maintain outside of the canvas context with useThree()
      //   }),
      // }}
      gl2={{        
        powerPreference: "high-performance",
        alpha: false,
        antialias: false,
        stencil: false,
        depth: false
    }}
      dpr={[1, 2]}
      camera={{ position: [0, 5, 12], fov: 50 }}
      onCreated={(state) => state.events.connect(dom.current)}
    >
      <A11yUserPreferences>
        <Preload all />
        <color attach="background" args={["#050505"]} />
        {children}
      </A11yUserPreferences>
    </Canvas>
  )
}

export default LCanvas
