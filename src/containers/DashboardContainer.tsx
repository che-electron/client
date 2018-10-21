import { IState } from '../reducers'

import { connect } from 'react-redux'

import DashboardComponent from "../components/DashboardComponent"


const mapStateToProps = (state: IState) => ({
})

const mapDispatchToProps = {
}

export default connect<any,any,any>(mapStateToProps, mapDispatchToProps)(DashboardComponent)
