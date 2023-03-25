import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import { Button, Confirm, Icon } from 'semantic-ui-react'
import { FETCH_POSTS_QUERY } from '../utils/graphql'

const DeleteButton = ({postId, commentId, callback}) => {

    const [confirm, setConfirm] = useState(false);

    const mutation = commentId ? DELETE_COMMENT : DELETE_POST

    const [deletePostOrComment] = useMutation(mutation, {
        update(proxy){
            if(!commentId){
                setConfirm(false);
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                });
                const newPosts = data.getPosts.filter(p => p.id !== postId);
                proxy.writeQuery({
                    query: FETCH_POSTS_QUERY, 
                    data: {
                        getPosts: newPosts
                    }
                });
            }
            if(callback) callback();
        },
        variables: {
            postId,
            commentId
        }
    })

    return (
        <>
            <Button as='div' labelPosition='right' floated='right' onClick={() => setConfirm(true)}>
                <Button color='red'>
                    <Icon name='trash' style={{margin: 0}} />
                </Button>
            </Button> 
            <Confirm 
            open={confirm} 
            onCancel={() => {setConfirm(false)}}
            onConfirm={deletePostOrComment}
            />
        </>
    )
}

const DELETE_POST = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`;

const DELETE_COMMENT = gql`
    mutation deleteComment($postId: ID!,$commentId: ID!){
        deleteComment(postId: $postId, commentId: $commentId){
            id
            comments{
                id username createdAt body
            }
            commentCount
        }
    }
`

export default DeleteButton;