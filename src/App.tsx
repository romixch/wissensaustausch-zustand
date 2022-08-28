import React from 'react'
import styles from './App.module.css'
import { Counter } from './Counter'
import { CounterControl } from './CounterControl'
import { FormattedDate } from './FormattedDate'
import { Galery } from './Galery'

function App() {
  console.log('Rendering App')
  return (
    <>
      <h1>Demo: Zustand Deep-Dive / Learnings</h1>
      <div className={styles.App}>
        <Counter />
        <CounterControl />
        <Galery />
        <FormattedDate />
      </div>
    </>
  )
}

export default App
