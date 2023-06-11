import { useState } from 'react'

export const useAlert = () => {
   const [alertInfo, setAlertInfo] = useState('')

   return [
      alertInfo,
      (message, time) => {
         setAlertInfo(message)

         setTimeout(() => setAlertInfo(''), time)
      },
   ]
}
