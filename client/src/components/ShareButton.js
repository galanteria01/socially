import React, { useState } from 'react'
import { Button, Confirm, Icon, Modal } from 'semantic-ui-react'

const ShareButton = ({ id }) => {
  console.log(window.location.href)
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  const handleConfirm = () => {
      navigator.clipboard.writeText(window.location.href);
    toggle();
  }
  return (
    <>
      {/* <Modal
        trigger={
          
        }
        header='Share!'
        content='Copy the url to share this post.'
        actions={['Snooze', { key: 'done', content: 'Done', positive: true }]}
      /> */}
      <Button onClick={toggle} as='button' labelPosition="right">
        <Button basic color="purple">
          <Icon name="share" />
        </Button>
      </Button>
      <Confirm
        content="Copy the content to share the url."
        open={open}
        cancelButton='Cancel'
        confirmButton="Copy"
        onCancel={toggle}
        onConfirm={handleConfirm}
      />
    </>
  )
}

export default ShareButton