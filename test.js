import partition from './index'
import clone from 'clone'
import test from 'tape'

test('size', t => {
  const tree = {
    value: 5,
    children: [
      { value: 2 },
      { value: 4 }
    ]
  }

  const data1 = partition()
    .size([1, 1])
    .nodes(clone(tree))

  const data2 = partition()
    .size([100, 200])
    .nodes(clone(tree))

  t.equal(data1[0].x, 0, '[1, 1] root.x: 0')
  t.equal(data1[0].y, 0, '[1, 1] root.y: 0')
  t.equal(data1[0].dx, 1, '[1, 1] root.dx: 1')
  t.equal(data1[0].dy, 0.5, '[1, 1] root.dy: 0.5')

  t.equal(data1[1].y, 0.5, '[1, 1] child[0].y: 0.5')
  t.equal(data1[1].dy, 0.5, '[1, 1] child[0].dy: 0.5')
  t.equal(data1[2].y, 0.5, '[1, 1] child[1].y: 0.5')
  t.equal(data1[2].dy, 0.5, '[1, 1] child[1].dy: 0.5')

  t.equal(data1[1].x, 4 / 11, '[1, 1] child[0].x: 4 / 11')
  t.equal(data1[1].dx, 2 / 11, '[1, 1] child[0].dx: 2 / 11')
  t.equal(data1[2].x, 0, '[1, 1] child[1].x: 0')
  t.equal(data1[2].dx, 4 / 11, '[1, 1] child[1].dx: 4 / 11')

  t.equal(data2[0].x, 0, '[100, 200] root.x: 0')
  t.equal(data2[0].y, 0, '[100, 200] root.y: 0')
  t.equal(data2[0].dx, 100, '[100, 200] root.dx: 100')
  t.equal(data2[0].dy, 100, '[100, 200] root.dy: 100')

  t.equal(data2[1].y, 100, '[100, 200] child[0].y: 0.5')
  t.equal(data2[1].dy, 100, '[100, 200] child[0].dy: 0.5')
  t.equal(data2[2].y, 100, '[100, 200] child[1].y: 0.5')
  t.equal(data2[2].dy, 100, '[100, 200] child[1].dy: 0.5')

  t.equal(data2[1].x, 400 / 11, '[100, 200] child[0].x: 400 / 11')
  t.equal(data2[1].dx, 200 / 11, '[100, 200] child[0].dx: 200 / 11')
  t.equal(data2[2].x, 0, '[100, 200] child[1].x: 0')
  t.equal(data2[2].dx, 400 / 11, '[100, 200] child[1].dx: 400 / 11')

  t.end()
})

test('rebinding works correctly', t => {
  const tree = {
    size: 1,
    offspring: [
      { size: 2 },
      { size: 3 }
    ]
  }

  const nodes = partition()
    .value(d => d.size)
    .children(d => d.offspring)
    .nodes(tree)

  t.equal(nodes.length, 3)
  t.equal(nodes[0].value, 6)
  t.equal(nodes[1].value, 2)
  t.equal(nodes[2].value, 3)

  t.end()
})
