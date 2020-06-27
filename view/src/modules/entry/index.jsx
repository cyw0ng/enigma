import React from 'react'
import Layout from '../../containers/layout/Layout'
import Config from './config'

export default class Entry extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            runtimeConfig: Config
        }
    }

    selectMenuIndexHandler = (id) => {
        let newConfig = Object.assign({}, this.state.runtimeConfig);
        let menuUpdateIndex = newConfig.menu.findIndex((item) => item.id === id)
        newConfig.menu.forEach((item, index) => {
            if (index === menuUpdateIndex) {
                item.selected = true
            } else {
                item.selected = false
            }
        })
        this.setState({runtimeConfig: newConfig})
    }

    render() {
        return <Layout menuConfig={this.state.runtimeConfig} selectMenuIndex={this.selectMenuIndexHandler}/>
    }
}