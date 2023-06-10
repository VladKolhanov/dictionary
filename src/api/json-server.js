export const addWordIntoDictionary = async (data) =>
   await fetch('http://localhost:4000/dictionary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
   })

export const getWordsFromDataBase = async () => {
   const response = await fetch('http://localhost:4000/dictionary')
   const data = await response.json()
   return data
}

export const putFavoriteWord = async (item) => {
   const response = await fetch(`http://localhost:4000/dictionary/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
   })

   const data = await response.json()
   return data
}

export const deleteWord = async (id) => {
   const response = await fetch(`http://localhost:4000/dictionary/${id}`, {
      method: 'DELETE',
   })

   if (!response.ok) {
      throw new Error('Not Deleted')
   }

   const data = await response.json()
   return data
}
