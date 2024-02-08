'use client'

import React, { useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import * as Tooltip from '@radix-ui/react-tooltip'
import { MicIcon, MicOffIcon, XIcon } from 'lucide-react'
import { Drawer } from 'vaul'

import { NoteForm } from '~/components/NoteForm'
import { toast } from 'sonner'

let speechRecognition: SpeechRecognition | null = null

export const NewNoteCard: React.FC = () => {
  const [transcription, setTranscription] = useState('')
  const [isRecording, setIsRecording] = useState(false)

  const handleToggleRecording = () => {
    const isSpeechRecognitionAPIAvailable =
      'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

    if (!isSpeechRecognitionAPIAvailable) {
      return toast.error(
        'Infelizmente seu navegador não suporta a API de gravação!'
      )
    }

    setIsRecording(!isRecording)

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!speechRecognition) {
      speechRecognition = new SpeechRecognitionAPI()
    }

    if (isRecording) {
      return speechRecognition.stop()
    }

    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = event => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')

      setTranscription(transcription)
    }

    speechRecognition.onerror = event => {
      console.error(event.error)
    }

    speechRecognition.start()
  }

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger className="flex flex-col space-y-3 rounded-md bg-slate-700 p-5 text-left outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 max-lg:hidden">
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

          <Dialog.Content className="fixed left-1/2 top-1/2 flex h-[60vh] w-full max-w-[640px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-md bg-slate-700 outline-none max-lg:hidden">
            <div className="absolute right-0 top-0 space-x-1">
              <Tooltip.Root delayDuration={100}>
                <Tooltip.Trigger
                  onClick={handleToggleRecording}
                  className="inline-flex bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100"
                >
                  {isRecording ? (
                    <MicIcon className="size-5 animate-pulse text-red-500" />
                  ) : (
                    <MicOffIcon className="size-5" />
                  )}
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

            <NoteForm transcription={transcription} />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Drawer.Root>
        <Drawer.Trigger className="flex flex-col space-y-3 rounded-md bg-slate-700 p-5 text-left outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 lg:hidden">
          <span className="text-sm font-medium text-slate-200">
            Adicionar nota
          </span>

          <p className="text-sm leading-6 text-slate-400">
            Grave uma nota em áudio que será convertida para texto
            automaticamente.
          </p>
        </Drawer.Trigger>

        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />

          <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex h-full max-h-[95%] flex-col rounded-t-[10px] bg-slate-800">
            <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-slate-700" />

            <NoteForm />
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  )
}
