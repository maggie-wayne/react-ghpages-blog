import directories from '../directories'

describe('reducers', () => {
    describe('directories', () => {
        const MockData = [
            {
                name: 'Linux',
                path: 'posts/Linux',
                sha: '7f2d6a7452e36bbcdedd4c4bca9809badac8af1e'
            }
        ]
        const MockResponse = [
            {
                name: 'privacy',
                path: 'posts/privacy',
                type: 'dir',
                sha: 'e09fa8bb3f396f31af120858d0ebea23e0a4750d'
            },
            {
                name: '2018-05-05-Firefox 隐私设置.md',
                path: 'posts/privacy/2018-05-05-Firefox 隐私设置.md',
                type: 'file',
                sha: '21da41877719d97f67dc16e964e35c78b540537f'
            }
        ]

        const initalState = {
            items: [],
            loading: true
        }

        it('should provide the initial state.', () => {
            expect(directories(undefined, {})).toEqual(initalState)
        })

        it('should handle DIR_FETCH_REQUEST action.', () => {
            expect(directories({}, { type: 'DIR_FETCH_REQUEST' }).loading).toEqual(true)
        })

        it('should handle DIR_FETCH_SUCCESS action.', () => {
            expect(
                directories(
                    {
                        items: MockData
                    },
                    {
                        type: 'DIR_FETCH_SUCCESS',
                        response: MockResponse
                    }
                )
            ).toEqual({
                loading: false,
                items: MockData.concat(MockResponse[0])
            })
        })
    })
})