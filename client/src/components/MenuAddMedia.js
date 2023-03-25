import React, { useState } from 'react'
import { Icon, Menu } from 'semantic-ui-react'

const MenuAddMedia = () => {
    const [item, setItem] = useState('')
    return (
        <Menu icon >
            <Menu.Item
            name='image'
            active={item === 'image'}
            onClick={setItem}
            >
            <Icon name='image' />
            </Menu.Item>

            <Menu.Item
            name='image'
            active={item === 'image'}
            onClick={setItem}
            >
            <Icon name='image' />
            </Menu.Item>

            <Menu.Item
            name='image'
            active={item === 'image'}
            onClick={setItem}
            >
            <Icon name='image' />
            </Menu.Item>
        </Menu>
    )
}

export default MenuAddMedia
