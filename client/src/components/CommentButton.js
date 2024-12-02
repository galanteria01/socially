import React from 'react'
import { Button, Icon, Label } from 'semantic-ui-react'

const CommentButton = ({commentCount}) => {
  return (
    <Button as='div' labelPosition="right">
      <Button basic color="violet">
        <Icon name="comments" />
      </Button>
      <Label basic color="violet" pointing="left">
        {commentCount}
      </Label>
    </Button>
  )
}

export default CommentButton