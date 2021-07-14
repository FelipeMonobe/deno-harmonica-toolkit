import { h, useState } from '../deps.ts'
import { transpose } from '../services/Music.ts'

export const Transposer = () => {
  const [tablature, setTablature] = useState<String>('')
  const [result, setResult] = useState<String>('')
  const [pitchAdjustment, setPitchAdjustment] = useState<Number>(-1)

  const onSubmit =  (): Promise<void> => {
    if (!tablature) return setResult('')
    return transpose(tablature, pitchAdjustment)
      .then(setResult)
  }

  const onReset = (): void => {
    setTablature('')
    setResult('')
    setPitchAdjustment(-1)
  }

  return (
  <div>
    <h2>Transposer</h2>
    <div>
      <textarea
        rows="10"
        cols="30"
        onChange={e => setTablature(e.target.value)}
      >
        {tablature}
      </textarea>
    </div>
    <div>
      <div>
        <label>Pitch adjustment:</label>
      </div>
      <div>
        <div>
          <label>Decrease</label>
          <input
            name="pitchAdjustmentAdjustment"
            type="radio"
            value={pitchAdjustment}
            checked={pitchAdjustment === -1}
            onChange={() => setPitchAdjustment(-1)}
          />
        </div>
        <div>
          <label>Increase</label>
          <input
            name="pitchAdjustmentAdjustment"
            type="radio"
            value={pitchAdjustment}
            checked={pitchAdjustment === 1}
            onChange={() => setPitchAdjustment(1)}
          />
        </div>
      </div>
    </div>
    <div style="margin-top: 5px">
      <button type="button" onClick={() => onSubmit()}>
        Transpose
      </button>
    </div>
    <div style="margin-top: 5px">
      <button type="button" onClick={() => onReset()}>
        Reset
      </button>
    </div>
    <div style="margin-top: 30px">
      <textarea
        value={result}
        rows="10"
        cols="30"
        readonly
      />
    </div>
  </div>
  )
}