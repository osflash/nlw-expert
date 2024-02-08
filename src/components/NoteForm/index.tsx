'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { FormEvent, useEffect, useState } from 'react'

import { toast } from 'sonner'
import { Note, createNote } from '~/services/storage'

interface NoteFormProps {
  transcription?: string
}

export const NoteForm: React.FC<NoteFormProps> = ({ transcription }) => {
  const [content, setContent] = useState('')

  const queryClient = useQueryClient()

  const { mutateAsync: createNoteFn, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess(_, variables) {
      queryClient.setQueryData<Note[]>(['notes'], variables)
    }
  })

  const handleSaveNote = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const content = formData.get('text')

    if (!content) {
      return
    }

    const cached = queryClient.getQueryData<Note[]>(['notes']) || []

    const data = cached?.concat({
      id: crypto.randomUUID(),
      date: Date.now(),
      content: content.toString()
    })

    try {
      await createNoteFn(data)

      toast.success('Nota criada com sucesso.')
    } catch (err) {
      toast.error('Erro ao criar a nota.')
    }
  }

  useEffect(() => {
    setContent(transcription || '')
  }, [transcription])

  return (
    <form onSubmit={handleSaveNote} className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="text-sm font-medium text-slate-300">
          Adicionar nota
        </span>

        <textarea
          autoFocus
          name="text"
          className="flex-1 resize-none bg-transparent text-sm leading-6 text-slate-400 outline-none"
          value={content}
          onChange={event => setContent(event.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-lime-400 py-4 text-center text-sm font-medium text-lime-950 outline-none hover:bg-lime-500 disabled:pointer-events-none disabled:opacity-50"
      >
        {isPending ? 'Salvando...' : 'Salvar nota'}
      </button>
    </form>
  )
}
