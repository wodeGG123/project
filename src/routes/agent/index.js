import React from 'react'
import styles from './index.scss'
import StatusCube from '../../components/statusCube/index'
import InfoBoard from '../../components/infoBoard/index'
import Bar from '../../components/bar/index'
import AgentBlock from '../../components/agentBlock/index'
import agent from '../../services/agent'
import ReactIScroll from 'react-iscroll'
import iScroll from 'iscroll'
import { connect } from 'dva'
import _ from 'lodash'
class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            height: '',
            agents: [],
            requesting:false,
            type:'all',
            info: {
                all: 8,
                physical: 4,
                virtual: 4,
                building:3,
                idle:5
            }
        }
    }
    render() {
        return (
            <div className={styles.wrap} style={{ height: this.state.height }}>
                <ReactIScroll iScroll={iScroll}
                    options={{ mouseWheel: true, scrollbars: true, disablePointer: true }}
                    onScrollStart={() => { }}
                    onScrollEnd={(e) => { this.onScrollEnd(e) }}
                >
                    <div className={styles.content}>
                        <div className={styles.top}>
                            <StatusCube
                                icon='icon-cog'
                                rotate={true}
                                type='Building'
                                num={this.state.info.building}
                                bg='#ffb900'
                            />
                            <StatusCube
                                icon='icon-coffee'
                                rotate={false}
                                type='Idle'
                                num={this.state.info.idle}
                                bg='#7fbc39'
                            />
                            <InfoBoard
                                all={this.state.info.all}
                                physical={this.state.info.physical}
                                virtual={this.state.info.virtual}
                            />
                        </div>
                        <div className={styles.mid}>
                            <Bar agentsFilter={(type)=>{this.agentsFilter(type)}} />
                        </div>
                        <div className={styles.list}>
                            {
                                this.state.agents.map((obj, index) => {
                                    return (<AgentBlock key={index} data={obj} />)
                                })
                            }
                        </div>
                    </div>
                </ReactIScroll>
            </div>
        )
    }
    componentWillMount() {
        this.setHeight()
        this.getAgents(true,{type:this.state.type})
    }
    agentsFilter(type){
        this.setState({
            type
        },()=>{
            this.getAgents(true,{type})
        })
    }
    getAgents(tag,param) {
        if(!this.state.requesting){
            this.setState({
                requesting:true
            })
            agent.getAgents(param).then((data) => {
                if (data) {
                    let agents = data.data
                    if (!tag) {
                        agents = this.state.agents
                        agents.push(...data.data)
                    }
                    //控制agents数量展示
                    // this.setInfo(agents)
                    this.setState({
                        agents,
                        requesting:false
                    })
                }
            })
        }
    }
    setInfo(datas) {
        let all = 0
        let physical = 0
        let virtual = 0
        let building = 0
        let idle = 0
        all = datas.length
        for (let i = 0; i < datas.length; i++) {
            const element = datas[i];
            if (element.type === 'physical') {
                physical++
            } else if (element.type === 'virtual') {
                virtual++
            }
            if(element.status === 'building'){
                building++
            }else if(element.status === 'idle'){
                idle++
            }
        }
        this.setState({
            info: {
                all,
                physical,
                virtual,
                building,
                idle
            }
        })
    }
    setHeight() {
        let height = this.props.config.contentHeight
        this.setState({
            height: `${height}px`
        })
    }
    onScrollEnd(e) {
        let maxY = Math.abs(e.maxScrollY)
        let y = Math.abs(e.y)
        if (maxY - y < 20) {
            this.getAgents(false,{type:this.state.type})
        }
    }
}

export default connect(({ config }) => ({ config }))(Main)