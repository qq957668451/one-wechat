import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    label: '@ctitle(3, 6)',
    children: []
  }]
})

const children = Mock.mock({
  'items|8': [{
    id: '@id',
    label: '@ctitle(5, 7)',
    children: []
  }]
})

const person = Mock.mock({
  'items|30': [{
    id: '@id',
    label: '@ctitle(3, 6)',
    children: []
  }]
})

const common = Mock.mock({
  'items|30': [{
    id: '@id',
    label: '@ctitle(3, 6)',
    children: []
  }]
})

const save = Mock.mock({
  'items|30': [{
    id: '@id',
    label: '@ctitle(3, 6)',
    children: []
  }]
})

function getTreeData() {
  data.items.map((v, k) => {
    v.children = []
    children.items.map((vv, kk) => {
      v.children.push({ id: vv.id + v.id, label: vv.label + v.label })
    })
  })
  return data.items
}

export default [
  {
    url: '/vue-admin-template/school/group',
    type: 'get',
    response: config => {
      const items = getTreeData()
      return {
        code: 20000,
        data: {
          list: items
        }
      }
    }
  },

  {
    url: '/vue-admin-template/person/group',
    type: 'get',
    response: config => {
      const items = person.items
      return {
        code: 20000,
        data: {
          list: items
        }
      }
    }
  },

  {
    url: '/vue-admin-template/public/group',
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
    url: '/vue-admin-template/person/group',
    type: 'post',
    response: config => {
      const items = save.items[0]
      return {
        code: 20000,
        data: {
          data: items
        }
      }
    }
  }
]
