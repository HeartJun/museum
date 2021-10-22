import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/indexes/list',
    method: 'get',
    params: query
  })
}

export function fetchAll() {
  return request({
    url: '/indexes/all',
    method: 'get'
  })
}

export function createItem(data) {
  return request({
    url: '/indexes/create',
    method: 'post',
    data
  })
}

export function updateItem(data) {
  return request({
    url: '/indexes/update',
    method: 'post',
    data
  })
}

export function deleteItem(data) {
  return request({
    url: '/indexes/delete',
    method: 'post',
    data
  })
}