import Blockly from 'blockly/core'

Blockly.JavaScript = {}

const MOVEMENT_HUE = 290
const LOOPS_HUE = 120
const LOGIC_HUE = 210
const LEFT_TURN = ' \u21BA'
const RIGHT_TURN = ' \u21BB'

Blockly.Blocks.maze_moveForward = {
  /**
   * Block for moving forward.
   * @this {Blockly.Block}
   */
  init: function () {
    this.jsonInit({
      message0: 'move forward',
      previousStatement: null,
      nextStatement: null,
      colour: MOVEMENT_HUE,
      tooltip: 'Moves the player forward one space.'
    })
  }
}

Blockly.JavaScript.maze_moveForward = function (block) {
  // Generate JavaScript for moving forward.
  return 'moveForward(\'block_id_' + block.id + '\');\n'
}

Blockly.Blocks.maze_turn = {
  /**
   * Block for turning left or right.
   * @this {Blockly.Block}
   */
  init: function () {
    const DIRECTIONS = [
      ['turn left', 'turnLeft'],
      ['turn right', 'turnRight']
    ]
    // Append arrows to direction messages.
    DIRECTIONS[0][0] += LEFT_TURN
    DIRECTIONS[1][0] += RIGHT_TURN
    this.setColour(MOVEMENT_HUE)
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'DIR')
    this.setPreviousStatement(true)
    this.setNextStatement(true)
    this.setTooltip('Turns the player left or right by 90 degrees.')
  }
}

Blockly.JavaScript.maze_turn = function (block) {
  // Generate JavaScript for turning left or right.
  const dir = block.getFieldValue('DIR')
  return dir + '(\'block_id_' + block.id + '\');\n'
}

Blockly.Blocks.maze_if = {
  /**
   * Block for 'if' conditional if there is a path.
   * @this {Blockly.Block}
   */
  init: function () {
    const DIRECTIONS = [
      ['if path ahead', 'isPathForward'],
      ['if path to the left', 'isPathLeft'],
      ['if path to the right', 'isPathRight']
    ]
    // Append arrows to direction messages.
    DIRECTIONS[1][0] += LEFT_TURN
    DIRECTIONS[2][0] += RIGHT_TURN
    this.setColour(LOGIC_HUE)
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'DIR')
    this.appendStatementInput('DO')
      .appendField('do')
    this.setTooltip('If there is a path in the specified direction, \nthen do some actions. ')
    this.setPreviousStatement(true)
    this.setNextStatement(true)
  }
}

Blockly.JavaScript.maze_if = function (block) {
  // Generate JavaScript for 'if' conditional if there is a path.
  const argument = block.getFieldValue('DIR') +
      '(\'block_id_' + block.id + '\')'
  const branch = Blockly.JavaScript.statementToCode(block, 'DO')
  const code = 'if (' + argument + ') {\n' + branch + '}\n'
  return code
}

Blockly.Blocks.maze_ifElse = {
  /**
   * Block for 'if/else' conditional if there is a path.
   * @this {Blockly.Block}
   */
  init: function () {
    const DIRECTIONS = [
      ['if path ahead', 'isPathForward'],
      ['if path to the left', 'isPathLeft'],
      ['if path to the right', 'isPathRight']
    ]
    // Append arrows to direction messages.
    DIRECTIONS[1][0] += LEFT_TURN
    DIRECTIONS[2][0] += RIGHT_TURN
    this.setColour(LOGIC_HUE)
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'DIR')
    this.appendStatementInput('DO')
      .appendField('do')
    this.appendStatementInput('ELSE')
      .appendField('else')
    this.setTooltip('If there is a path in the specified direction, \nthen do the first block of actions. \nOtherwise, do the second block of actions. ')
    this.setPreviousStatement(true)
    this.setNextStatement(true)
  }
}

Blockly.JavaScript.maze_ifElse = function (block) {
  // Generate JavaScript for 'if/else' conditional if there is a path.
  const argument = block.getFieldValue('DIR') +
      '(\'block_id_' + block.id + '\')'
  const branch0 = Blockly.JavaScript.statementToCode(block, 'DO')
  const branch1 = Blockly.JavaScript.statementToCode(block, 'ELSE')
  const code = 'if (' + argument + ') {\n' + branch0 +
             '} else {\n' + branch1 + '}\n'
  return code
}

Blockly.Blocks.maze_forever = {
  /**
   * Block for repeat loop.
   * @this {Blockly.Block}
   */
  init: function () {
    this.setColour(LOOPS_HUE)
    this.appendDummyInput()
      .appendField('repeat until')
      .appendField(new Blockly.FieldImage('maze/marker.png', 12, 16))
    this.appendStatementInput('DO')
      .appendField('do')
    this.setPreviousStatement(true)
    this.setTooltip('Repeat the enclosed actions until finish point \nis reached. ')
  }
}

Blockly.JavaScript.maze_forever = function (block) {
  // Generate JavaScript for repeat loop.
  let branch = Blockly.JavaScript.statementToCode(block, 'DO')
  if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
    branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
      '\'block_id_' + block.id + '\'') + branch
  }
  return 'while (notDone()) {\n' + branch + '}\n'
}
