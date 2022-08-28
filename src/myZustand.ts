import create from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  counter: number
  galeryImageNumber: number
  galeryImageName: string
  date: Date
  countUp: () => void
  countDown: () => void
  nextImage: () => void
}

export default create<State>()(
  persist(
    (set, get) => ({
      counter: 0,
      galeryImageNumber: 0,
      galeryImageName: 'galery_0.jpg',
      date: new Date(),
      countUp: () => set((state) => ({ counter: state.counter + 1 })),
      countDown: () => set((state) => ({ counter: state.counter - 1 })),
      nextImage: () => {
        const { galeryImageNumber } = get()
        set({
          galeryImageName: `galery_${get().galeryImageNumber}.jpg`,
          galeryImageNumber: (galeryImageNumber + 1) % 6,
        })
      },
    }),
    {
      name: 'my-zustand',
      getStorage: () => localStorage,
      deserialize: (str) => {
        const json = JSON.parse(str)
        console.log(json)
        return {
          state: { ...json.state, date: new Date(json.state.date) },
          version: json.version,
        }
      },
    }
  )
)
