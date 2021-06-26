/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: maxdragonn (https://sketchfab.com/maxdragon)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/office-lamp-d934c6b791c34e0fafc30e9625b4c55c
title: office lamp
*/

import React, { useRef,useState } from 'react'
import { Physics, usePlane, useBox } from 'use-cannon'
import { useDrag,useGesture } from "react-use-gesture"
import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";

function Cube(props) {
  const [ref, api] = useBox(() => ({ mass: 1, position: [0, 0, 0], rotation: [0.4, 0.2, 0.5], ...props }))
  const { size, viewport } = useThree();

  const aspect = size.width / viewport.width;
  const [spring, set] = useSpring(() => ({ scale: [1, 1, 1], position: props.position, rotation: [0, 0, 0], config: { friction: 10 } }))
  const bind = useGesture({
    onDrag: ({ offset: [x, y] }) => { api.position.set([x / aspect, -y / aspect, 0]); return set({ position: [x / aspect, -y / aspect, 0] })},
    onHover: ({ hovering }) => set({ scale: hovering ? [1.2, 1.2, 1.2] : [1, 1, 1] })
  })


  return (
    <a.mesh ref={ref} {...spring}  {...bind()}>
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color={props.color} />
    </a.mesh>
  )
}

export default function Boxes(props) {
  usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] ,position:[-5,-1,0]}))

  return (
    <group>
    <hemisphereLight intensity={0.35} />
    <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2}  />
      <Cube position={[-8, 0, 0]} color="black" />
      <Cube position={[-10, 0, 1]} color="white"/>
      <Cube position={[-9, 0, -1]}  color="black" />
      <Cube position={[-8, 2, 0]} color="black" />
      <Cube position={[-10, 2, 1]} color="white"/>
      <Cube position={[-9, 2, -1]}  color="black" />
    </group>
  )
}