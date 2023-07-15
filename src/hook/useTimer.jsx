import React, { useEffect, useState } from 'react'

export const useTimer = (responseTime) => {
   const [timer, setTimer] = useState(responseTime)
   const [isTimer, setIsTimer] = useState(false)

   useEffect(() => {
      if (!isTimer) return

      const time = setInterval(() => setTimer((p) => p - 1), 1000)

      return () => clearTimeout(time)
   }, [isTimer])

   const resume = () => {
      setIsTimer(true)
      setTimer(responseTime)
   }

   return [timer, resume]
}
