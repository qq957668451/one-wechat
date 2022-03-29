import request from '@/utils/request'

export function getSchoolGroupUser(params) {
  return request({
    url: '/vue-admin-template/school/user',
    method: 'get',
    params
  })
}

export function getPersonGroupUser(params) {
  return request({
    url: '/vue-admin-template/person/user',
    method: 'get',
    params
  })
}

export function getPublicGroupUser(params) {
  return request({
    url: '/vue-admin-template/public/user',
    method: 'get',
    params
  })
}

export function getSearchGroupUser(params) {
  return request({
    url: '/vue-admin-template/search/user',
    method: 'get',
    params
  })
}

export function getSelectedUser(params) {
  return request({
    url: '/vue-admin-template/selected/user',
    method: 'get',
    params
  })
}
