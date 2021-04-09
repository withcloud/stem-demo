/* eslint-disable camelcase */

import React from 'react'

import Blockly from 'blockly/core'
import locale from 'blockly/msg/en'
import 'blockly/blocks'

import './blocks'

Blockly.setLocale(locale)

const Maze2 = {}

const maps = [
  // Level 0.
  undefined,
  // Level 1.
  [[0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 1, 3, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]],
  // Level 2.
  [[0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 3, 0, 0, 0],
    [0, 0, 2, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]],
  // Level 3.
  [[0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 1, 1, 1, 1, 3, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]],
  // Level 4.
  /**
   * Note, the path continues past the start and the goal in both directions.
   * This is intentionally done so users see the maze is about getting from
   * the start to the goal and not necessarily about moving over every part of
   * the maze, 'mowing the lawn' as Neil calls it.
   */
  [[0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 3, 1, 0],
    [0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0],
    [0, 2, 1, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0]],
  // Level 5.
  [[0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 2, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]],
  // Level 6.
  [[0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 0],
    [0, 1, 1, 3, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 2, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]],
  // Level 7.
  [[0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0],
    [0, 2, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0],
    [0, 1, 1, 3, 0, 1, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]],
  // Level 8.
  [[0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0],
    [0, 1, 1, 1, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0],
    [0, 2, 1, 1, 0, 3, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]],
  // Level 9.
  [[0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [3, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 1, 0],
    [1, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 2, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]],
  // Level 10.
  [[0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 3, 0, 1, 0],
    [0, 1, 1, 0, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 0, 1, 0],
    [0, 2, 1, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]]
]

const LEVEL = 1

const map = maps[LEVEL]
const ROWS = map.length
const COLS = map[0].length
const SQUARE_SIZE = 50
const PEGMAN_HEIGHT = 52
const PEGMAN_WIDTH = 49

const MAZE_WIDTH = SQUARE_SIZE * COLS
const MAZE_HEIGHT = SQUARE_SIZE * ROWS
// const PATH_WIDTH = SQUARE_SIZE / 3

const SquareType = {
  WALL: 0,
  OPEN: 1,
  START: 2,
  FINISH: 3
}

const tile_SHAPES = {
  10010: [4, 0], // Dead ends
  10001: [3, 3],
  11000: [0, 1],
  10100: [0, 2],
  11010: [4, 1], // Vertical
  10101: [3, 2], // Horizontal
  10110: [0, 0], // Elbows
  10011: [2, 0],
  11001: [4, 2],
  11100: [2, 3],
  11110: [1, 1], // Junctions
  10111: [1, 0],
  11011: [2, 1],
  11101: [1, 2],
  11111: [2, 2], // Cross
  null0: [4, 3], // Empty
  null1: [3, 0],
  null2: [3, 1],
  null3: [0, 3],
  null4: [1, 3]
}

const drawMap = function () {
  const svg = document.getElementById('svgMaze')
  const scale = Math.max(ROWS, COLS) * SQUARE_SIZE
  svg.setAttribute('viewBox', '0 0 ' + scale + ' ' + scale)

  // Draw the outer square.
  Blockly.utils.dom.createSvgElement('rect', {
    height: MAZE_HEIGHT,
    width: MAZE_WIDTH,
    fill: '#F1EEE7',
    'stroke-width': 1,
    stroke: '#CCB'
  }, svg)

  // Return a value of '0' if the specified square is wall or out of bounds,
  // '1' otherwise (empty, start, finish).
  const normalize = function (x, y) {
    if (x < 0 || x >= COLS || y < 0 || y >= ROWS) {
      return '0'
    }
    return (map[y][x] === SquareType.WALL) ? '0' : '1'
  }

  // Compute and draw the tile for each square.
  let tileId = 0
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      // Compute the tile shape.
      let tileShape = normalize(x, y) +
          normalize(x, y - 1) + // North.
          normalize(x + 1, y) + // West.
          normalize(x, y + 1) + // South.
          normalize(x - 1, y) // East.

      // Draw the tile.
      if (!tile_SHAPES[tileShape]) {
        // Empty square.  Use null0 for large areas, with null1-4 for borders.
        // Add some randomness to avoid large empty spaces.
        if (tileShape === '00000' && Math.random() > 0.3) {
          tileShape = 'null0'
        } else {
          tileShape = 'null' + Math.floor(1 + Math.random() * 4)
        }
      }
      const left = tile_SHAPES[tileShape][0]
      const top = tile_SHAPES[tileShape][1]
      // Tile's clipPath element.
      const tileClip = Blockly.utils.dom.createSvgElement('clipPath', {
        id: 'tileClipPath' + tileId
      }, svg)
      Blockly.utils.dom.createSvgElement('rect', {
        height: SQUARE_SIZE,
        width: SQUARE_SIZE,
        x: x * SQUARE_SIZE,
        y: y * SQUARE_SIZE
      }, tileClip)
      // Tile sprite.
      const tile = Blockly.utils.dom.createSvgElement('image', {
        height: SQUARE_SIZE * 4,
        width: SQUARE_SIZE * 5,
        'clip-path': 'url(#tileClipPath' + tileId + ')',
        x: (x - left) * SQUARE_SIZE,
        y: (y - top) * SQUARE_SIZE
      }, svg)
      tile.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href', 'maze/tiles_pegman.png')
      tileId++
    }
  }

  // Add finish marker.
  const finishMarker = Blockly.utils.dom.createSvgElement('image', {
    id: 'finish',
    height: 34,
    width: 20
  }, svg)
  finishMarker.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href', 'maze/marker.png')

  // Pegman's clipPath element, whose (x, y) is reset by Maze.displayPegman
  const pegmanClip = Blockly.utils.dom.createSvgElement('clipPath', {
    id: 'pegmanClipPath'
  }, svg)
  Blockly.utils.dom.createSvgElement('rect', {
    id: 'clipRect',
    height: PEGMAN_HEIGHT,
    width: PEGMAN_WIDTH
  }, pegmanClip)

  // Add Pegman.
  const pegmanIcon = Blockly.utils.dom.createSvgElement('image', {
    id: 'pegman',
    height: PEGMAN_HEIGHT,
    width: PEGMAN_WIDTH * 21, // 49 * 21 = 1029
    'clip-path': 'url(#pegmanClipPath)'
  }, svg)
  pegmanIcon.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href', 'maze/pegman.png')
}

