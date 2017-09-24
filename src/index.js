import R from 'ramda'
import tagNames from 'html-tag-names'

export const h = R.curry(
  (type, attrs = {}, children = []) => {
    const el = document.createElement(type)
    appendChildren(el, children)
    addAttributes(el, attrs)
    return el
  }
)

function appendChildren(el, children) {
  if (R.is(Array, children)) {
    children.forEach(child =>
      el.appendChild(child)
    )
  } else if (
    R.either(R.is(String), R.is(Number), children)
  ) {
    el.appendChild(
      document.createTextNode(children)
    )
  } else {
    throw new Error(
      'children must be array or string'
    )
  }
}

function addAttributes(el, attrs) {
  R.forEachObjIndexed(
    (value, name) => el.setAttribute(name, value),
    attrs
  )
}

const makeElementBuilder = type => (...args) => {
  if (args.length === 1) {
    return R.is(Array, args[0])
      ? h(type, {}, args[0])
      : h(type, args[0], [])
  }
  return h(type, ...args)
}

const elementBuilders = tagNames.reduce((builderMap, tag) => {
  builderMap[tag] = makeElementBuilder(tag)
  return builderMap
}, h)

export default elementBuilders
