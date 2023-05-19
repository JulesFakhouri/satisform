import { arrayMove } from '@dnd-kit/sortable'
import { atomWithMachine } from 'jotai-xstate'
import type { DoneInvokeEvent } from 'xstate'
import { assign, createMachine } from 'xstate'
import type { z } from 'zod'
import type { zodForm } from './interface'
import { zodFormsFile, zodResponseFile } from './interface'
import { axiosBackAuth } from './utils'

interface Context {
  forms: z.infer<typeof zodFormsFile>
  responses: z.infer<typeof zodResponseFile>
  formsAdding: Array<Omit<z.infer<typeof zodForm>, 'id'>>
  formsAddingTitle: string
  formsAddingMail: string
}

type Event =
  | {
      type: 'SELECT_ADD_FORMS'
    }
  | {
      type: 'SELECT_FORM_TEXT'
    }
  | {
      type: 'SELECT_FORM_TEXTAREA'
    }
  | {
      type: 'SELECT_FORM_RADIO'
    }
  | {
      type: 'SELECT_FORM_CHECKBOX'
    }
  | {
      type: 'ADD_FORM_TEXT'
      form: Omit<z.infer<typeof zodForm>, 'id'>
    }
  | {
      type: 'ADD_FORM_TEXTAREA'
      form: Omit<z.infer<typeof zodForm>, 'id'>
    }
  | {
      type: 'ADD_FORM_RADIO'
      form: Omit<z.infer<typeof zodForm>, 'id'>
    }
  | {
      type: 'ADD_FORM_CHECKBOX'
      form: Omit<z.infer<typeof zodForm>, 'id'>
    }
  | {
      type: 'CANCEL_ADD_FORM'
    }
  | {
      type: 'DELETE_ADD_FORM'
      index: number
    }
  | {
      type: 'ADD_FORMS_REQUEST'
      name: string
      mail: string
    }
  | {
      type: 'DELETE_FORMS'
    }
  | {
      type: 'REORDER_ADD_FORM'
      activeIndex: number
      overIndex: number
    }

