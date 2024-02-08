import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export const storage = axios.create({
  baseURL: 'https://api.nft.storage',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN}`
  }
})

export interface Note {
  id: string
  date: number
  content: string
}

export const getNotes = async () => {
  const notesId = window.localStorage.getItem('notes')

  if (!notesId) {
    throw new Error('Invalid')
  }

  const { data } = await axios.get<Note[]>(
    `https://cloudflare-ipfs.com/ipfs/${notesId}`
  )

  return data
}

export const createNote = async (notes: Note[]) => {
  const data = JSON.stringify(notes)

  const {
    data: {
      value: { cid }
    }
  } = await storage.post<{ value: { cid: string } }>('/upload', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  window.localStorage.setItem('notes', cid)
}
