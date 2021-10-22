import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/exhibit/list',
    method: 'get',
    params: query
  })
}

export function fetchAll() {
  return request({
    url: '/exhibit/all',
    method: 'get'
  })
}

export function createItem(data) {
  return request({
    url: '/exhibit/create',
    method: 'post',
    data
  })
}

export function updateItem(data) {
  return request({
    url: '/exhibit/update',
    method: 'post',
    data
  })
}

export function deleteItem(data) {
  return request({
    url: '/exhibit/delete',
    method: 'post',
    data
  })
}
