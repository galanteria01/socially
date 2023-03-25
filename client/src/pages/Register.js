import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import React, { useContext, useState } from 'react'
import { Button, Container, Form, Header } from 'semantic-ui-react'
import { useForm } from '../utils/hooks';
import { AuthContext } from '../context/auth'


const Register = (props) => {

    const [errors, setErrors] = useState({});

    const context = useContext(AuthContext);

    const initialState = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const {onChange, onSubmit, values } = useForm(registerUser, initialState);

    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(_,{ data: { register: userData } }){
            context.login(userData);
            props.history.push('/');
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    })

    function registerUser(){addUser()}

    

    return (
        <Container>
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
            <Header as='h1' textAlign='center'>
                Register
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
                label="Email"
                placeholder="johndoe12@gmail.com"
                name="email"
                type="email"
                value={values.email}
                onChange={onChange}
                error={errors.email? true : false}
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
                <Form.Input
                label="Confirm password"
                placeholder="password"
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
                onChange={onChange}
                error={errors.confirmPassword? true : false}
                />
                <Button type="submit" primary>
                    Register
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

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ){
            id 
            email 
            username 
            createdAt 
            token
        }
    }
`

export default Register
