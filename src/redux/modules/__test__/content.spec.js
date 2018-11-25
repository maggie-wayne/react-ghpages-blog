import content from '../contents'
import { hashCode } from '../../../utils'

describe('reducers', () => {
    describe('content', () => {
        const initalState = {
            loading: true,
            items: {}
        }

        it('should provide the initial state.', () => {
            expect(content(undefined, {})).toEqual(initalState)
        })

        it('should handle FILE_DETAIL_REQUEST action.', () => {
            expect(content(initalState, { type: 'FILE_DETAIL_REQUEST' })).toEqual(initalState)
        })

        it('should handle FILE_DETAIL_SUCCESS action.', () => {
            const path = 'test/2018-06-11-双虚拟机隔离网关机的配置.md'
            const cacheKey = hashCode(path)
            const response = 'some html code ...'
            expect(
                content(
                    initalState,
                    {
                        type: 'FILE_DETAIL_SUCCESS',
                        response,
                        path
                    }
                )
            ).toEqual({
                items: {
                    [cacheKey]: {
                        html: response,
                        fileName: '2018-06-11-双虚拟机隔离网关机的配置.md'
                    }
                },
                loading: false
            })
        })
    })
})