import content from '../content'

describe('reducers', () => {
    describe('content', () => {
        const initalState = {
            loading: true
        }

        it('should provide the initial state.', () => {
            expect(content(undefined, {})).toEqual(initalState)
        })

        it('should handle FILE_DETAIL_REQUEST action.', () => {
            expect(content({}, { type: 'FILE_DETAIL_REQUEST' })).toEqual(initalState)
        })

        it('should handle FILE_DETAIL_SUCCESS action.', () => {
            expect(
                content(
                    {},
                    {
                        type: 'FILE_DETAIL_SUCCESS',
                        response: 'some html code ...',
                        fileName: 'test file name'
                    }
                )
            ).toEqual({
                html: 'some html code ...',
                fileName: 'test file name',
                loading: false
            })
        })
    })
})