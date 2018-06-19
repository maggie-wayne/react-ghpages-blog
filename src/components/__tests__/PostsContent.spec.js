import React from 'react';
import { shallow } from 'enzyme';

import PostsContent from '../PostsContent'
import { getTitle, getDateStr } from '../../utils'

const MockData = {
    html: '<p>some content<p>',
    fileName: '2018-01-01-test file name.md'
}

describe('components', () => {
    describe('postsContent', () => {
        it('Test postsContent components.', () => {
            const wrapper = shallow(<PostsContent content={MockData} />)
            const title = getTitle(MockData.fileName)
            const date = getDateStr(MockData.fileName)

            expect(wrapper.find('.posts-title').text()).toEqual(title)
            expect(wrapper.find('.posts-date').text()).toEqual(date)
        })
    })
})