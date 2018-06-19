import files from '../files'

describe('reducers', () => {
    describe('files', () => {
        const MockResponse = {
            items: [
                {
                    name: '2018-06-11-双虚拟机隔离网关机的配置.md',
                    path: 'posts/privacy/2018-06-11-双虚拟机隔离网关机的配置.md',
                    sha: 'fc9316578b9bba36e04b3608a149af8de9e69c16'
                },
                {
                    name: '2018-05-05-Firefox 隐私设置.md',
                    path: 'posts/privacy/2018-05-05-Firefox 隐私设置.md',
                    sha: '21da41877719d97f67dc16e964e35c78b540537f'
                }
            ]
        }
        const MockDirResponse = [
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
            expect(files(undefined, {})).toEqual(initalState)
        })

        it('should handle FILE_FETCH_REQUEST action.', () => {
            expect(files({}, { type: 'FILE_FETCH_REQUEST' }).loading).toEqual(true)
        })

        it('should handle FILE_FETCH_SUCCESS action.', () => {
            expect(
                files(
                    {},
                    {
                        type: 'FILE_FETCH_SUCCESS',
                        response: MockResponse
                    }
                )
            ).toEqual({
                loading: false,
                items: MockResponse.items
            })
        })

        it('should handle DIR_FETCH_SUCCESS action.', () => {
            expect(
                files(
                    {},
                    {
                        type: 'DIR_FETCH_SUCCESS',
                        response: MockDirResponse
                    }
                )
            ).toEqual({
                loading: false,
                items: [MockDirResponse[1]]
            })
        })
    })
})