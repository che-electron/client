import * as Enzyme from 'enzyme';

import * as Adapter from 'enzyme-adapter-react-16';

import * as React from 'react';

import ServerComponent from '../components/ServerComponent';

Enzyme.configure({ adapter: new Adapter() })

function shallowSetup() {
  const props = {
        PcurrentServer : '',
        Pservers : {},
        PsetCurrentServer : jest.fn(),
        PsetCurrentWorkspace : jest.fn(),
        PupdateWorkspacesList : jest.fn(),
        key : '',
        server : { url : '', authToken : '', workspaces : []}
    }

  const enzymeWrapper = Enzyme.shallow(<ServerComponent {...props} />)

  return {
    enzymeWrapper,
    props
  }
}

describe('Dashboard Components', () => {
    it('should render self and subcomponents', () => {
        const { enzymeWrapper } = shallowSetup();
        expect(enzymeWrapper.exists()).toBe(true);
        expect(enzymeWrapper.find('div').hasClass('flex-item')).toBe(true);
    });

    it('should invoke the handleClick callback', () => {
        const mockFn = jest.fn();
        ServerComponent.prototype.handleClick = mockFn;
        const { enzymeWrapper } = shallowSetup();
        enzymeWrapper.find('.server-name').simulate('click');
        expect(mockFn).toHaveBeenCalledTimes(1);
    });
})
