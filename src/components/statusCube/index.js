import React from 'react'
import styles from './index.scss'

class Main extends React.Component{
    static defaultProps = {
        icon:'',
        rotate:false,
        type:'',
        num:'',
        bg:''
    }
    render(){
        return(
            <div className={styles.wrap} style={{backgroundColor:this.props.bg}}>
                <h2 className={styles.type}>{this.props.type}</h2>
                <h3 className={styles.num}>{this.props.num}</h3>
                <i className={`${styles.icon} ${this.props.icon} ${this.props.rotate?'icon-rotate':''}`}></i>
            </div>
        )      
    }
}

export default Main