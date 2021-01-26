import React from 'react'
import Browser from '../../components/Browser'

export default {
    title: 'Browser',
    component: Browser,
    args: {
        openSelection: (data) => console.log(data),
        conectors: []
    },
    argTypes: {
        mode: {
            control: {
                type: 'select',
                options: [
                    'card',
                    'file',
                    'folder'
                ],
            },
        }
    }
}

const Template = args => < Browser {...args }
/>

export const Card = Template.bind({})
Card.args = {
    mode: "card",
}

export const File = Template.bind({})
File.args = {
    mode: "file",
}

export const Folder = Template.bind({})
Folder.args = {
    mode: "folder",
}