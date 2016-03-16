# deep-partition-layout

A fork of [d3](http://github.com/mbostock/d3)'s [partition layout](https://github.com/d3/d3-hierarchy/blob/master/src/partition.js) which includes the values of inner nodes in its final sums.

## Usage

### `partition = Partition()`

Creates a new partition layout instance.

### `partition.children([children])`

If children is specified, sets the specified children accessor function. If children is not specified, returns the current children accessor function, which by default assumes that the input data is an object with a children array:

``` javascript
function children(d) {
  return d.children
}
```

### `partition.value([value])`

If value is specified, sets the value accessor to the specified function. If value is not specified, returns the current value accessor, which assumes that the input data is an object with a numeric value attribute:

``` javascript
function value(d) {
  return d.value
}
```

***Note:*** *multiple calls to `partition.nodes` on the same root node will result in re-accummulating each node's values. It's wise to have your `value` accessor set to something other than the default to avoid unexpected results.*

### `partition.sort([comparator])`

If comparator is specified, sets the sort order of sibling nodes for the layout using the specified comparator function. If comparator is not specified, returns the current group sort order, which defaults to descending order by the associated input data's numeric value attribute:

``` javascript
function comparator(a, b) {
  return b.value - a.value
}
```

### `partition.size([size])`

If size is specified, sets the available layout size to the specified two-element array of numbers representing x and y.

``` javascript
import Partition from 'deep-partition-layout'

const width = 320
const height = 240
const partition = Partition()
  .size([width, height])
```

### `partition.nodes(root)`

Runs the partition layout, returning the array of nodes associated with the specified root node. In the process of doing so, the following properties will be added to each node in your tree:

* `parent`: the parent node, or null for the root.
* `children`: the array of child nodes, or null for leaf nodes.
* `value`: the node value, as returned by the value accessor.
* `depth`: the depth of the node, starting at 0 for the root.
* `x`: the minimum x-coordinate of the node position.
* `y`: the minimum y-coordinate of the node position.
* `dx`: the x-extent of the node position.
* `dy`: the y-extent of the node position.

## Authors and Contributors

<table><tbody>
<tr><th align="left">Hugh Kennedy</th><td><a href="https://github.com/hughsk">GitHub/hughsk</a></td><td><a href="http://twitter.com/hughskennedy">Twitter/@hughskennedy</a></td></tr>
</tbody></table>

Contributions are welcomed from anyone wanting to improve this project!

## License & Copyright

**deep-partition-layout** is Copyright (c) 2015 NodeSource and licensed under the MIT license. All rights not explicitly granted in the MIT license are reserved. See the included [LICENSE.md](./LICENSE.md) file for more details.
