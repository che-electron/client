import * as Enzyme from 'enzyme';

import * as Adapter from 'enzyme-adapter-react-16';

import * as React from 'react';

import LoginComponent from '../components/LoginComponent';

Enzyme.configure({ adapter: new Adapter() })

function shallowSetup() {
    const props = {
        Pauthenticated : true,
        PrequestCheLogin : jest.fn(),
        PrequestOSIOLogin : jest.fn()
    }
    const enzymeWrapper = Enzyme.shallow(<LoginComponent {...props} />);

    return {
      enzymeWrapper,
      props
    }
  }

describe('Login Component', () => {
    describe('Button onClicks', () => {
        it('should invoke the handleOSIO callback', () => {
            const mockFn = jest.fn();
            LoginComponent.prototype.handleOSIO = mockFn;
            const { enzymeWrapper } = shallowSetup();
            enzymeWrapper.setState({ cheServerURL: 'che.openshift.io' })
            enzymeWrapper.find('.connect').simulate('click');
            expect(mockFn).toHaveBeenCalledTimes(1);
        });

        it('should invoke the handleLogin callback', () => {
            const mockFn = jest.fn();
            LoginComponent.prototype.handleLogin = mockFn;
            const { enzymeWrapper } = shallowSetup();
            enzymeWrapper.setState({ cheServerURL: 'something' })
            enzymeWrapper.find('.login').simulate('click');
            expect(mockFn).toHaveBeenCalledTimes(1);
        })
    })
})
