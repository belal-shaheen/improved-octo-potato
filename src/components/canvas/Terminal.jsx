import { useGLTF, Html } from '@react-three/drei'
import ReactTerminal from 'react-terminal-component';
import { Controls, useControl } from 'react-three-gui';

export default function Terminal({}) {
  return (
    <Html position={[0, -7.1, -5.8]} rotation={[-((-Math.PI/2) - 1.97), (Math.PI)/2, 5.885]} transform occlude
>
  <div >
    <ReactTerminal  theme={{
  background: 'transparent',
  promptSymbolColor: '#6effe6',
  commandColor: '#fcfcfc',
  outputColor: '#fcfcfc',
  errorOutputColor: '#ff89bd',
  fontSize: '1.1rem',
  spacing: '1%',
  fontFamily: 'monospace',
  width: '395px',
  border: "20px",
  height: '235px',
  borderRadius: "10px"
}}/>
    </div>
    </Html>
  )
}