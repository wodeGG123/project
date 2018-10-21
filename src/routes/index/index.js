import React from 'react';
import { connect } from 'dva';
import styles from './index.scss';
import Header from '../../components/header/index'
import Footer from '../../components/footer/index'
import Nav from '../../components/nav/index'
import { withRouter } from 'dva/router';

class Main extends React.Component {
  render(){
    return (<div className={styles.wrap}>
      <Header/>
      <div className={styles.content}>
        <div className={styles.nav}>
          <Nav />
        </div>
        <div className={styles.page}>
          {this.props.children}
        </div>
      </div>
      <Footer/>
    </div>)
  }
}
export default withRouter(connect()(Main));