export const machineForm = createMachine<Context, Event>(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QDMD2AnAtgOgJYQBswBiCVAOzD3IDdUBrKtLPQsBXW1AYwEMAXXBQDaABgC6Y8YlAAHVLFyCKMkAA9EAJgBsAZmyjDhgBwBWUad0BGcwHYANCACeiK24ObdAFl3Hju0U8vMwBfEMdmHHQwXggnViJiAEEAERSAfQAxAHkAJQBZKVV5RWVyVQ0EPS9sAE5jH21bbUDLbUcXBBsrbFtzIwavW2ttMPCQclQIOFVI4oUlIXKkdUQAWnbndc9sTS9a+u9dTVMG2t1dMIiMHHwiedKlisQvTQ7XUWNe-s1az+tRE1jFcQJFsNFYp05Asys8EF4mnUGrptJpjFZzv5Np1tDUToYbAETppRLYQWCIXEEmAHosVCtKqYbEjGmiMb4Ue8uqZNLt9vUrIYvDzcaNxhSYlTYhBOFBabCGYhbMZRL1tKZUV4rLimUMuTZefiBl4hiMxiEgA */
    predictableActionArguments: true,
    id: 'form',
    initial: 'idle',
    context: {
      forms: {},
      responses: {},
      formsAdding: [],
      formsAddingTitle: '',
      formsAddingMail: '',
    },
    states: {
      idle: {
        invoke: {
          src: 'fetchForms',
          onDone: {
            target: 'ready',
            actions: assign({
              forms: (
                _,
                event: DoneInvokeEvent<
                  [
                    z.infer<typeof zodFormsFile>,
                    z.infer<typeof zodResponseFile>
                  ]
                >
              ) => event.data[0],
              responses: (
                _,
                event: DoneInvokeEvent<
                  [
                    z.infer<typeof zodFormsFile>,
                    z.infer<typeof zodResponseFile>
                  ]
                >
              ) => event.data[1],
            }),
          },
          onError: {
            target: 'error',
          },
        },
      },
      error: {},
      ready: {
        initial: 'idle',
        states: {
          idle: {
            on: {
              SELECT_ADD_FORMS: {
                target: 'adding',
              },
              DELETE_FORMS: {
                target: '#form.idle',
              },
            },
          },
          adding: {
            initial: 'idle',
            states: {
              idle: {
                on: {
                  SELECT_FORM_TEXT: {
                    target: 'text',
                  },
                  SELECT_FORM_TEXTAREA: {
                    target: 'textarea',
                  },
                  SELECT_FORM_RADIO: {
                    target: 'radio',
                  },
                  SELECT_FORM_CHECKBOX: {
                    target: 'checkbox',
                  },
                  DELETE_ADD_FORM: {
                    actions: assign({
                      formsAdding: (context, event) =>
                        context.formsAdding.filter(
                          (_, index) => index !== event.index
                        ),
                    }),
                  },
                  ADD_FORMS_REQUEST: {
                    actions: assign({
                      formsAddingTitle: (_, event) => event.name,
                      formsAddingMail: (_, event) => event.mail,
                    }),
                    target: 'add-forms-request',
                  },
                  REORDER_ADD_FORM: {
                    actions: assign({
                      formsAdding: (context, event) =>
                        arrayMove(
                          context.formsAdding,
                          event.activeIndex,
                          event.overIndex
                        ),
                    }),
                  },
                },
              },
              text: {
                on: {
                  ADD_FORM_TEXT: {
                    target: 'idle',
                    actions: assign({
                      formsAdding: (context, event) => [
                        ...context.formsAdding,
                        event.form,
                      ],
                    }),
                  },
                  CANCEL_ADD_FORM: {
                    target: 'idle',
                  },
                },
              },

              textarea: {
                on: {
                  ADD_FORM_TEXTAREA: {
                    target: 'idle',
                    actions: assign({
                      formsAdding: (context, event) => [
                        ...context.formsAdding,
                        event.form,
                      ],
                    }),
                  },
                  CANCEL_ADD_FORM: {
                    target: 'idle',
                  },
                },
              },
              radio: {
                on: {
                  ADD_FORM_RADIO: {
                    target: 'idle',
                    actions: assign({
                      formsAdding: (context, event) => [
                        ...context.formsAdding,
                        event.form,
                      ],
                    }),
                  },
                  CANCEL_ADD_FORM: {
                    target: 'idle',
                  },
                },
              },
              checkbox: {
                on: {
                  ADD_FORM_CHECKBOX: {
                    target: 'idle',
                    actions: assign({
                      formsAdding: (context, event) => [
                        ...context.formsAdding,
                        event.form,
                      ],
                    }),
                  },
                  CANCEL_ADD_FORM: {
                    target: 'idle',
                  },
                },
              },
              'add-forms-request': {
                invoke: {
                  src: 'addForms',
                  onDone: {
                    target: '#form',
                    actions: assign({
                      formsAdding: () => [],
                      formsAddingTitle: () => '',
                    }),
                  },
                  onError: {
                    target: 'idle',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  {
    services: {
      fetchForms: async () => {
        const resForms = await axiosBackAuth().get('/super-admin/forms')
        const resFormsParse = zodFormsFile.safeParse(resForms.data)
        if (!resFormsParse.success) {
          console.log(resFormsParse.error)
          throw new Error('Invalid response')
        }
        const forms = resFormsParse.data
        const resResponses = await axiosBackAuth().get('/super-admin/responses')
        const resResponsesParse = zodResponseFile.safeParse(resResponses.data)
        if (!resResponsesParse.success) {
          console.log(resResponsesParse.error)
          throw new Error('Invalid response')
        }
        const responses = resResponsesParse.data
        return [forms, responses]
      },
      addForms: async (context) => {
        await axiosBackAuth().post('/super-admin/forms', {
          title: context.formsAddingTitle,
          mail: context.formsAddingMail,
          forms: context.formsAdding,
        })
      },
    },
  }
)

export const machineFormAtom = atomWithMachine(machineForm, {
  devTools: true,
})
