import * as Enzyme from 'enzyme';

import * as Adapter from 'enzyme-adapter-react-16';

import * as React from 'react';

import WorkspaceComponent from '../components/WorkspaceComponent';

Enzyme.configure({ adapter: new Adapter() })

function shallowSetup() {
  const props = {
    PcurrentServer : '',
    Pservers : {},
    PsetCurrentWorkspace : jest.fn(),
    PworkspaceInfo : { config : { name : '' }},
  }

  const enzymeWrapper = Enzyme.shallow(<WorkspaceComponent {...props} />)

  return {
    enzymeWrapper,
    props
  }
}

describe('Workspace Component', () => {
    it('should render self and subcomponents', () => {
        const { enzymeWrapper } = shallowSetup();
        enzymeWrapper.setProps({
          PsidebarIsActive: true
        });
        expect(enzymeWrapper.exists()).toBe(true);
        expect(enzymeWrapper.find('div').hasClass('workspace-bm-menu')).toBe(true);
    })

    it('should invoke the handleButton callback', () => {
        const mockFn = jest.fn();
        WorkspaceComponent.prototype.handleButton = mockFn;
        const { enzymeWrapper } = shallowSetup();
        enzymeWrapper.setState({ cheServerURL: 'something' })
        enzymeWrapper.find('.bm-item').simulate('click');
        expect(mockFn).toHaveBeenCalledTimes(1);
    })
})
