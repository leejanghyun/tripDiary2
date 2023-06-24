import { atom } from 'jotai'

type State = File | null

export const feedMetaState = atom<State>(null)
