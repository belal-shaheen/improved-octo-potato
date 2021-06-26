import { useEffect,useState } from "react"
import { useRecoilValue } from "recoil";
import {loadingAtom} from "../../atoms/state"
import dynamic from 'next/dynamic'

const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
  ssr: false
});

export default function Instructions({cameraSetting, setCameraSetting}) {

  const switchCameraMode = () => {
    setCameraSetting(!cameraSetting)
    document.exitPointerLock()
  }


  return (
    <div
      className=''
    >
      <div >
        <button className=" m-4 ml-6 bg-gray-50 px-5 py-3 text-sm shadow-sm font-medium tracking-wider border text-black rounded-full hover:shadow-lg hover:bg-gray-300 active:bg-gray-500 focus:outline-none" onClick={switchCameraMode}>{!cameraSetting ? "Look around" : "Interact"}</button>
      </div>
      {!cameraSetting ? 
      <AnimatedCursor color="355, 355, 355"/> : null}
    </div>
  )
}
