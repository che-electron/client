import * as Enzyme from 'enzyme';

import * as Adapter from 'enzyme-adapter-react-16';

import * as React from 'react';

import DashboardComponent from '../components/DashboardComponent';

Enzyme.configure({ adapter: new Adapter() })

function shallowSetup() {
  const props = {
    PIDELoginIsActive : false,

    PcurrentServer : 'che.openshift.io',
    PcurrentWorkspacePerServer : {},
    PpopulateServers : jest.fn(),
    Pservers : {},
    PsetCurrentServer : jest.fn(),
    PsetCurrentWorkspace : jest.fn(),
    PsidebarIsActive : false,
    PtoggleIDELogin : jest.fn(),
    PtoggleSidebar : jest.fn(),
    PupdateWorkspacesList : jest.fn()
  }
  const enzymeWrapper = Enzyme.shallow(<DashboardComponent {...props} />)

  return {
    enzymeWrapper,
    props
  }
}

describe('Dashboard Components', () => {
  it('should render self and subcomponents', () => {
      const { enzymeWrapper } = shallowSetup();
      enzymeWrapper.setProps({
        PsidebarIsActive: true
      });
      expect(enzymeWrapper.exists()).toBe(true);
      expect(enzymeWrapper.find('div').hasClass('Dashboard')).toBe(true);
      expect(enzymeWrapper.find('SidebarComponent').prop('PsidebarIsActive')).toBe(true);
      expect(enzymeWrapper.find('SidebarComponent').prop('PcurrentServer')).toEqual('che.openshift.io');
  });

  it('renders Dashboard when sidebar is inactive', () => {
    const { enzymeWrapper } = shallowSetup();

    enzymeWrapper.setProps({
      PsidebarIsActive: false
    });
    expect(enzymeWrapper.find('SidebarComponent').prop('PsidebarIsActive')).toEqual(false);
  });

  it('renders Dashboard when current server is changed', () => {
    const { enzymeWrapper } = shallowSetup();
    enzymeWrapper.setProps({
      PcurrentServer: 'che-eclipse-che-178.90.89.100'
    });
    expect(enzymeWrapper.find('SidebarComponent').prop('PcurrentServer')).toEqual('che-eclipse-che-178.90.89.100');
  });

  it('renders IDE Component', () => {
    const { enzymeWrapper } = shallowSetup();
    expect(enzymeWrapper.find('IDEComponent').prop('PcurrentServer')).toEqual('che.openshift.io');
  })
})
