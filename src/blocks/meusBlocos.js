/**
 * @license
 * 
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Define custom blocks.
 * @author samelh@google.com (Sam El-Husseini)
 */

// More on defining blocks:
// https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks


import * as Blockly from 'blockly/core';


/// TEXTO

Blockly.Blocks['text_print'] = {
  /**
   * Block for print statement.
   * @this {Blockly.Block}
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg['TEXT_PRINT_TITLE'],
      "args0": [
        {
          "type": "input_value",
          "name": "TEXT"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "style": "text_blocks",
      "tooltip": Blockly.Msg['TEXT_PRINT_TOOLTIP'],
      "helpUrl": Blockly.Msg['TEXT_PRINT_HELPURL']
    });
    this.setColour('#00A6FF');
  }
};

Blockly.Blocks['text']= {
  init: function() {
    this.jsonInit({
      "type": "text",
      "message0": "%1",
      "args0": [{
        "type": "field_input",
        "name": "TEXT",
        "text": ""
      }],
      "output": "String",
      "style": "text_blocks",
      "helpUrl": "%{BKY_TEXT_TEXT_HELPURL}",
      "tooltip": "%{BKY_TEXT_TEXT_TOOLTIP}",
      "extensions": [
        "text_quotes",
        "parent_tooltip_when_inline"
      ]
    });
    this.setColour('#00A6FF');
  }
};

Blockly.Blocks['text_append']= {
  init: function() {
    this.jsonInit({
      "type": "text_append",
      "message0": "%{BKY_TEXT_APPEND_TITLE}",
      "args0": [{
        "type": "field_variable",
        "name": "VAR",
        "variable": "%{BKY_TEXT_APPEND_VARIABLE}"
      },
      {
        "type": "input_value",
        "name": "TEXT"
      }],
      "previousStatement": null,
      "nextStatement": null,
      "style": "text_blocks",
      "extensions": [
        "text_append_tooltip"
      ]
    });
    this.setColour('#00A6FF');
  }
};


Blockly.Blocks['text_join']= {
  init: function() {
    this.jsonInit({
      "type": "text_join",
      "message0": "",
      "output": "String",
      "style": "text_blocks",
      "helpUrl": "%{BKY_TEXT_JOIN_HELPURL}",
      "tooltip": "%{BKY_TEXT_JOIN_TOOLTIP}",
      "mutator": "text_join_mutator"
    });
    this.setColour('#00A6FF');
  }
};


////MATEMATICA

Blockly.Blocks['math_number']= {
  init: function() {
    this.jsonInit({
      "type": "math_number",
      "message0": "%1",
      "args0": [{
        "type": "field_number",
        "name": "NUM",
        "value": 0
      }],
      "output": "Number",
      "helpUrl": "%{BKY_MATH_NUMBER_HELPURL}",
      "style": "math_blocks",
      "tooltip": "%{BKY_MATH_NUMBER_TOOLTIP}",
      "extensions": ["parent_tooltip_when_inline"]
    });
    this.setColour('#f95f62');
  }
};

Blockly.Blocks['math_arithmetic']= {
  init: function() {
    this.jsonInit({
      "type": "math_arithmetic",
      "message0": "%1 %2 %3",
      "args0": [
        {
          "type": "input_value",
          "name": "A",
          "check": "Number"
        },
        {
          "type": "field_dropdown",
          "name": "OP",
          "options": [
            ["%{BKY_MATH_ADDITION_SYMBOL}", "ADD"],
            ["%{BKY_MATH_SUBTRACTION_SYMBOL}", "MINUS"],
            ["%{BKY_MATH_MULTIPLICATION_SYMBOL}", "MULTIPLY"],
            ["%{BKY_MATH_DIVISION_SYMBOL}", "DIVIDE"],
            ["%{BKY_MATH_POWER_SYMBOL}", "POWER"]
          ]
        },
        {
          "type": "input_value",
          "name": "B",
          "check": "Number"
        }
      ],
      "inputsInline": true,
      "output": "Number",
      "style": "math_blocks",
      "helpUrl": "%{BKY_MATH_ARITHMETIC_HELPURL}",
      "extensions": ["math_op_tooltip"]
    });
    this.setColour('#f95f62');
  }
};


/// VARIAVEIS 

Blockly.Blocks['variables_get']= {
  init: function() {
    this.jsonInit({
      "type": "variables_get",
      "message0": "%1",
      "args0": [
        {
          "type": "field_variable",
          "name": "VAR",
          "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
        }
      ],
      "output": null,
      "style": "variable_blocks",
      "helpUrl": "%{BKY_VARIABLES_GET_HELPURL}",
      "tooltip": "%{BKY_VARIABLES_GET_TOOLTIP}",
      "extensions": ["contextMenu_variableSetterGetter"]
    });
    this.setColour('#FFBA5C');
  }
};

Blockly.Blocks['variables_set']= {
  init: function() {
    this.jsonInit({
      "type": "variables_set",
      "message0": "%{BKY_VARIABLES_SET}",
      "args0": [
        {
          "type": "field_variable",
          "name": "VAR",
          "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
        },
        {
          "type": "input_value",
          "name": "VALUE"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "style": "variable_blocks",
      "tooltip": "%{BKY_VARIABLES_SET_TOOLTIP}",
      "helpUrl": "%{BKY_VARIABLES_SET_HELPURL}",
      "extensions": ["contextMenu_variableSetterGetter"]
    });
    this.setColour('#FFBA5C');
  }
};

///LOGICA

Blockly.Blocks['logic_boolean']= {
  init: function() {
    this.jsonInit({
      "type": "logic_boolean",
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "BOOL",
          "options": [
            ["%{BKY_LOGIC_BOOLEAN_TRUE}", "TRUE"],
            ["%{BKY_LOGIC_BOOLEAN_FALSE}", "FALSE"]
          ]
        }
      ],
      "output": "Boolean",
      "style": "logic_blocks",
      "tooltip": "%{BKY_LOGIC_BOOLEAN_TOOLTIP}",
      "helpUrl": "%{BKY_LOGIC_BOOLEAN_HELPURL}"
    });
    this.setColour('#976DD0');
  }
};

Blockly.Blocks['controls_if']= {
  init: function() {
    this.jsonInit({
      "type": "controls_if",
      "message0": "%{BKY_CONTROLS_IF_MSG_IF} %1",
      "args0": [
        {
          "type": "input_value",
          "name": "IF0",
          "check": "Boolean"
        }
      ],
      "message1": "%{BKY_CONTROLS_IF_MSG_THEN} %1",
      "args1": [
        {
          "type": "input_statement",
          "name": "DO0"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "style": "logic_blocks",
      "helpUrl": "%{BKY_CONTROLS_IF_HELPURL}",
      "mutator": "controls_if_mutator",
      "extensions": ["controls_if_tooltip"]
    });
    this.setColour('#976DD0');
  }
};

Blockly.Blocks['controls_ifelse']= {
  init: function() {
    this.jsonInit( {
      "type": "controls_ifelse",
      "message0": "%{BKY_CONTROLS_IF_MSG_IF} %1",
      "args0": [
        {
          "type": "input_value",
          "name": "IF0",
          "check": "Boolean"
        }
      ],
      "message1": "%{BKY_CONTROLS_IF_MSG_THEN} %1",
      "args1": [
        {
          "type": "input_statement",
          "name": "DO0"
        }
      ],
      "message2": "%{BKY_CONTROLS_IF_MSG_ELSE} %1",
      "args2": [
        {
          "type": "input_statement",
          "name": "ELSE"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "style": "logic_blocks",
      "tooltip": "%{BKYCONTROLS_IF_TOOLTIP_2}",
      "helpUrl": "%{BKY_CONTROLS_IF_HELPURL}",
      "extensions": ["controls_if_tooltip"]
    });
    this.setColour('#976DD0');
  }
};

Blockly.Blocks['logic_compare']= {
  init: function() {
    this.jsonInit({
      "type": "logic_compare",
      "message0": "%1 %2 %3",
      "args0": [
        {
          "type": "input_value",
          "name": "A"
        },
        {
          "type": "field_dropdown",
          "name": "OP",
          "options": [
            ["=", "EQ"],
            ["\u2260", "NEQ"],
            ["\u200F<", "LT"],
            ["\u200F\u2264", "LTE"],
            ["\u200F>", "GT"],
            ["\u200F\u2265", "GTE"]
          ]
        },
        {
          "type": "input_value",
          "name": "B"
        }
      ],
      "inputsInline": true,
      "output": "Boolean",
      "style": "logic_blocks",
      "helpUrl": "%{BKY_LOGIC_COMPARE_HELPURL}",
      "extensions": ["logic_compare", "logic_op_tooltip"]
    });
    this.setColour('#976DD0');
  }
};

Blockly.Blocks['logic_operation']= {
  init: function() {
    this.jsonInit({
      "type": "logic_operation",
      "message0": "%1 %2 %3",
      "args0": [
        {
          "type": "input_value",
          "name": "A",
          "check": "Boolean"
        },
        {
          "type": "field_dropdown",
          "name": "OP",
          "options": [
            ["%{BKY_LOGIC_OPERATION_AND}", "AND"],
            ["%{BKY_LOGIC_OPERATION_OR}", "OR"]
          ]
        },
        {
          "type": "input_value",
          "name": "B",
          "check": "Boolean"
        }
      ],
      "inputsInline": true,
      "output": "Boolean",
      "style": "logic_blocks",
      "helpUrl": "%{BKY_LOGIC_OPERATION_HELPURL}",
      "extensions": ["logic_op_tooltip"]
    });
    this.setColour('#976DD0');
  }
};

Blockly.Blocks['logic_negate']= {
  init: function() {
    this.jsonInit({
      "type": "logic_negate",
      "message0": "%{BKY_LOGIC_NEGATE_TITLE}",
      "args0": [
        {
          "type": "input_value",
          "name": "BOOL",
          "check": "Boolean"
        }
      ],
      "output": "Boolean",
      "style": "logic_blocks",
      "tooltip": "%{BKY_LOGIC_NEGATE_TOOLTIP}",
      "helpUrl": "%{BKY_LOGIC_NEGATE_HELPURL}"
    });
    this.setColour('#976DD0');
  }
};

Blockly.Blocks['logic_ternary']= {
  init: function() {
    this.jsonInit({
      "type": "logic_ternary",
      "message0": "%{BKY_LOGIC_TERNARY_CONDITION} %1",
      "args0": [
        {
          "type": "input_value",
          "name": "IF",
          "check": "Boolean"
        }
      ],
      "message1": "%{BKY_LOGIC_TERNARY_IF_TRUE} %1",
      "args1": [
        {
          "type": "input_value",
          "name": "THEN"
        }
      ],
      "message2": "%{BKY_LOGIC_TERNARY_IF_FALSE} %1",
      "args2": [
        {
          "type": "input_value",
          "name": "ELSE"
        }
      ],
      "output": null,
      "style": "logic_blocks",
      "tooltip": "%{BKY_LOGIC_TERNARY_TOOLTIP}",
      "helpUrl": "%{BKY_LOGIC_TERNARY_HELPURL}",
      "extensions": ["logic_ternary"]
    });
    this.setColour('#976DD0');
  }
};

var testReactField = {
  "type": "test_react_field",
  "message0": "imprime %1",
  "args0": [
    {
      "type": "input_value",
      "name": "TEXT_OUT",
    },
  ],
  "previousStatement": null,
  "nextStatement": null,
};

Blockly.Blocks['test_react_field'] = {
  init: function() {
    this.jsonInit(testReactField);
    this.setStyle('loop_blocks');
    this.setColour('#00A6FF');
  }
};