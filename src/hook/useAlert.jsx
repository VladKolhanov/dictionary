import { useState } from 'react'

export const useAlert = () => {
   const [stateAlert, setStateAlert] = useState(false)

   return [
      stateAlert,
      (time) => {
         setStateAlert(true)

         setTimeout(() => setStateAlert(false), time)
      },
   ]
}
