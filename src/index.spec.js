import { expect } from 'chai'

import tagNames from 'html-tag-names'

import $ from './'

describe('zeact', function () {
  it('is an function', function () {
    expect($).to.be.a('function')
  })

  it('has a function for each tagName', function () {
    expect(tagNames).to.have.lengthOf(148)
    tagNames.forEach((tag) => {
      expect($).to.have.property(tag).that.is.a('function')
    })
  })
})
