export const addWordIntoDictionary = async (data) => {
   return await fetch('http://localhost:4000/dictionary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
   })
}
