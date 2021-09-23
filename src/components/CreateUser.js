import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
    const [user, setUser] = useState({
        username: ''
    });

    const onChangeUsername = (e) => {
        setUser({...user, username: e.target.value});
    };

    const onSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data))

        setUser({username: ''})
    };

    return (
        <div>
            <h3>Create New User</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={user.username}
                        onChange={onChangeUsername}/>
                </div>
                <div className="form-group">
                    <input type="submit" 
                        value="Create User"
                        className="btn btn-primary mt-2"/>
                </div>
            </form>
        </div>
    )
}

export default CreateUser
