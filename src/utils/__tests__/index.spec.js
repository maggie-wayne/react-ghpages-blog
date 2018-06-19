const index = require('../index')

it('Test hashCode function.', () => {
    expect(index.hashCode('test string')).toEqual(-318923937)
    expect(index.hashCode()).toEqual('')
})

it('Test getTitle and getDateStr function.', () => {
    const testCase = [
        {
            fileName: '2018-06-03-开发浏览器扩展 react webpack 配置.md',
            title: '开发浏览器扩展 react webpack 配置',
            date: '2018-06-03'
        },
        {
            fileName: '2018-6-3-开发浏览器扩展_react_webpack_配置.md',
            title: '开发浏览器扩展 react webpack 配置',
            date: '2018-6-3'
        }
    ]
    testCase.forEach(item => {
        expect(index.getTitle(item.fileName)).toEqual(item.title)
        expect(index.getDateStr(item.fileName)).toEqual(item.date)
    })
})

it('Test capitalizeFirstLetter function', () => {
    expect(index.capitalizeFirstLetter('hello')).toEqual('Hello')
    expect(index.capitalizeFirstLetter('你好')).toEqual('你好')
    expect(index.capitalizeFirstLetter('123')).toEqual('123')
    expect(index.capitalizeFirstLetter).toThrowError(`Cannot read property 'charAt' of undefined`)
})

it('Test isType function', () => {
    const testCase = {
        string: 'hello',
        number: 123,
        array: [1, 2, 3],
        boolean: false,
        function: () => true,
        object: {},
        null: null,
        undefined: undefined,
        symbol: Symbol('hello')
    }

    for (const key in testCase) {
        if (testCase.hasOwnProperty(key)) {
            const element = testCase[key];
            expect(index.isType(element, key)).toEqual(true)
        }
    }
    
    expect(index.isType.bind(this, 'some value', 123)).toThrowError('Type must is a string.')
    expect(index.isType.bind(this, 'some value', 'other')).toThrowError('Unexpected type.')
})