let pidList = []
let pegmanX
let pegmanY
let pegmanD

const DirectionType = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3
}

const startDirection = DirectionType.EAST

const constrainDirection16 = function (d) {
  d = Math.round(d) % 16
  if (d < 0) {
    d += 16
  }
  return d
}

const displayPegman = function (x, y, d, opt_angle) {
  const pegmanIcon = document.getElementById('pegman')
  pegmanIcon.setAttribute('x',
    x * SQUARE_SIZE - d * PEGMAN_WIDTH + 1)
  pegmanIcon.setAttribute('y',
    SQUARE_SIZE * (y + 0.5) - PEGMAN_HEIGHT / 2 - 8)
  if (opt_angle) {
    pegmanIcon.setAttribute('transform', 'rotate(' + opt_angle + ', ' +
        (x * SQUARE_SIZE + SQUARE_SIZE / 2) + ', ' +
        (y * SQUARE_SIZE + SQUARE_SIZE / 2) + ')')
  } else {
    pegmanIcon.setAttribute('transform', 'rotate(0, 0, 0)')
  }

  const clipRect = document.getElementById('clipRect')
  clipRect.setAttribute('x', x * SQUARE_SIZE + 1)
  clipRect.setAttribute('y', pegmanIcon.getAttribute('y'))
}

const scheduleFinish = function (sound) {
  const direction16 = constrainDirection16(pegmanD * 4)
  displayPegman(pegmanX, pegmanY, 16)
  Maze2.stepSpeed = 150 // Slow down victory animation a bit.
  pidList.push(setTimeout(function () {
    displayPegman(pegmanX, pegmanY, 18)
  }, Maze2.stepSpeed))
  pidList.push(setTimeout(function () {
    displayPegman(pegmanX, pegmanY, 16)
  }, Maze2.stepSpeed * 2))
  pidList.push(setTimeout(function () {
    displayPegman(pegmanX, pegmanY, direction16)
  }, Maze2.stepSpeed * 3))
}

