'use client'

import React from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { XIcon } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { Note, createNote } from '~/services/storage'

interface NoteCardProps {
  note: Note
}

export const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const queryClient = useQueryClient()

  const onNoteDeleted = (id: string) => {
    const notesArray = queryClient
      .getQueryData<Note[]>(['notes'])
      ?.filter(note => {
        return note.id !== id
      })

    if (!notesArray) return

    queryClient.setQueryData<Note[]>(['notes'], notesArray)

    createNote(notesArray)
  }

  const formatDate = formatDistanceToNow(note.date, {
    locale: ptBR,
    addSuffix: true
  })

  return (
    <Dialog.Root>
      <Dialog.Trigger className="relative flex flex-col gap-3 overflow-hidden rounded-md bg-slate-800 p-5 text-left outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-300">{formatDate}</span>
        <p className="text-sm font-medium text-slate-300">{note.content}</p>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />

        <Dialog.Content className="fixed left-1/2 top-1/2 flex h-[60vh] w-full max-w-[640px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-md bg-slate-700 outline-none">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <XIcon className="size-5" />
          </Dialog.Close>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-sm font-medium text-slate-300">
              {formatDate}
            </span>

            <p className="text-sm leading-6 text-slate-400">{note.content}</p>
          </div>

          <button
            type="button"
            onClick={() => onNoteDeleted(note.id)}
            className="group w-full bg-slate-800 py-4 text-center text-sm font-medium text-slate-300 outline-none"
          >
            Deseja{' '}
            <span className="text-red-400 group-hover:underline">
              apagar essa nota
            </span>
            ?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
