import useStore from '@/helpers/store'
import { A11y } from '@react-three/a11y'
import { ContactShadows, Text, Environment, useTexture, PointerLockControls, Reflector,Html, MeshDistortMaterial, Icosahedron, useCubeTexture} from '@react-three/drei'
import { useResource, useFrame, useThree } from '@react-three/fiber'
import React, { Suspense, useRef, useState, useEffect } from 'react'
import Model from './Scene'
import Mouse from './Mouse'
import Boxes from './Boxes'
import Desk from './Desk'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette,  } from '@react-three/postprocessing'
import lerp from "lerp"

const HPI = Math.PI / 2

function MainSphere({ material }) {
  const main = useRef();
  const Three = useThree()
  // main sphere rotates following the mouse position
  useFrame(({ clock, mouse }) => {
    main.current.rotation.z = clock.getElapsedTime();
    main.current.rotation.y = lerp(
      main.current.rotation.y,
      mouse.x * Math.PI,
      0.1
    );
    main.current.rotation.x = lerp(
      main.current.rotation.x,
      mouse.y * Math.PI,
      0.1
    );
  });
  return (
    <Icosahedron
      args={[1, 4]}
      ref={main}
      material={material}
      position={[-8, 4, 0]}
    />
  );
}

function Instances({ material }) {
  // we use this array ref to store the spheres after creating them
  const [sphereRefs] = useState(() => []);
  // we use this array to initialize the background spheres
  const initialPositions = [
    [-4, 20, -12],
    [-10, 12, -4],
    [-11, -12, -23],
    [-16, -6, -10],
    [12, -2, -3],
    [13, 4, -12],
    [14, -2, -23],
    [8, 10, -20]
  ];
  // smaller spheres movement
  useFrame(() => {
    // animate each sphere in the array
    sphereRefs.forEach((el) => {
      el.position.y += 0.02;
      if (el.position.y > 19) el.position.y = -18;
      el.rotation.x += 0.06;
      el.rotation.y += 0.06;
      el.rotation.z += 0.02;
    });
  });
  return (
    <>
      <MainSphere material={material} />
      {initialPositions.map((pos, i) => (
        <Icosahedron
          args={[1, 4]}
          position={[pos[0], pos[1], pos[2]]}
          material={material}
          key={i}
          ref={(ref) => (sphereRefs[i] = ref)}
        />
      ))}
    </>
  );
}

function Scene2() {
  const bumpMap = useTexture("bump.jpg");
  const envMap = useCubeTexture(
    ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
    { path: "cube/" }
  );
  // We use `useResource` to be able to delay rendering the spheres until the material is ready
  const [material, set] = useState();

  return (
    <>
      <MeshDistortMaterial
        ref={set}
        envMap={envMap}
        bumpMap={bumpMap}
        color={"#010101"}
        roughness={0.1}
        metalness={1}
        bumpScale={0.005}
        clearcoat={1}
        clearcoatRoughness={1}
        radius={1}
        distort={0.4}
      />
      {material && <Instances material={material} />}
    </>
  );
}

function Ground() {
  const [floor, normal] = useTexture(['/SurfaceImperfections003_1K_var1.jpg', '/SurfaceImperfections003_1K_Normal.jpg'])
  return (
    <Reflector position={[0, -14.225, 0]} scale={[100.1, 100, 1]} resolution={512} args={[10, 10]} mirror={0.5} mixBlur={7} mixStrength={0.8} rotation={[-HPI, 0, HPI]} blur={[400, 50]}>
      {(Material, props) => <Material color="#858585" metalness={0.5} roughnessMap={floor} normalMap={normal} normalScale={[0.1, 0.1]} {...props} />}
    </Reflector>
  )
}

const BoxComponent = ({ route, cameraSetting, useCameraSetting }) => {
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
        <Text curveRadius={0.4} scale={[20,20,20]} position={[-3,9, -15]} color="grey" anchorX="center" anchorY="middle">
          The Mainframe
        </Text>
        {/* <PerspectiveCamera     ref={myCamera}/> */}

        <EffectComposer>
          <Vignette eskil={false} offset={0.01} darkness={0.9} />
          <Noise opacity={0.035} />
        </EffectComposer>
        {cameraSetting ? <PointerLockControls  makeDefault /> : null}


        <Suspense fallback={<Html center>Loading.</Html>}>
            <Environment preset="night" />
            <Scene2 />
            <ContactShadows rotation-x={Math.PI / 2} position={[0, -14, 0]} opacity={0.4} width={200} height={200} blur={2} far={60.5} />
            <Desk position={[-3, -14, -1]} scale={[0.1545, 0.1545, 0.1545]} />
            <Model position={[-1, 0, 3]} scale={[0.4, 0.4, 0.4]} rotation={[0.0,0.1,0]} />
            <Mouse position={[4, -1, 2]} scale={[0.0045, 0.0045, 0.0045]} />
            {/* <Boxes/> */}
        </Suspense>

        <Text curveRadius={0.2} scale={[70,20,20]} rotation={[0,Math.PI,0]} position={[-3,5, 35]} color="grey" anchorX="center" anchorY="middle">
          The Void
        </Text>
      </>
    </A11y>
  )
}
export default BoxComponent
