import { IState } from '../reducers'

import { connect } from "react-redux";

import SidebarComponent from "../components/SidebarComponent"

import {fetchWorkspaces, toggleSidebar} from "../actions/Sidebar"

import {getSidebarIsActive, getWkspsIsFetching, getWorkspaces} from "../selectors/Sidebar"

const mapStateToProps = (state: IState) => ({
    PsidebarIsActive : getSidebarIsActive(state),
    PwkspsIsFetching : getWkspsIsFetching(state),
    Pworkspaces : getWorkspaces(state),
})

const mapDispatchToProps = {
    PfetchWorkspaces : fetchWorkspaces,
    PtoggleSidebar : toggleSidebar,
}

export default connect<any,any,any>(mapStateToProps, mapDispatchToProps)(SidebarComponent)
