import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    name: '@ctitle(3, 3)',
    'code|100000-999999': 1,
    group: '@ctitle(6, 8)'
  }]
})

const person = Mock.mock({
  'items|30': [{
    id: '@id',
    name: '@ctitle(3, 3)',
    'code|100000-999999': 1,
    group: '@ctitle(6, 8)'
  }]
})

const common = Mock.mock({
  'items|30': [{
    id: '@id',
    name: '@ctitle(3, 3)',
    'code|100000-999999': 1,
    group: '@ctitle(6, 8)'
  }]
})

const search = Mock.mock({
  'items|30': [{
    id: '@id',
    name: '@ctitle(3, 3)',
    'code|100000-999999': 1,
    group: '@ctitle(6, 8)'
  }]
})

function getSelectedPerson() {
  return [...data.items.slice(2, 4), ...person.items.slice(2, 3), ...common.items.slice(1, 2)]
}

export default [
  {
    url: '/vue-admin-template/school/user',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          list: items
        }
      }
    }
  },

  {
    url: '/vue-admin-template/person/user',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          list: items
        }
      }
    }
  },

  {
    url: '/vue-admin-template/public/user',
    type: 'get',
    response: config => {
      const items = common.items
      return {
        code: 20000,
        data: {
          list: items
        }
      }
    }
  },

  {
    url: '/vue-admin-template/search/user',
    type: 'get',
    response: config => {
      const items = search.items
      return {
        code: 20000,
        data: {
          list: items
        }
      }
    }
  },

  {
    url: '/vue-admin-template/selected/user',
    type: 'get',
    response: config => {
      const items = getSelectedPerson()
      return {
        code: 20000,
        data: {
          list: items
        }
      }
    }
  }
]
