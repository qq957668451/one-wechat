import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    name: '@ctitle(2, 4)',
    desc: '@cparagraph(1, 3)',
    status: '@boolean()',
    'type|1': ['published', 'draft', 'deleted'],
    create_user: '@cname()',
    create_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})

export default [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
