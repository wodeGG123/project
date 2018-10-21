import React from 'react'
import user from '../../services/user'
import styles from './index.scss'
import logo from '../../assets/logo/logo.svg'
import userImg from '../../assets/temp/user-thum.jpg'
import { connect } from 'dva'

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userToolShow: false
        }
    }
    render() {
        return (
            <div className={styles.wrap}>
                <div className={styles.content}>
                    <img className={styles.logo} src={logo} alt="logo" />
                    <div className={styles.user}>
                        <div className={styles.userFace}>
                            <img src={userImg} alt="user-thum"
                                onClick={() => {
                                    this.toggleUserTool()
                                }} />
                            <i className={`icon-angle-down ${this.state.userToolShow?styles.rotate180:""}`}
                                onClick={() => {
                                    this.toggleUserTool()
                                }}
                            ></i>
                        </div>
                        <div className={styles.userTools} style={{ display: this.state.userToolShow ? 'block' : 'none' }}>
                            <ul>
                                <li onClick={() => {
                                    this.toggleUserTool()
                                }}>
                                    <i className="icon-id-card"></i>
                                    <span>Profile</span>
                                </li>
                                <li onClick={() => {
                                    this.toggleUserTool()
                                }}>
                                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                                    <span>Sign Out</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    componentWillMount() {
        this.getUserInfo()
    }
    getUserInfo(){
        user.getUserInfo({token:'userToken'}).then((data) => {
            if (data && data.data) {
                this.props.dispatch({
                    type: 'user/fetch',
                    payload: data.data
                })
            }

        })
    }
    toggleUserTool() {
        this.setState({
            userToolShow: !this.state.userToolShow
        })
    }
}


export default connect(({ user }) => ({ user }))(Main)