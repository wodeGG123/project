import React from 'react'
import styles from './index.scss'

class Main extends React.Component{
    static defaultProps = {
        all:0,
        physical:0,
        virtual:0
    }
    render(){
        return(
            <div className={styles.wrap}>
                <dl>
                    <dt>ALL</dt>
                    <dd>{this.props.all}</dd>
                </dl>
                <dl>
                    <dt>PHYSICAL</dt>
                    <dd>{this.props.physical}</dd>
                </dl>
                <dl>
                    <dt>VIRTUAL</dt>
                    <dd>{this.props.virtual}</dd>
                </dl>
            </div>
        )
    }
}

export default Main