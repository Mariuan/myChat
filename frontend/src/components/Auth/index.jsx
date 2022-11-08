import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setProfile } from "../../redux/reducer";
import { socket } from "../../utils/socket";

export const Auth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { profile } = useSelector(state=>state.store);
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);


    useEffect(()=>{
        if (profile) navigate('/');
    }, [profile, navigate]);

    const handleUsernameChange = (e) => setUsername(e.target.value);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (username.length === 0) {
            setError("Username can't be empty");
            return;
        }

        socket.emit('auth', username);
    }

    useEffect(()=>{
        socket.on('setProfile', (data) => {
            if (data.error) {
                setError(data.error);
            }
            else {
                dispatch(setProfile({username: data.username, id: data.id}));
            }
        })
    }, [dispatch])

    return(
        <form 
            className="auth-form"
            onSubmit={handleFormSubmit}>
            <h2>Enter your username</h2>
            <input 
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className="auth-input"/>
            <p 
                className="error-text"
                style={{color: error ? 'red' : 'transparent'}}>
                {
                    error
                    ? `* ${error}`
                    : '-'
                }
            </p>
            <button
                type="submit"
                className="auth-button">Login</button>
        </form>
    )
}