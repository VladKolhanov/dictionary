const baseUrl = 'http://localhost:4000/dictionary'

export const addWordIntoDictionary = async (data) => {
   const response = await fetch(`${baseUrl}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
   })

   if (!response.ok) {
      throw new Error('This action failed. Please try again.')
   }
}

export const getWordsFromDataBase = async (page, limit) => {
   const response = await fetch(`${baseUrl}?_sort=id&_order=desc&_page=${page}&_limit=${limit}`)

   if (!response.ok) {
      throw new Error('Failed to load data. Please reload this page.')
   }

   const totalCount = response.headers.get('X-Total-Count')
   const allPages = Math.ceil(totalCount / limit)

   const data = await response.json()

   return { data, dictionaryInfo: { totalCount, allPages } }
}

export const getWordsForGame = async (limit) => {
   const response =
      limit === 'all'
         ? await fetch(`${baseUrl}?_sort=id&_order=desc`)
         : await fetch(`${baseUrl}?_sort=id&_order=desc&_limit=${limit}`)

   if (!response.ok) {
      throw new Error('Failed to load data. Please check your network access')
   }

   const data = await response.json()

   const words = data.reduce((acc, item) => {
      acc.push({ wordEn: item.wordEn, wordTr: item.wordTr, id: item.id })
      return acc
   }, [])

   return words
}

export const getWordFromDataBase = async (wordId) => {
   const response = await fetch(`${baseUrl}/${wordId}`)

   if (!response.ok) {
      throw new Error('Failed to load data. Please return to dictionary and try again.')
   }

   const data = await response.json()
   return data
}

export const putChangeWord = async (item) => {
   const response = await fetch(`${baseUrl}/${item.id}`, {
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
   const response = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
   })

   if (!response.ok) {
      throw new Error('Not Deleted')
   }

   const data = await response.json()
   return data
}
