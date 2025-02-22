import { reader } from '../../src'

describe('reader', () => {
  it('should of', () => {
    const greet = reader<string, string>(ctx => ctx + "_HelloA")
    const greet2 = greet.of(ctx => ctx + "_HelloB")

    expect(greet.run('Test')).toEqual('Test_HelloA')
    expect(greet2.run('Test')).toEqual('Test_HelloB')
  })

  it('should map', () => {
    const greet = reader<string, string>(ctx => ctx + "_HelloA")
    const greet2 = greet.map(s => s + '_Mapped123')

    expect(greet.run('Test')).toEqual('Test_HelloA')
    expect(greet2.run('Test')).toEqual('Test_HelloA_Mapped123')
  })

  it('should flatMap', () => {

    const greet = (name: string) => reader<string, string>(ctx => ctx + ", " + name)
    const end = (str: string) => reader<string, boolean>(a => a === 'Hello')
      .flatMap(isH => isH ? reader(ctx => str + "!!!") : reader(ctx => str + "."))

    expect(greet('Tom').flatMap(end).run('Hello')).toEqual('Hello, Tom!!!')
    expect(greet('Jerry').flatMap(end).run('Hi')).toEqual('Hi, Jerry.')
  })
})
