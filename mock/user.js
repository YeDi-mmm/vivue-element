export default [
  {
    url: '/helloWorld',
    method: 'get',
    response: ({ query }) => {
      console.log(query)
      return 'hello world'
    }
  }
]