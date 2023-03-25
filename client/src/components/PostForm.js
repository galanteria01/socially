import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import {useForm} from '../utils/hooks';
import {FETCH_POSTS_QUERY} from '../utils/graphql';
import MenuAddMedia from './MenuAddMedia';

const PostForm = () => {

    const {onChange, onSubmit, values} = useForm(createPostCallback,{
        body: ''
    })

    const [createPost, { error }] = useMutation(CREATE_POST, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            })
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY, 
                data: {
                    getPosts: [result.data.createPost, ...data.getPosts]
                },
            });
            values.body = '';
        }
    })

    function createPostCallback() {
        createPost();
    }
    
    return (
        <div>
            <Form onSubmit={onSubmit}>
                <h2>Create a post</h2>
                <Form.Field>
                    <Form.TextArea
                    onChange={onChange}
                    name="body"
                    placeholder="Create your post"
                    value={values.body}
                    style={{minHeight: 100, borderRadius: 10}}
                    />
                    <MenuAddMedia />
                    <Button type="submit" color="teal">
                        Submit post
                    </Button>
                </Form.Field>
            </Form>
            { error && (
                <div className="ui error message">
                    <ul className="list">
                        <li>{error.graphQLErrors[0].message}</li>
                    </ul>
                </div>
            ) }
        </div>
    )
}

const CREATE_POST = gql`
    mutation createPost($body: String!){
        createPost(body: $body){
            id body createdAt username 
            likes{
                id
                username
                createdAt
            }
            likeCount
            comments{
                id body username createdAt
            }
            commentCount
        }
    }
`

export default PostForm
