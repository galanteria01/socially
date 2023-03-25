import React, { useContext } from 'react'
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'

const PostCard = ({post: {body, createdAt, username, id, likeCount, commentCount, likes}}) => {

    const { user } = useContext(AuthContext);

    return (
        <Card fluid>
            <Card.Content>
                <Image
                floated='right'
                size='mini'
                src='https://semantic-ui.com/images/avatar/large/elliot.jpg'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>
                {body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{id, likes, likeCount}} />
                <Button as='div' labelPosition='right'>
                    <Button basic color='blue'>
                        <Icon name='comments' />
                    </Button>
                    <Label as='a' basic color='blue' pointing='left' as={Link} to={`/posts/${id}`} >
                        {commentCount}
                    </Label>
                </Button>

                {user && user.username === username && 
                    (
                        <DeleteButton postId={id} />
                    )
                }
            </Card.Content>
        </Card>
    )
}

export default PostCard
