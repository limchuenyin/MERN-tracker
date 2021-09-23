import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const CreateExercise = () => {
    const [exercise, setExercise] = useState({
        username: '',
        description: '',
        duration: '',
        date: new Date(),
        users: []
    });

    useEffect(() => {
        axios.get('http://localhost:5000/users')
            .then(response => {
                if (response.data.length > 0) {
                    setExercise({
                        username: response.data[0].username,
                        description: '',
                        duration: '',
                        date: new Date(),
                        users: response.data.map(user => user.username)
                    })
                }
            })
    }, [])  

    const onChangeUsername = (e) => {
        setExercise({...exercise, username: e.target.value});
    };

    const onChangeDescription = (e) => {
        setExercise({...exercise, description: e.target.value});
    };

    const onChangeDuration = (e) => {
        setExercise({...exercise, duration: e.target.value});
    };

    const onChangeDate = (date) => {
        setExercise({...exercise,   date: date});
    };

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data))
    };

    return (
        <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={ onSubmit }>
                <div className="form-group">
                    <label>Username: </label>
                    <select ref={useRef("userInput")}
                        required
                        className="form-control"
                        value={ exercise.username }
                        onChange={ onChangeUsername }>
                            {
                                exercise.users.map((user) => {
                                    return <option 
                                        key={ user }
                                        value={ user }>{ user }
                                        </option>;
                                })
                            }
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={ exercise.description }
                        onChange={ onChangeDescription }/>                    
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={ exercise.duration }
                        onChange={ onChangeDuration }/>                    
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={ exercise.date }                 
                            onChange={ onChangeDate }
                        />
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary mt-2" />
                </div>
            </form>
        </div>
    )
}

export default CreateExercise
