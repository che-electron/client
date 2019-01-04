import * as Enzyme from 'enzyme';

import * as Adapter from 'enzyme-adapter-react-16';

import * as React from 'react';

import LoginComponent from '../components/LoginComponent';

Enzyme.configure({ adapter: new Adapter() })

function shallowSetup() {
    const props = {
        Pauthenticated : true,
        PrequestCheLogin : jest.fn((cheServerURL : 'some.openshift.io', cheUserName : 'admin', chePassword : 'admin')=> {}),
        PrequestOSIOLogin : jest.fn(() => {})
    }
  
    const enzymeWrapper = Enzyme.shallow(<LoginComponent {...props} />);
  
    return {
      enzymeWrapper,
      props
    }
  }

describe('Login Components', () => {
    describe('Button onClicks', () => {
        it('should invoke the handleOSIO callback', () => {
            let mockFn = jest.fn();
            LoginComponent.prototype.handleOSIO = mockFn;            
            let { enzymeWrapper } = shallowSetup();
            enzymeWrapper.setState({ cheServerURL: 'che.openshift.io' })
            enzymeWrapper.find('.connect').prop('onClick')();
            expect(mockFn).toHaveBeenCalledTimes(1);
        });

        it('should invoke the handleLogin callback', () => {
            let mockFn = jest.fn();
            LoginComponent.prototype.handleLogin = mockFn;
            let { enzymeWrapper } = shallowSetup();
            enzymeWrapper.setState({ cheServerURL: 'something' })
            enzymeWrapper.find('.login').prop('onClick')();
            expect(mockFn).toHaveBeenCalledTimes(1);
        })
    })
})
