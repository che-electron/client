import * as Enzyme from 'enzyme';

import * as Adapter from 'enzyme-adapter-react-16';

import * as React from 'react';

import ServersComponent from '../components/ServersComponent';

Enzyme.configure({ adapter: new Adapter() })

function shallowSetup() {
  const props = {
    PcurrentServer : '',
    PpopulateServers : jest.fn(),
    Pservers : {},
    PsetCurrentServer : jest.fn(),
    PsetCurrentWorkspace : jest.fn(),
    PsidebarIsActive : true,
    PtoggleIDELogin : jest.fn(),
    PupdateWorkspacesList : jest.fn(),
  }

  const enzymeWrapper = Enzyme.shallow(<ServersComponent {...props} />)

  return {
    enzymeWrapper,
    props
  }
}

function mountSetup() {
  const props = {
    PcurrentServer : 'che-eclipse-che-128.90.58.2',
    PpopulateServers : jest.fn(),
    Pservers : { 'che-eclipse-che-128.90.56.1' : { fetchingWorkspaces : true, workspaces : []}},
    PsetCurrentServer : jest.fn(),
    PsetCurrentWorkspace : jest.fn(),
    PsidebarIsActive : false,
    PtoggleIDELogin : jest.fn(),
    PupdateWorkspacesList : jest.fn()
  }
  const enzymeWrapper = Enzyme.mount(<ServersComponent {...props} />)

  return {
    enzymeWrapper,
    props
  }
}

describe('Dashboard Components', () => {
    it('should render self and subcomponents', () => {
        const { enzymeWrapper } = shallowSetup();
        expect(enzymeWrapper.exists()).toBe(true);
        expect(enzymeWrapper.find('div').at(0).hasClass('servers-component')).toBe(true);
        expect(enzymeWrapper.find('div').at(1).hasClass('servers-list')).toBe(true);
    });

    it('should toogle the Login Page', () => {
        const mockFn = jest.fn();
        const { enzymeWrapper } = shallowSetup();
        enzymeWrapper.setProps({ PtoggleIDELogin: mockFn })
        enzymeWrapper.find('.add-che-server').simulate('click');
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should render Dashboard when list of servers changes', () => {
        const { enzymeWrapper } = mountSetup();
        enzymeWrapper.setProps({
            Pservers: { 'che-eclipse-che-128.90.56.1' : { fetchingWorkspaces : true, workspaces : ['java-workspace']}}
          });
        expect(enzymeWrapper.find('ServerComponent').prop('Pservers')).
        toEqual({ 'che-eclipse-che-128.90.56.1': { 'fetchingWorkspaces': true, 'workspaces': ['java-workspace']}});
    });

    it('should render Dashboard when current server changes', () => {
        const { enzymeWrapper } = mountSetup();
        enzymeWrapper.setProps({
            PcurrentServer: 'che-eclipse-che-128.90.58.5'
          });
        expect(enzymeWrapper.find('ServerComponent').prop('PcurrentServer')).
        toEqual('che-eclipse-che-128.90.58.5');
    });
})
