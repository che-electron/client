import * as Enzyme from 'enzyme';

import * as Adapter from 'enzyme-adapter-react-16';

import * as React from 'react';

import SidebarComponent from '../components/SidebarComponent';

Enzyme.configure({ adapter: new Adapter() })

function shallowSetup() {
    const props = {
        PcurrentServer : '',
        PpopulateServers : jest.fn(),
        Pservers : {},
        PsetCurrentServer : jest.fn(),
        PsetCurrentWorkspace : jest.fn(),
        PsidebarIsActive : false,
        PtoggleIDELogin : jest.fn(),
        PtoggleSidebar : jest.fn(),
        PupdateWorkspacesList : jest.fn()
      }

    const enzymeWrapper = Enzyme.shallow(<SidebarComponent {...props} />)

    return {
      enzymeWrapper,
      props
    }
  }

  function mountSetup() {
    const props = {
        PcurrentServer : 'che-eclipse-che-128.90.56.1',
        PpopulateServers : jest.fn(),
        Pservers : { 'che-eclipse-che-128.90.56.1' : { fetchingWorkspaces : true, workspaces : []}},
        PsetCurrentServer : jest.fn(),
        PsetCurrentWorkspace : jest.fn(),
        PsidebarIsActive : true,
        PtoggleIDELogin : jest.fn(),
        PtoggleSidebar : jest.fn(),
        PupdateWorkspacesList : jest.fn(),
      }

    const enzymeWrapper = Enzyme.shallow(<SidebarComponent {...props} />)

    return {
      enzymeWrapper,
      props
    }
  }

describe('Sidebar Component', () => {
    it('should render self and subcomponents', () => {
        const { enzymeWrapper } = shallowSetup();
        expect(enzymeWrapper.exists()).toBe(true);
        expect(enzymeWrapper.find('div').at(0).hasClass('sidebar-component')).toBe(true);
        expect(enzymeWrapper.find('div').at(1).hasClass('server-sidebar')).toBe(false);
        enzymeWrapper.setProps({
            PsidebarIsActive : true
        })
        expect(enzymeWrapper.find('div').at(1).hasClass('server-sidebar')).toBe(true);
    });

    it('should toogle the Sidebar', () => {
        const mockFn = jest.fn();
        const { enzymeWrapper } = shallowSetup();
        enzymeWrapper.setProps({ PtoggleSidebar : mockFn })
        enzymeWrapper.find('.toggle-sidebar').simulate('click');
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should render Dashboard when list of servers changes', () => {
        const { enzymeWrapper } = mountSetup();
        expect(enzymeWrapper.find('WorkspacesComponent').prop('Pservers')).
        toEqual({ 'che-eclipse-che-128.90.56.1' : { fetchingWorkspaces : true, workspaces : []}});
    });

    it('should render Servers and Workspaces Component', () => {
        const { enzymeWrapper } = mountSetup();
        expect(enzymeWrapper.find('WorkspacesComponent').prop('Pservers')).
        toEqual({ 'che-eclipse-che-128.90.56.1' : { fetchingWorkspaces : true, workspaces : []}});
        expect(enzymeWrapper.find('ServersComponent').prop('PcurrentServer')).
        toEqual('che-eclipse-che-128.90.56.1');
    });
})
