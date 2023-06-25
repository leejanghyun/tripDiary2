import { atom } from 'jotai'

type State = FileList | null

export const feedMetaState = atom<State>(null)
