import React from 'react';
import { shallow } from 'enzyme';

import FooterBar from '../FooterBar'

describe('components', () => {
    describe('footerbar', () => {
        it('Test footerbar components.', () => {
            const wrapper = shallow(<FooterBar />)
            const years = new Date().getFullYear().toString()

            expect(wrapper.text()).toMatch(years)
            wrapper.unmount()
        })
    })
})