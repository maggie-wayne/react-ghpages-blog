import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom'
import PostsItem from '../PostsItem'
import { getTitle, getDateStr } from '../../utils'

const MockData = JSON.parse(`{"name":"2018-06-11-双虚拟机隔离网关机的配置.md","path":"posts/privacy/2018-06-11-双虚拟机隔离网关机的配置.md","sha":"fc9316578b9bba36e04b3608a149af8de9e69c16"}`)

describe('components', () => {
    describe('postsItem', () => {
        it('Test postsItem components.', () => {
            const wrapper = mount(
                <MemoryRouter>
                    <PostsItem file={MockData} />
                </MemoryRouter>
            )
            const title = getTitle(MockData.name)
            const postsDate = getDateStr(MockData.name)

            expect(wrapper.find('.posts-title a').text()).toEqual(title)
            expect(wrapper.find('.posts-date').text()).toEqual(postsDate)
        })
    })
})