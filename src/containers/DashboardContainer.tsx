import { IState } from '../reducers';

import { connect } from 'react-redux';

import DashboardComponent from "../components/DashboardComponent";

import { populateServers, setCurrentServer, toggleIDELogin, toggleSidebar, updateWorkspacesList } from '../actions/Dashboard';
import { getCurrentServer, getIDELoginIsActive,  getServers, getSidebarIsActive,} from '../selectors/Dashboard';


const mapStateToProps = (state: IState) => ({
    // IDE
    PIDELoginIsActive : getIDELoginIsActive(state),

    // Servers
    Pservers : getServers(state),

    PcurrentServer : getCurrentServer(state),

    // Sidebar
    PsidebarIsActive : getSidebarIsActive(state),

    
})

const mapDispatchToProps = {
    // Servers
    PpopulateServers : populateServers,
    PsetCurrentServer : setCurrentServer,

    // Workspaces
    PupdateWorkspacesList : updateWorkspacesList,

    // Sidebar
    PtoggleSidebar : toggleSidebar,

    // toggle IDE -> Login 
    PtoggleIDELogin : toggleIDELogin,
} 

export default connect<any,any,any>(mapStateToProps, mapDispatchToProps)(DashboardComponent)
