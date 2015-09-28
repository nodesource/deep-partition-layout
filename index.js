import hierarchy from 'deep-hierarchy'

function depth (node) {
  var c = node.children
  var d = 0

  if (c) {
    for (var g, i = 0, n = c.length; i < n; i++) {
      if ((g = depth(c[i])) > d) d = g
    }
  }

  return 1 + d
}

function position (node, x, dx, dy) {
  var children = node.children
  var n = children && children.length

  node.x = x
  node.y = node.depth * dy
  node.dx = dx
  node.dy = dy

  if (!n) return

  var i = -1
  var c, d

  dx = node.value
    ? dx / node.value
    : 0

  while (++i < n) {
    c = children[i]
    d = c.value * dx
    position(c, x, d, dy)
    x += d
  }
}

export default function Partition () {
  var layout = hierarchy()
  var size = [1, 1]

  function partition (d, i) {
    var nodes = layout.call(this, d, i)

    position(nodes[0], 0, size[0], size[1] / depth(nodes[0]))

    return nodes
  }

  partition.nodes = partition
  partition.children = rebind(partition, layout, 'children')
  partition.value = rebind(partition, layout, 'value')
  partition.sort = rebind(partition, layout, 'sort')

  partition.size = (...a) => a.length
    ? (size = [+a[0][0], +a[0][1]], partition)
    : size.slice()

  return partition
}

function rebind (self, layout, key) {
  return (...args) => {
    var x = layout[key].apply(layout, args)
    return x === layout ? self : x
  }
}
