import React, { useContext } from 'react'
import { Card } from 'semantic-ui-react'
import { AuthContext } from '../context/auth'
import DeleteButton from './DeleteButton';
import moment from 'moment';

const CommentCard = ({ comment, postId }) => {
  const {user} = useContext(AuthContext);
  return (
    <Card key={comment.id} fluid>
      <Card.Content>
        {user && user.username === comment.username && (
          <DeleteButton postId={postId} commentId={comment.id} />
        )}
        <Card.Header>
          {comment.username}
        </Card.Header>
        <Card.Meta>
          {moment(comment.createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>
          {comment.body}
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

export default CommentCard