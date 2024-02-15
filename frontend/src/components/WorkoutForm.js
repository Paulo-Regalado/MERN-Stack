import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'


const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newWorkout = { title, load, reps }

        try {
            const response = await fetch('/api/workouts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newWorkout)
            })
            const json = await response.json()

            if (response.ok) {
                setError(null)
                console.log("New Workout Added!", json)
                setTitle('')
                setLoad('')
                setReps('')
                setEmptyFields([])
                dispatch({ type: 'CREATE_WORKOUT', payload: json.workout })
            }
            else {
                setEmptyFields(json.emptyFields)
                setError(json.error)
            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <form className='create' onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title:</label>
            <input className={emptyFields.includes('title') ? 'error' : ''} type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

            <label>Load (kg):</label>
            <input className={emptyFields.includes('load') ? 'error' : ''} type="number" value={load} onChange={(e) => setLoad(e.target.value)} />

            <label>Reps:</label>
            <input className={emptyFields.includes('reps') ? 'error' : ''} type="number" value={reps} onChange={(e) => setReps(e.target.value)} />

            <button>Add Workout</button>
            {error && <div className='error'>{error}</div>}

        </form>
    )
}

export default WorkoutForm