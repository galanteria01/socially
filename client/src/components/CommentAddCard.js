import React from 'react'
import { Card, Form } from 'semantic-ui-react'

const CommentAddCard = ({ comment, setComment, submitComment, ref }) => {
  return (
    <Card fluid>
      <Card.Content>
        <p>Post a comment</p>
        <Form>
          <div className="ui action input fluid">
            <input
              type="text"
              placeholder="Comment.."
              name="comment"
              value={comment}
              onChange={event => setComment(event.target.value)}
              ref={ref}
            />
            <button
              type="submit"
              className="ui button violet"
              disabled={comment.trim() === ''}
              onClick={submitComment}
            >
              Send
            </button>
          </div>
        </Form>
      </Card.Content>
    </Card>
  )
}

export default CommentAddCard