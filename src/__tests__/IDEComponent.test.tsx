import * as Enzyme from 'enzyme';

import * as Adapter from 'enzyme-adapter-react-16';

import * as React from 'react';

import IDEComponent from '../components/IDEComponent';

Enzyme.configure({ adapter: new Adapter() })

function shallowSetup() {
  const props = {

    PcurrentServer : 'che.openshift.io',
    PcurrentWorkspacePerServer : {},
    Pservers : {}
  }

  const enzymeWrapper = Enzyme.shallow(<IDEComponent {...props} />)

  return {
    enzymeWrapper,
    props
  }
}

function mountSetup() {
  const props = {

    PcurrentServer : 'che.openshift.io',
    PcurrentWorkspacePerServer : {},
    Pservers : []
  }
  const enzymeWrapper = Enzyme.mount(<IDEComponent {...props} />)

  return {
    enzymeWrapper,
    props
  }
}

describe('Dashboard Components', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = shallowSetup();
      expect(enzymeWrapper.exists()).toBe(true);
      expect(enzymeWrapper.find('div').hasClass('IDEComponent')).toBe(true);
    });

    it('renders IDE when current server changes', () => {
        const { enzymeWrapper } = mountSetup();
        enzymeWrapper.setProps({
          PcurrentServer: 'che-eclipse-io-178.90.89.100'
        });
        expect(enzymeWrapper.prop('PcurrentServer')).toEqual('che-eclipse-io-178.90.89.100');
    });

    it('renders IDE when list of authenticated server changes', () => {
        const { enzymeWrapper } = mountSetup();
        enzymeWrapper.setProps({
            Pservers: { servers : { 'che-eclipse-che-128.90.56.1' : { fetchingWorkspaces : true, workspaces : []}}}
        })
        expect(enzymeWrapper.prop('Pservers')).toEqual({'servers':
        { 'che-eclipse-che-128.90.56.1': { 'fetchingWorkspaces': true, 'workspaces': []}}});
    });
})
