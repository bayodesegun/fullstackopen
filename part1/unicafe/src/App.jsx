/* eslint-disable react/prop-types */
import { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>
const Statistics = ({good, neutral, bad}) => {
  const sum = good + neutral + bad
  const average = sum > 0 ? ((good * 1) + (bad * -1)) / sum : 0
  const positive = sum > 0 ? (good / sum) * 100 : 0
  return (
    <>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {sum}</div>
      <div>average {average}</div>
      <div>positive {positive}%</div>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseGood} text='good' />
      <Button handleClick={increaseNeutral} text='neutral' />
      <Button handleClick={increaseBad} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
