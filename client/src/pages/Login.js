import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import React, { useContext, useState } from 'react'
import { Button, Container, Form, Header } from 'semantic-ui-react'
import { AuthContext } from '../context/auth'
import { useForm } from '../utils/hooks'

const Login = (props) => {

    const [errors, setErrors] = useState({});

    const context = useContext(AuthContext);

    const initialState = {
        username: '',
        password: '',
    };

    const {onChange, onSubmit, values } = useForm(loginUserCallback, initialState);

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_,{data: {login: userData}}){
            context.login(userData);
            props.history.push('/');
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
            console.log(err.graphQLErrors[0].extensions.exception.errors)

        },
        variables: values
    })

    function loginUserCallback(){
        loginUser()
    }

    

    return (
        <Container>
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                <Header as='h1' textAlign='center'>
                    Login
                </Header>
                <Form.Input
                label="Username"
                placeholder="johndoe12"
                name="username"
                type="text"
                value={values.username}
                onChange={onChange}
                error={errors.username? true : false}
                />

                <Form.Input
                label="Password"
                placeholder="password"
                name="password"
                type="password"
                value={values.passsword}
                onChange={onChange}
                error={errors.password? true : false}
                />

                <Button type="submit" primary>
                    Login
                </Button>
            </Form>

            {Object.keys(errors).length > 0 && <div className="ui error message">
                <ul className="list">
                    {
                        Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))
                    }
                </ul>
            </div>}
        </Container>
    )
}

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login(
                username: $username
                password: $password
        ){
            id 
            email 
            username 
            createdAt 
            token
        }
    }
`

export default Login
