import styles from './FormattedDate.module.css'
import myZustand from './myZustand'

export const FormattedDate = () => {
  console.log('Rendering FormattedDate')
  const { date } = myZustand()
  const formatted = date.toLocaleDateString()
  return (
    <div className={styles.formattedDate}>
      <h1>{formatted}</h1>
    </div>
  )
}
