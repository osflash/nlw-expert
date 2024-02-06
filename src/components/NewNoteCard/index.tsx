'use client'

import React, { FormEvent } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import * as Tooltip from '@radix-ui/react-tooltip'
import { MicIcon, MicOffIcon, XIcon } from 'lucide-react'
import { toast } from 'sonner'

export const NewNoteCard: React.FC = () => {
  const handleSaveNote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const text = formData.get('text')

    toast.success('Nota criada com sucesso.')
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex flex-col space-y-3 rounded-md bg-slate-700 p-5 text-left outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto
          automaticamente.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />

        <Dialog.Content className="fixed left-1/2 top-1/2 flex h-[60vh] w-full max-w-[640px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-md bg-slate-700 outline-none">
          <div className="absolute right-0 top-0 space-x-1">
            <Tooltip.Root delayDuration={100}>
              <Tooltip.Trigger className="group inline-flex bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
                <MicOffIcon className="size-5 scale-100 transition-all group-hover:scale-0" />
                <MicIcon className="absolute size-5 scale-0 transition-all group-hover:scale-100" />
                <span className="sr-only">Habilitar microfone</span>
              </Tooltip.Trigger>

              <Tooltip.Portal>
                <Tooltip.Content
                  sideOffset={4}
                  side="bottom"
                  className="animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 overflow-hidden rounded-md bg-slate-900 px-3 py-1.5 text-xs text-slate-400"
                >
                  Converter áudio em texto
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>

            <Dialog.Close className="bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
              <XIcon className="size-5" />
            </Dialog.Close>
          </div>

          <form onSubmit={handleSaveNote} className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Adicionar nota
              </span>

              <textarea
                autoFocus
                name="text"
                className="flex-1 resize-none bg-transparent text-sm leading-6 text-slate-400 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-lime-400 py-4 text-center text-sm font-medium text-lime-950 outline-none hover:bg-lime-500"
            >
              Salvar nota
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
