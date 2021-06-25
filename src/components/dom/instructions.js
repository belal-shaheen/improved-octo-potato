import { useEffect,useState } from "react"

export default function Instructions() {
  
  const [mouse, setMouse ] = useState([0,0])
  const keyPressed = useKeyPress("m")

  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      setMouse([e.pageX, e.pageY]);
    })
    document.addEventListener("mousedown", downHandler);

  }, [])

  const downHandler = (e) => {
    document.elementFromPoint(window.innerWidth/2,window.innerHeight/2).click();
    document.elementFromPoint(window.innerWidth/2,window.innerHeight/2).focus();
  }

  return (
    <div
      className=''
    >
      <div>{mouse},</div>
      <div className='cursor' ></div>
    </div>
  )
}

function useKeyPress(targetKey) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);
  // If pressed key is our target key then set to true
  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }
  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };
  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
}
