import React from 'react'
import Browser from '../../components/Browser'

export default {
    title: 'Browser',
    component: Browser
}

export const Card = () => <Browser mode='card' openSelection={(data) => console.log(data)} connectors={[]} />
export const File = () => <Browser mode='file' openSelection={(data) => console.log(data)} connectors={[]} />
export const Folder = () => <Browser mode='folder' openSelection={(data) => console.log(data)} connectors={[]} />