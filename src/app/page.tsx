import React from 'react'

import Image from 'next/image'

import { NewNoteCard } from '~/components/NewNoteCard'
import { NoteCard } from '~/components/NoteCard'

const note = {
  date: new Date(),
  content: 'Hello world'
}

const HomePage: React.FC = () => {
  return (
    <div className="mx-auto my-12 max-w-6xl space-y-6">
      <Image
        src="logo-nlw-expert.svg"
        alt="NLW Expert"
        width={125}
        height={24}
      />

      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid auto-rows-[250px] grid-cols-3 gap-6">
        <NewNoteCard />

        <NoteCard note={note} />
      </div>
    </div>
  )
}

export default HomePage
