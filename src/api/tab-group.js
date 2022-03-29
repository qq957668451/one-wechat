import request from '@/utils/request'

export function getSchoolGroup(params) {
  return request({
    url: '/vue-admin-template/school/group',
    method: 'get',
    params
  })
}

export function getPersonGroup(params) {
  return request({
    url: '/vue-admin-template/person/group',
    method: 'get',
    params
  })
}

export function getPublicGroup(params) {
  return request({
    url: '/vue-admin-template/public/group',
    method: 'get',
    params
  })
}

export function savePersonGroup(params) {
  return request({
    url: '/vue-admin-template/person/group',
    method: 'post',
    params
  })
}

export function savePersonGroupUser(params) {
  return request({
    url: '/vue-admin-template/person/group',
    method: 'post',
    params
  })
}

export function savePersonSelected(params) {
  return request({
    url: '/vue-admin-template/person/group',
    method: 'post',
    params
  })
}
