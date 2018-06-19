import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom'
import PostsList from '../PostsList'
import { getTitle, getDateStr } from '../../utils'

const MockData = [
    { name: "2018-06-10-file0.md", path: "posts/privacy/2018-06-10-file0.md", sha: "fc9316578b9bba36e04b3608a149af8de9e69c10" },
    { name: "2018-06-11-file1.md", path: "posts/privacy/2018-06-11-file1.md", sha: "fc9316578b9bba36e04b3608a149af8de9e69c11" },
    { name: "2018-06-12-file2.md", path: "posts/privacy/2018-06-12-file2.md", sha: "fc9316578b9bba36e04b3608a149af8de9e69c12" },
    { name: "2018-06-13-file3.md", path: "posts/privacy/2018-06-13-file3.md", sha: "fc9316578b9bba36e04b3608a149af8de9e69c13" }
]

const sortedData = MockData.slice()
    .sort((postsA, postsB) => {
        const dateA = new Date(getDateStr(postsA.name)).getTime()
        const dateB = new Date(getDateStr(postsB.name)).getTime()
        return dateB - dateA
    })

describe('components', () => {
    describe('postsList', () => {
        it('Test postslist components.', () => {
            const wrapper = mount(
                <MemoryRouter>
                    <PostsList list={MockData} />
                </MemoryRouter>
            )
            const elList = wrapper.find('.posts-item')

            expect(elList.length).toEqual(MockData.length)
            expect(
                elList.everyWhere((item, index) => {
                    const name = sortedData[index].name
                    const title = getTitle(name)
                    const postsDate = getDateStr(name)

                    return (
                        item.find('.posts-title a').text() === title &&
                        item.find('.posts-date').text() === postsDate
                    )
                })
            ).toEqual(true)
        })

        it('When the list is empty', () => {
            const wrapper = mount(
                <MemoryRouter>
                    <PostsList list={[]} />
                </MemoryRouter>
            )
            expect(wrapper.text()).toEqual('Nothing ...')
        })
    })
})