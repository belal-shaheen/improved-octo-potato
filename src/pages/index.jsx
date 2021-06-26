import useStore from '@/helpers/store'
import dynamic from 'next/dynamic'
// Step 5 - delete Instructions components
import Instructions from '@/components/dom/instructions'
import { RecoilRoot } from 'recoil'
import React, {useState} from "react"
import Scene from "../components/canvas/Scene"

// Step 2 - update Box components
const Box = dynamic(() => import('@/components/canvas/Box'), {
  ssr: false,
})

const Page = ({ title }) => {
  const [cameraSetting, setCameraSetting] = useState(false)

  useStore.setState({ title })
  return (
    <>
        <Box r3f route='/box' cameraSetting={cameraSetting} setCameraSetting={setCameraSetting} />
        {/* Step 5 - delete Instructions components */}
        <Instructions cameraSetting={cameraSetting} setCameraSetting={setCameraSetting} />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Index',
    },
  }
}
