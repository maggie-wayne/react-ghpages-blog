import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom'

import Category from '../Category'
import { capitalizeFirstLetter } from '../../utils'

const MockData = JSON.parse(`{"name":"privacy","path":"posts/privacy","sha":"e09fa8bb3f396f31af120858d0ebea23e0a4750d","size":0,"url":"https://api.github.com/repos/zowiegong/blog/contents/posts/privacy?ref=master","htmlUrl":"https://github.com/zowiegong/blog/tree/master/posts/privacy","gitUrl":"https://api.github.com/repos/zowiegong/blog/git/trees/e09fa8bb3f396f31af120858d0ebea23e0a4750d","downloadUrl":null,"type":"dir","links":{"self":"https://api.github.com/repos/zowiegong/blog/contents/posts/privacy?ref=master","git":"https://api.github.com/repos/zowiegong/blog/git/trees/e09fa8bb3f396f31af120858d0ebea23e0a4750d","html":"https://github.com/zowiegong/blog/tree/master/posts/privacy"}}`)

describe('components', () => {
    describe('category', () => {
        it('Test category components.', () => {
            const { name, path } = MockData
            const wrapper = mount(
                <MemoryRouter>
                    <Category category={MockData} />
                </MemoryRouter>
            )
            expect(wrapper.text()).toEqual(capitalizeFirstLetter(name))
            expect(wrapper.find('a').prop('href')).toEqual('/' + path)
            wrapper.unmount()
        })
    })
})
