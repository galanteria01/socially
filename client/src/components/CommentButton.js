import React from 'react'
import { Button, Icon, Label } from 'semantic-ui-react'

const CommentButton = ({commentCount}) => {
  return (
    <Button as='div' labelPosition="right">
      <Button basic color="blue">
        <Icon name="comments" />
      </Button>
      <Label basic color="blue" pointing="left">
        {commentCount}
      </Label>
    </Button>
  )
}

export default CommentButton