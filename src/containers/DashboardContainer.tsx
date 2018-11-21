import { IState } from '../reducers';

import { connect } from 'react-redux';

import DashboardComponent from "../components/DashboardComponent";

import { populateServers, toggleIDELogin, toggleSidebar } from '../actions/Dashboard';
import { getIDELoginIsActive,  getServers, getSidebarIsActive,} from '../selectors/Dashboard';


const mapStateToProps = (state: IState) => ({
    // IDE
    PIDELoginIsActive : getIDELoginIsActive(state),

    // Servers
    Pservers : getServers(state),
   
    // Sidebar
    PsidebarIsActive : getSidebarIsActive(state),

    
})

const mapDispatchToProps = {
    // Servers
    PpopulateServers : populateServers,

    // Sidebar
    PtoggleSidebar : toggleSidebar,

    // toggle IDE -> Login 
    PtoggleIDELogin : toggleIDELogin,
} 

export default connect<any,any,any>(mapStateToProps, mapDispatchToProps)(DashboardComponent)
