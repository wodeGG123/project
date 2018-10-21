import React from 'react'
import styles from './index.scss'

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [{
                text: 'All',
                act: true
            },
            {
                text: 'Physical',
                act: false
            },
            {
                text: 'Virtual',
                act: false
            }],
            showTypes: [
                {
                    icon: 'icon-th-card',
                    act: false
                },
                {
                    icon: 'icon-th-list',
                    act: true
                }
            ]

        }
    }
    render() {
        return (
            <div className={styles.wrap}>
                <div className={styles.tabs}>
                    {
                        this.state.items.map((obj, index) => {
                            return (<span onClick={()=>{this.setShowItem(obj.text,index)}} className={obj.act ? styles.act : ''} key={index}>{obj.text}</span>)
                        })
                    }
                </div>
                <div className={styles.input}>
                    <i className="icon-search"></i>
                    <input type="text" />
                </div>
                <div className={styles.showType}>
                    {
                        this.state.showTypes.map((obj, index) => {
                            return (<i key={index} className={`${obj.icon} ${obj.act ? styles.showTypeAct : ''}`}></i>)
                        })
                    }
                </div>
            </div>
        )
    }
    setShowItem(type,index){
        let items = this.state.items
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            element.act = false
            if(i === index){
                element.act = true
            }
        }
        this.setState({
            items
        })
        this.props.agentsFilter(type)
    }
}

export default Main