import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const EditExercise = props => {
    const [exercise, setExercise] = useState({
        username: '',
        description: '',
        duration: '',
        date: new Date(),
        users: []
    });

    useEffect(() => {
        axios.get('http://localhost:5000/exercises/' + props.match.params.id)
            .then(response => {
                    setExercise({
                        username: response.data.username,
                        description: response.data.description,
                        duration: response.data.duration,
                        date: new Date(response.data.date),
                        users: []
                    })
            })
        }, [props.match.params.id])
        
    useEffect(() => {
        axios.get('http://localhost:5000/users')
            .then(response => {
                if (response.data.length > 0) {
                    setExercise(exercise => ({
                        ...exercise, users: response.data.map(user => user.username)
                    }))
                }
            })
        }, [exercise.username])
        
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
        axios.post('http://localhost:5000/exercises/update/' + props.match.params.id, exercise)
            .then(res => console.log(res.data))
    };
    
    console.log(exercise.username)
    console.log(exercise.users)
    return (
        <div>
            <h3>Edit Exercise Log</h3>
            <form onSubmit={ onSubmit }>
                <div className="form-group">
                    <label>Username: </label>
                    <select required
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
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary mt-2" />
                </div>
            </form>
        </div>
    )
}

export default EditExercise
