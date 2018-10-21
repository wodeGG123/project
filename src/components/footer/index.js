import React from 'react'
import styles from './index.scss'

class Main extends React.Component{
    render(){
        return(
            <div className={styles.wrap}>
                <div className={styles.content}>
                    <p>© Copyright 2017 <span>Thought</span>Works</p>
                </div>
            </div>
        )
    }
}

export default Main