const schedule = function (startPos, endPos) {
  const deltas = [(endPos[0] - startPos[0]) / 4,
    (endPos[1] - startPos[1]) / 4,
    (endPos[2] - startPos[2]) / 4]
  displayPegman(startPos[0] + deltas[0],
    startPos[1] + deltas[1],
    constrainDirection16(startPos[2] + deltas[2]))
  pidList.push(setTimeout(function () {
    displayPegman(startPos[0] + deltas[0] * 2,
      startPos[1] + deltas[1] * 2,
      constrainDirection16(startPos[2] + deltas[2] * 2))
  }, Maze2.stepSpeed))
  pidList.push(setTimeout(function () {
    displayPegman(startPos[0] + deltas[0] * 3,
      startPos[1] + deltas[1] * 3,
      constrainDirection16(startPos[2] + deltas[2] * 3))
  }, Maze2.stepSpeed * 2))
  pidList.push(setTimeout(function () {
    displayPegman(endPos[0], endPos[1],
      constrainDirection16(endPos[2]))
  }, Maze2.stepSpeed * 3))
}

const reset = function (first) {
  // Kill all tasks.
  for (let i = 0; i < pidList.length; i++) {
    clearTimeout(pidList[i])
  }
  pidList = []

  // Move Pegman into position.
  pegmanX = start_.x
  pegmanY = start_.y

  if (first) {
    // Opening animation.
    pegmanD = startDirection + 1
    scheduleFinish(false)
    pidList.push(setTimeout(function () {
      Maze2.stepSpeed = 100
      schedule([pegmanX, pegmanY, pegmanD * 4], [pegmanX, pegmanY, pegmanD * 4 - 4])
      pegmanD++
    }, Maze2.stepSpeed * 5))
  } else {
    pegmanD = startDirection
    displayPegman(pegmanX, pegmanY, pegmanD * 4)
  }

  // Move the finish icon into position.
  const finishIcon = document.getElementById('finish')
  finishIcon.setAttribute('x', SQUARE_SIZE * (finish_.x + 0.5) -
      finishIcon.getAttribute('width') / 2)
  finishIcon.setAttribute('y', SQUARE_SIZE * (finish_.y + 0.6) -
      finishIcon.getAttribute('height'))

  // Make 'look' icon invisible and promote to top.
  const lookIcon = document.getElementById('look')
  lookIcon.style.display = 'none'
  lookIcon.parentNode.appendChild(lookIcon)
  const paths = lookIcon.getElementsByTagName('path')
  for (let i = 0, path; (path = paths[i]); i++) {
    path.setAttribute('stroke', '#000')
  }
}

let start_
let finish_

class BlocklyComponent extends React.Component {
  constructor (props) {
    super(props)
    this.blocklyDiv = React.createRef()
    this.toolbox = React.createRef()
  }

  componentDidMount () {
    const { initialXml, children, ...rest } = this.props
    this.primaryWorkspace = Blockly.inject(
      this.blocklyDiv.current,
      {
        toolbox: this.toolbox.current,
        ...rest
      }
    )

    if (initialXml) {
      Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialXml), this.primaryWorkspace)
    }

    drawMap()

    const defaultXml =
      '<xml>' +
        '<block movable="' + (LEVEL !== 1) + '" ' +
        'type="maze_moveForward" x="70" y="70"></block>' +
      '</xml>'

    // Blockly editor.
    const xml = Blockly.Xml.textToDom(defaultXml)
    // Clear the workspace to avoid merge.
    this.primaryWorkspace.clear()
    Blockly.Xml.domToWorkspace(xml, this.primaryWorkspace)
    this.primaryWorkspace.clearUndo()

    // Locate the start and finish squares.
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        if (map[y][x] === SquareType.START) {
          start_ = { x: x, y: y }
        } else if (map[y][x] === SquareType.FINISH) {
          finish_ = { x: x, y: y }
        }
      }
    }

    reset(true)

    // Make connecting blocks easier for beginners.
    Blockly.SNAP_RADIUS *= 2
    Blockly.CONNECTING_SNAP_RADIUS = Blockly.SNAP_RADIUS
  }

  get workspace () {
    return this.primaryWorkspace
  }

  setXml (xml) {
    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), this.primaryWorkspace)
  }

  render () {
    const { children } = this.props
    return (
      <>
        <div ref={this.blocklyDiv} id='blocklyDiv' />
        <xml xmlns='https://developers.google.com/blockly/xml' is='blockly' style={{ display: 'none' }} ref={this.toolbox}>
          {children}
        </xml>
        <style jsx>{`
          #blocklyDiv {
            height: 100%;
            width: 100%;
            position: absolute;
            bottom: 0;
          }
        `}
        </style>
      </>
    )
  }
}

export default BlocklyComponent
