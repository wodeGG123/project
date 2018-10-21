import React from 'react'
import styles from './index.scss'
import logo_centos from '../../assets/os-icons/cent_os.png'
import logo_debian from '../../assets/os-icons/debin.png'
import logo_suse from '../../assets/os-icons/suse.png'
import logo_ubuntu from '../../assets/os-icons/ubuntu.png'
import logo_windows from '../../assets/os-icons/windows.png'
import _ from 'lodash'
import dom from '../../utils/dom'

class Main extends React.Component {
    constructor(props) {
        super(props)
        let that = this
        this.state = {
            addBlockShow: false,
            text: '',
            osLogos: {
                logo_centos,
                logo_debian,
                logo_suse,
                logo_ubuntu,
                logo_windows
            },
            closeAddBlockListener:this.closeAddBlockListener.bind(this),
            data: {
                name: "bjstdmngbdr01.thoughtworks.com",
                os: "windows",
                status: "idle",
                type: "physical",
                ip: "192.168.1.102",
                location: "/var/lib/cruise-agent",
                resources: [
                    "Firefox",
                    "Safari",
                    "Ubuntu",
                    "Chrome"
                ],
                id: 1
            }
        }
        if (this.props.data) {
            this.state.data = this.props.data
        }
    }
    componentWillReceiveProps(props) {
        if (props.data) {
            this.setState({
                data: _.cloneDeep(props.data)
            })
        }
    }
    render() {
        return (
            <div className={styles.wrap}>
                <div className={styles.logo}>
                    <img src={this.state.osLogos[`logo_${this.state.data.os}`]} alt="logo" />
                </div>
                <div className={styles.info}>
                    <div className={styles.infoTop}>
                        <i className="icon-desktop"></i>
                        <a href="">{this.state.data.name}</a>
                        <div className={this.state.data.status === 'building' ? styles.building : ''}>{this.state.data.status}</div>
                        <i className="icon-info"></i>
                        <span>{this.state.data.ip}</span>
                        <i className="icon-folder"></i>
                        <span>{this.state.data.location}</span>
                    </div>
                    <div className={styles.infoBottom}>
                        <i className="icon-plus" onClick={(e) => { this.addBlockToggle() }}></i>
                        <div className={styles.browserList}>
                            {this.state.data.resources.map((obj, index) => {
                                return (<dl key={index}>
                                    <dt>{obj}</dt>
                                    <dd><i className="icon-trash" onClick={() => { this.deleteResources(index) }}></i></dd>
                                </dl>)
                            })}
                        </div>
                        <div ref="addBlock" className={styles.addBlock} style={{ display: this.state.addBlockShow ? 'block' : 'none' }}>
                            <p>Separate multiple resources name with commas</p>
                            <div className={styles.addInput}><input onChange={(e) => { this.setState({ text: e.target.value }) }} value={this.state.text} type="text" placeholder="Input value" /></div>
                            <div className={styles.addButton}>
                                <button className={styles.addButtonConfirm} onClick={() => { this.confirm() }}>Add Resources</button>
                                <button className={styles.addButtonCancel} onClick={() => { this.addBlockToggle(false) }}>Cancel</button>
                            </div>
                            <i className="icon-close" onClick={() => { this.addBlockToggle(false) }}></i>
                            <div className={styles.triangleWrap}>
                                <div className={styles.triangle}>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        this.state.data.status === 'building' && <div className={styles.deny}>
                            <i className="icon-deny"></i>
                            <span>Deny</span>
                        </div>
                    }

                </div>
            </div>
        )
    }
    addBlockToggle(tag) {
        let tag2 = !this.state.addBlockShow
        let body = document.getElementsByTagName('body')[0]
        if (tag === true || tag2) {
            body.addEventListener('click', this.state.closeAddBlockListener)
        }else {
            body.removeEventListener('click', this.state.closeAddBlockListener)
        }
        this.setState({
            text: ''
        })
        if (arguments.length) {
            this.setState({
                addBlockShow: tag
            })
        } else {
            this.setState({
                addBlockShow: tag2
            })
        }

    }
    closeAddBlockListener(e) {
        let addBlock = this.refs.addBlock
        let tag = true
        let parents = dom.getParents(e.target)
        if(e.target === addBlock){
            tag = false
        }
        for (let i = 0; i < parents.length; i++) {
            const element = parents[i];
            if(element === addBlock){
                tag = false
            }
        }

        if(tag){
            this.addBlockToggle(false)
        }
       
    }
    deleteResources(index) {
        let data = this.state.data
        data.resources.splice(index, 1)
        this.setState({
            data
        })
        //下面添加修改resources的代码（删除）
    }
    addResources() {
        let text = this.state.text
        let data = this.state.data
        let items = text.split(',').filter((item) => { if (item.trim() !== '') { return true } })
        data.resources.push(...items)        
        this.setState({
            data
        })

        //下面添加修改resources的代码（添加）
    }
    confirm() {
        this.addResources()
        this.addBlockToggle(false)
    }
}

export default Main