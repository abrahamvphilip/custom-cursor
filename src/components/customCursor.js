import React, {useRef, useEffect} from 'react';
import '../components/cursorStyles.css'

function Cursor() {

  const primaryCursorRef = useRef(null)
  const secondaryCursorRef = useRef(null)

  const positionRef = useRef({
    mouseX: 0,
    mouseY: 0,
    currentX: 0,
    currentY: 0,
    distanceX: 0,
    distanceY: 0,
    frame: 0
  })

  useEffect(() => {
    document.addEventListener('mousemove', (e) => {
      const {clientX, clientY} = e

      const mouseX = clientX
      const mouseY = clientY

      positionRef.current.mouseX = mouseX - secondaryCursorRef.current.clientWidth / 2
      positionRef.current.mouseY = mouseY - secondaryCursorRef.current.clientHeight / 2

      primaryCursorRef.current.style.transform = `translate3d(${mouseX - primaryCursorRef.current.clientWidth / 2}px, ${mouseY - primaryCursorRef.current.clientHeight / 2}px, 0)`
    })
  }, [])

  useEffect(() => {
    const followMouse = () => {
      positionRef.current.frame = requestAnimationFrame(followMouse)

      const {mouseX, mouseY, currentX, currentY, distanceX, distanceY} = positionRef.current

      const interpolation = 0.0985

      if(!currentX || !currentY) {
        positionRef.current.currentX = mouseX
        positionRef.current.currentY = mouseY
      } else {
        positionRef.current.distanceX = (mouseX - currentX) * interpolation;
        positionRef.current.distanceY = (mouseY - currentY) * interpolation;

        if(Math.abs(positionRef.current.distanceX) + Math.abs(positionRef.current.distanceY) < interpolation) {
          positionRef.current.currentX = mouseX
          positionRef.current.currentY = mouseY
        } else {
          positionRef.current.currentX += distanceX
          positionRef.current.currentY += distanceY
        }
      }
      secondaryCursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
    }
    followMouse()
  }, [])

  return (
    <>
      <div className='primary-cursor' ref={primaryCursorRef} />
      <div className='secondary-cursor' ref={secondaryCursorRef}/>
    </>
  );
}

export default Cursor;
