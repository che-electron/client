import { IState } from '../reducers';

import { connect } from 'react-redux';

import DashboardComponent from "../components/DashboardComponent";

import { toggleSidebar } from '../actions/Dashboard';
import { getSidebarIsActive } from '../selectors/Dashboard';


const mapStateToProps = (state: IState) => ({
    // Sidebar
    PsidebarIsActive : getSidebarIsActive(state)
})

const mapDispatchToProps = {
    // Sidebar
    PtoggleSidebar : toggleSidebar 
} 

export default connect<any,any,any>(mapStateToProps, mapDispatchToProps)(DashboardComponent)
