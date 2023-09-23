import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import {useEffect} from 'react'
import axios from 'axios';

const apiURL ='https://api.api-ninjas.com/v1/exercises?muscle=biceps';
const apiKey = 'sNFImdxMXe+4yhflDbMfcA==iSQX5kcNAT21z9Jl';


function App() {
  const difficulties= ['','beginner', 'intermediate', 'expert']
  const muscles= ['','abdominals','abductors', 'adductors', 'biceps', 'calves', 'chest', 'forearms', 'glutes', 'hamstrings', 'lats', 'lower_back', 'middle_back', 'neck', 'quadriceps', 'traps','triceps']
  const types= ['','cardio', 'olympic_weightlifting', 'plyometrics', 'powerlifting', 'strength', 'stretching', 'strongman' ]
  const [exerciseData, setExerciseData] = useState([]);
  const [difficultyState, setDifficultyState] = useState('')
  const [excerciseName, setExcerciseName] = useState('')
  const [muscle, setMuscle] = useState('')
  const [type, setType] = useState('')
  const [loading, setLoading] = useState(false)
  const queryParams = {
    name: excerciseName,
    difficulty: difficultyState,
    muscle: muscle,
    type: type,
  }

  const fetchData = () => {
    setLoading(true);
    axios.get(apiURL, {
      headers: {
        'x-api-key': apiKey
      },
      params: queryParams,
    })
        .then((response)=> {
        // Handle the response data here
        console.log(response.data);
        setExerciseData(response.data);
        setLoading(false);
      })
  };

  return (
    <div id="container">
    <h1>Welcome to search for muscle exercises</h1>
    <h3>Search criteria</h3>
      <div>
        <label>Name: </label>
        <input type = "string" value={excerciseName} onChange={e => setExcerciseName(e.target.value)}/>
      </div>
      <div>
          <label>Difficulty: </label>
          <select value={difficultyState} onChange={e => setDifficultyState(e.target.value)}>
            { 
              difficulties.map(difficulties => (
                <option>{difficulties}</option>
            ))
            }
          </select>
        </div>
        <div>
          <label>Muscle: </label>
          <select value={muscle} onChange={e => setMuscle(e.target.value)}>
            { 
              muscles.map(muscles => (
                <option>{muscles}</option>
            ))
            }
          </select>
        </div>
        <div>
          <label>Type: </label>
          <select value={type} onChange={e => setType(e.target.value)}>
            { 
              types.map(types => (
                <option>{types}</option>
            ))
            }
          </select>
        </div>
        <div>
          <button type="button" onClick={fetchData}>Search</button>
        </div>    
      

    <div>
        <h1>List of Exercises</h1>
        <ul>
          {exerciseData.map((exercise, index) => (
            <li key={index}>
              <h2>{exercise.name}</h2>
              <p><strong>Type:</strong> {exercise.type}</p>
              <p><strong>Muscle:</strong> {exercise.muscle}</p>
              <p><strong>Equipment:</strong> {exercise.equipment}</p>
              <p><strong>Difficulty:</strong> {exercise.difficulty}</p>
              <p><strong>Instructions:</strong> {exercise.instructions}</p>
            </li>
         ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
