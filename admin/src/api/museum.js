import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/museum/list',
    method: 'get',
    params: query
  })
}

export function fetchAll() {
  return request({
    url: '/museum/all',
    method: 'get'
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createItem(data) {
  return request({
    url: '/museum/create',
    method: 'post',
    data
  })
}

export function updateItem(data) {
  return request({
    url: '/museum/update',
    method: 'post',
    data
  })
}

export function deleteItem(data) {
  return request({
    url: '/museum/delete',
    method: 'post',
    data
  })
}
