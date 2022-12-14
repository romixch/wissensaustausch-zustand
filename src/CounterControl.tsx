import myZustand from './myZustand'
import styles from './CounterControl.module.css'

export const CounterControl = () => {
  console.log('Rendering CounterControl')
  const countUp = myZustand((state) => state.countUp)
  const countDown = myZustand((state) => state.countDown)
  return (
    <div className={styles.counterControl}>
      <h1>Counter Control</h1>
      <button onClick={countUp}>UP</button>
      <button onClick={countDown}>DOWN</button>
    </div>
  )
}
