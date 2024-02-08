'use client'

import React, { useState } from 'react'

import Image from 'next/image'

import { NewNoteCard } from '~/components/NewNoteCard'
import { NoteCard } from '~/components/NoteCard'
import { useQuery } from '@tanstack/react-query'
import { Note, getNotes } from '~/services/storage'

const HomePage: React.FC = () => {
  const [search, setSearch] = useState('')

  const { data: notes } = useQuery<Note[]>({
    queryKey: ['notes'],
    queryFn: getNotes,
    initialData: []
  })

  const filteredNotes =
    search !== ''
      ? notes.filter(note =>
          note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : notes.sort((a, b) => b.date - a.date)

  return (
    <div className="relative mx-auto my-12 max-w-6xl space-y-6 max-xl:px-4">
      <Image
        src="logo-nlw-expert.svg"
        alt="NLW Expert"
        width={125}
        height={24}
        className="-left-24 top-20 xl:absolute xl:-rotate-90"
      />

      <div className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          onChange={event => setSearch(event.target.value)}
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
        />
      </div>

      <div className="h-px bg-slate-700" />

      <div className="grid auto-rows-[250px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <NewNoteCard />

        {filteredNotes?.map(note => <NoteCard key={note.id} note={note} />)}
      </div>
    </div>
  )
}

export default HomePage
