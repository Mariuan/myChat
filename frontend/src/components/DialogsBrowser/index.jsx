import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import {FaRedo} from 'react-icons/fa';
import { Link } from "react-router-dom";
import { getDialogs, reloadDialogs } from "../../api/dialogs";

const animation = '.8s infinite linear loading'

export const DialogsBrowser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { profile, dialogs, status } = useSelector(state=>state.store);
    
    useEffect(()=>{
        if (!profile) {
            navigate('/auth');
        }
    }, [profile, navigate]);

    useEffect(()=>{
        if (dialogs === null) dispatch(getDialogs());
    }, [dialogs, dispatch])

    const handleReloadDialogs = () => dispatch(reloadDialogs());

    return(
        <div className="dialogs-holder">
            <div className="dialogs-header">
                <p>Dialogs</p>
                <button onClick={handleReloadDialogs}>
                    <FaRedo 
                        color="#fff" 
                        style={status === 'Reloading dialogs' && {animation}}/>
                </button>
            </div>
            <ul className="dialogs-list">
                {
                    (status === 'Active' && dialogs?.length === 0) &&
                    <p>There are no users</p>
                }
                {
                    dialogs?.length > 0 &&
                    dialogs?.map((item)=>(
                        <li key={item.id}>
                            <Link 
                                className='link'
                                to={`/chat/${item.id}`}
                                style={{
                                    display: 'block',
                                    textDecoration: 'none', 
                                    color: '#000',
                                    width: '100%',
                                    height: '100%'
                                }}>
                                {item.username}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}