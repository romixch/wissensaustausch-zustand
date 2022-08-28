import myZustand from './myZustand'
import styles from './Counter.module.css'

export const Counter = () => {
  console.log('Rendering Counter')
  const counter = myZustand((state) => state.counter)
  return (
    <div className={styles.counter}>
      <h1>Count: {counter}</h1>
    </div>
  )
}
