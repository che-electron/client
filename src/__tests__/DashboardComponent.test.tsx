import * as Enzyme from 'enzyme';

import * as Adapter from 'enzyme-adapter-react-16';

import * as React from 'react';

import DashboardComponent from '../components/DashboardComponent';

Enzyme.configure({ adapter: new Adapter() })

function shallowSetup() {
  const props = {
    // Sidebar
    PsidebarIsActive : true,
    PtoggleSidebar : jest.fn(),

    // Servers
    PcurrentServer : 'che.openshift.io',
    PcurrentWorkspacePerServer : {},
    PpopulateServers : jest.fn(),
    Pservers : {},
    PsetCurrentServer : jest.fn(),

    // Workspaces
    PsetCurrentWorkspace : jest.fn(),
    PupdateWorkspacesList : jest.fn(),

    // IDE|Login Toggle
    PIDELoginIsActive : false,
    PtoggleIDELogin : jest.fn()
  }

  const enzymeWrapper = Enzyme.shallow(<DashboardComponent {...props} />)

  return {
    enzymeWrapper,
    props
  }
}

function mountSetup() {
  const props = {
    // Sidebar
    PsidebarIsActive : true,
    PtoggleSidebar : jest.fn(),

    // Servers
    PcurrentServer : 'che.openshift.io',
    PcurrentWorkspacePerServer : {},
    PpopulateServers : jest.fn(),
    Pservers : {},
    PsetCurrentServer : jest.fn(),

    // Workspaces
    PsetCurrentWorkspace : jest.fn(),
    PupdateWorkspacesList : jest.fn(),

    // IDE|Login Toggle
    PIDELoginIsActive : false,
    PtoggleIDELogin : jest.fn()
  }
  const enzymeWrapper = Enzyme.mount(<DashboardComponent {...props} />)

  return {
    enzymeWrapper,
    props
  }
}

describe('Dashboard Components', () => {
  it('should render self and subcomponents', () => {
      const { enzymeWrapper } = shallowSetup();
      expect(enzymeWrapper.exists()).toBe(true);
      expect(enzymeWrapper.find('div').hasClass('Dashboard')).toBe(true);
      expect(enzymeWrapper.find('SidebarComponent').prop('PsidebarIsActive')).toBe(true);
      expect(enzymeWrapper.find('SidebarComponent').prop('PcurrentServer')).toEqual('che.openshift.io');
  });

  it('renders Dashboard when sidebar is inactive', () => {
    const { enzymeWrapper } = mountSetup();

    enzymeWrapper.setProps({
      PsidebarIsActive: false
    });
    expect(enzymeWrapper.find('SidebarComponent').prop('PsidebarIsActive')).toEqual(false);
  });

  it('renders Dashboard when current server is changed', () => {
    const { enzymeWrapper } = mountSetup();
    enzymeWrapper.setProps({
      PcurrentServer: 'che-eclipse-io-178.90.89.100'
    });
    expect(enzymeWrapper.find('SidebarComponent').prop('PcurrentServer')).toEqual('che-eclipse-io-178.90.89.100');
  });
})
