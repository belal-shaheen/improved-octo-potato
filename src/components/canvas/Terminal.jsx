import { useGLTF, Html } from '@react-three/drei'
import ReactTerminal from 'react-terminal-component';
import { Controls, useControl } from 'react-three-gui';
import {useEffect,useState} from "react" 
import {loadingAtom} from "../../atoms/state"
import { useRecoilState } from "recoil";

export default function Terminal() {
  const [terminal, setTerminal] = useState(false);

  useEffect(() => {
    setTerminal(true)
  }, [terminal])

  return (
    <Html position={[0, -7.35, -5.8]} rotation={[-((-Math.PI/2) - 1.97), (Math.PI)/2, 5.885]} transform onOcclude={(visible) => {console.log(visible)}}
>
    {terminal ? 
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
}}/>: null}
    </Html>
  )
}
