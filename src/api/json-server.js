export const addWordIntoDictionary = async (data) => {
   const response = await fetch('http://localhost:4000/dictionary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
   })

   if (!response.ok) {
      throw new Error('This action failed. Please try again.')
   }
}

export const getWordsFromDataBase = async (page, limit) => {
   const response = await fetch(
      `http://localhost:4000/dictionary?_sort=id&_order=desc&_page=${page}&_limit=${limit}`
   )

   if (!response.ok) {
      throw new Error('Failed to load data. Please reload this page.')
   }

   const totalCount = response.headers.get('X-Total-Count')
   const allPages = Math.ceil(totalCount / limit)

   const data = await response.json()

   return { data, dictionaryInfo: { totalCount, allPages } }
}

export const getWordFromDataBase = async (wordId) => {
   const response = await fetch(`http://localhost:4000/dictionary/${wordId}`)

   if (!response.ok) {
      throw new Error('Failed to load data. Please return to dictionary and try again.')
   }

   const data = await response.json()
   return data
}

export const putChangeWord = async (item) => {
   const response = await fetch(`http://localhost:4000/dictionary/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
   })

   if (!response.ok) {
      throw new Error('Error, please try again')
   }

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
