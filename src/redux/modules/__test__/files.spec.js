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
                },
                {
                    name: '[draft]2018-05-05-Firefox 隐私设置.md',
                    path: 'posts/privacy/2018-05-05-Firefox 隐私设置.md',
                    sha: '21da41877719d97f67dc16e964e35c78b540538f'
                },
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
                sha: '21da41877719d97f67dc16e964e35c78b540539f'
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
                        response: MockResponse,
                        cacheKey: 'test'
                    }
                )
            ).toEqual({
                loading: false,
                items: {
                    test: MockResponse.items.slice(0, 2)
                }
            })
        })

        it('should handle DIR_FETCH_SUCCESS action.', () => {
            expect(
                files(
                    {},
                    {
                        type: 'DIR_FETCH_SUCCESS',
                        response: MockDirResponse,
                        cacheKey: 'test'
                    }
                )
            ).toEqual({
                loading: false,
                items: {
                    test: [MockDirResponse[1]]
                }
            })
        })
    })
})