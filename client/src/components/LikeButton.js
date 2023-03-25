import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Icon, Label } from 'semantic-ui-react'
import { AuthContext } from '../context/auth';

const LikeButton = ({post: {id, likes, likeCount}}) => {

    const { user } = useContext(AuthContext);
    const [liked, setLiked] = useState(false);

    useEffect(
        () => {
            if(user && likes.find((like) => like.username === user.username)){
                setLiked(true);
            }else{
                setLiked(false)
            }
        },[user, likes]
    )

    const [likePost] = useMutation(LIKE_POST,{
            variables: {postId: id}
    }
    ) 

    return (
        <Button as='div' labelPosition='right' onClick={likePost}>
            {user ? (
                liked 
                ? 
                (
                    <Button color='teal'>
                        <Icon name='heart' />
                    </Button>
                ) 
                : 
                (
                <Button color='teal' basic>
                    <Icon name='heart' />
                </Button>
                ) )
                : 
                (
                    <Button as={Link} to='/login' color='teal' basic>
                        <Icon name='heart' />
                    </Button>
                )
            }
            <Label as='a' basic color='teal' pointing='left'>
                {likeCount}
            </Label>
        </Button>
    )
}

const LIKE_POST = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            id
            likes {
                id username
            }
            likeCount
        }
    }
`

export default LikeButton
