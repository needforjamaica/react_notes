import React, {useState, useEffect} from 'react';
import {useForm, ErrorMessage} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {setPageTitle} from '../../store/actions/common';
import {signUp, signIn} from '../../store/actions/auth';

export default (props) => {
    const [state, setState] = useState({
        action: `signIn`,
    });

    const {register, handleSubmit, errors} = useForm({
        defaultValues: {
            email: ``,
            password: ``,
        },
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle(`Auth`));
    }, [dispatch]);

    const setAction = (action) => {
        setState({...state, action: action});
    };

    const submitHandler = (data) => {
        if (state.action === `signIn`) {
            dispatch(signIn(data, props.history));
        } else if (state.action === `signUp`) {
            dispatch(signUp(data, props.history));
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className={`form-group`}>
                    <label htmlFor={`email`} className={errors.email ? `error` : null}>
                        Email
                    </label>
                    <input type={`text`} className={`form-control ${errors.email ? `error` : null}`} id={`email`} name={`email`} autoComplete={`off`} ref={register({required: `Please fill email`, pattern: {value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: `Email is invalid`}})} />
                    <ErrorMessage errors={errors} name={`email`} as={`span`} className={`error`} />
                </div>
                <div className={`form-group`}>
                    <label htmlFor={`password`} className={errors.password ? `error` : null}>
                        Password
                    </label>
                    <input type={`password`} className={`form-control ${errors.password ? `error` : null}`} id={`password`} name={`password`} autoComplete={`off`} ref={register({required: `Please, choose your password`, minLength: {value: 6, message: `Password must be at least 6 symbols length`}})} />
                    <ErrorMessage errors={errors} name={`password`} as={`span`} className={`error`} />
                </div>
                <input
                    type={`submit`}
                    className={`btn btn-primary`}
                    style={{marginRight: 15}}
                    value={`Sing in`}
                    onClick={() => {
                        setAction(`signIn`);
                    }}
                />
                <input
                    type={`submit`}
                    className={`btn btn-primary`}
                    value={`Sing up`}
                    onClick={() => {
                        setAction(`signUp`);
                    }}
                />
            </form>
        </>
    );
};
