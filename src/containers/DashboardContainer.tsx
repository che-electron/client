import { IState } from '../reducers';

import { connect } from 'react-redux';

import DashboardComponent from "../components/DashboardComponent";

import { toggleIDELogin, toggleSidebar } from '../actions/Dashboard';
import {  getIDELoginIsActive, getSidebarIsActive, } from '../selectors/Dashboard';


const mapStateToProps = (state: IState) => ({
    // IDE
    PIDELoginIsActive : getIDELoginIsActive(state),
    // Sidebar
    PsidebarIsActive : getSidebarIsActive(state),
    
})

const mapDispatchToProps = {
    // IDE
    PtoggleIDELogin : toggleIDELogin,
    // Sidebar
    PtoggleSidebar : toggleSidebar 
} 

export default connect<any,any,any>(mapStateToProps, mapDispatchToProps)(DashboardComponent)
