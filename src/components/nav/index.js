import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.scss'
import ReactIScroll from 'react-iscroll'
import iScroll from 'iscroll'
import { Link } from 'dva/router'
import _ from 'lodash'
import {connect} from 'dva'

class Main extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props) {
        super(props)
        this.state = {
            height: '',
            historyList: [],
            items: [
                {
                    url: '/dashboard',
                    icon: 'icon-dashboard',
                    text: 'DASHBOARD',
                    act: false
                },
                {
                    url: '/agent',
                    icon: 'icon-sitemap',
                    text: 'AGENT',
                    act: false
                },
                {
                    url: '/mycruise',
                    icon: 'icon-boat',
                    text: 'MY CRUISE',
                    act: false
                },
                {
                    url: '/help',
                    icon: 'icon-life-bouy',
                    text: 'HELP',
                    act: false
                }
            ]
        }
    }
    render() {
        return (
            <div className={styles.wrap} style={{ height: this.state.height }}>
                <div className={styles.content}>
                    <ul>
                        {
                            this.state.items.map((obj, index) => {
                                return (
                                    <Link key={index} to={obj.url}>
                                        <li className={obj.act?styles.act:''}>
                                            <i className={obj.icon}></i>
                                            <span>{obj.text}</span>
                                        </li>
                                    </Link>
                                )
                            })
                        }
                    </ul>
                    <div className={styles.history}>
                        <h3>
                            History
                        </h3>
                        <div className={styles.historyList}>
                            <ReactIScroll iScroll={iScroll}
                                options={{ mouseWheel: true, scrollbars: true, disablePointer: true }}
                                onScrollStart={() => { }}>
                                <div className={styles.historyListInner}>
                                    {
                                        this.state.historyList.map((obj, index) => {
                                            return (<div key={index} className={styles.item}><p>span{obj.text}</p></div>)
                                        })
                                    }
                                </div>
                            </ReactIScroll>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount() {
        this.setHeight()
        this.setHistoryList(15)
        this.setActItem()
    }
    componentWillReceiveProps() {
        setTimeout(() => {
            this.setActItem()
        }, 0);
    }
    setActItem() {
        let pathname = this.context.router.route.location.pathname
        let items = _.cloneDeep(this.state.items)
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            element.act = false
            if(pathname === element.url){
                element.act = true
            }
        }
        this.setState({
            items
        })
    }
    setHistoryList(num) {
        let list = []
        for (let i = 0; i < num; i++) {
            if (i === 2) {
                list.push({
                    text: 'bjstdmngbgr02/Acceptance_testAcceptance_test',
                    url: ''
                })
            } else {
                list.push({
                    text: 'bjstdmngbgr02/Acceptance_test',
                    url: ''
                })
            }
        }
        this.setState({
            historyList: list
        })
    }
    setHeight() {
        let height = this.props.config.contentHeight
        this.setState({
            height: `${height}px`
        })

    }
}

export default connect(({config})=>({config}))(Main)