/*
 * Copyright (C) 2015 Opersys inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * Parts of this file were obtained from the repository in the OpenSTF project, at this URL:
 *
 * https://github.com/openstf/stf/blob/master/lib/util/keyutil.js
 *
 * The project is under an Apache 2.0 License:
 *
 * https://github.com/openstf/stf/blob/master/LICENSE
 *
 * The file was changed lightly to integrate with the rest of the current project.
 */

var Keyboard = function (ws) {
    this._ws = ws;
};

var specialKeycodes = {
    "8": "del",
    "9": "tab",
    "13": "enter",
    "20": "caps_lock",
    "27": "escape",
    "33": "page_up",
    "34": "page_down",
    "35": "move_end",
    "36": "move_home",
    "37": "dpad_left",
    "38": "dpad_up",
    "39": "dpad_right",
    "40": "dpad_down",
    "45": "insert",
    "46": "forward_del",
    "93": "menu",
    "112": "f1",
    "113": "f2",
    "114": "f3",
    "115": "f4",
    "116": "f5",
    "117": "f6",
    "118": "f7",
    "119": "f8",
    "120": "f9",
    "121": "f10",
    "122": "f11",
    "123": "f12",
    "144": "num_lock"
};

/*
 * This specific array was extracted from:
 *
 * https://github.com/openstf/adbkit/blob/develop/src/adb/keycode.coffee
 *
 * The hash was converted from CoffeeScript but not modified.
 */
var androidKeycodes = {
    "KEYCODE_UNKNOWN": 0,
    "KEYCODE_SOFT_LEFT": 1,
    "KEYCODE_SOFT_RIGHT": 2,
    "KEYCODE_HOME": 3,
    "KEYCODE_BACK": 4,
    "KEYCODE_CALL": 5,
    "KEYCODE_ENDCALL": 6,
    "KEYCODE_0": 7,
    "KEYCODE_1": 8,
    "KEYCODE_2": 9,
    "KEYCODE_3": 10,
    "KEYCODE_4": 11,
    "KEYCODE_5": 12,
    "KEYCODE_6": 13,
    "KEYCODE_7": 14,
    "KEYCODE_8": 15,
    "KEYCODE_9": 16,
    "KEYCODE_STAR": 17,
    "KEYCODE_POUND": 18,
    "KEYCODE_DPAD_UP": 19,
    "KEYCODE_DPAD_DOWN": 20,
    "KEYCODE_DPAD_LEFT": 21,
    "KEYCODE_DPAD_RIGHT": 22,
    "KEYCODE_DPAD_CENTER": 23,
    "KEYCODE_VOLUME_UP": 24,
    "KEYCODE_VOLUME_DOWN": 25,
    "KEYCODE_POWER": 26,
    "KEYCODE_CAMERA": 27,
    "KEYCODE_CLEAR": 28,
    "KEYCODE_A": 29,
    "KEYCODE_B": 30,
    "KEYCODE_C": 31,
    "KEYCODE_D": 32,
    "KEYCODE_E": 33,
    "KEYCODE_F": 34,
    "KEYCODE_G": 35,
    "KEYCODE_H": 36,
    "KEYCODE_I": 37,
    "KEYCODE_J": 38,
    "KEYCODE_K": 39,
    "KEYCODE_L": 40,
    "KEYCODE_M": 41,
    "KEYCODE_N": 42,
    "KEYCODE_O": 43,
    "KEYCODE_P": 44,
    "KEYCODE_Q": 45,
    "KEYCODE_R": 46,
    "KEYCODE_S": 47,
    "KEYCODE_T": 48,
    "KEYCODE_U": 49,
    "KEYCODE_V": 50,
    "KEYCODE_W": 51,
    "KEYCODE_X": 52,
    "KEYCODE_Y": 53,
    "KEYCODE_Z": 54,
    "KEYCODE_COMMA": 55,
    "KEYCODE_PERIOD": 56,
    "KEYCODE_ALT_LEFT": 57,
    "KEYCODE_ALT_RIGHT": 58,
    "KEYCODE_SHIFT_LEFT": 59,
    "KEYCODE_SHIFT_RIGHT": 60,
    "KEYCODE_TAB": 61,
    "KEYCODE_SPACE": 62,
    "KEYCODE_SYM": 63,
    "KEYCODE_EXPLORER": 64,
    "KEYCODE_ENVELOPE": 65,
    "KEYCODE_ENTER": 66,
    "KEYCODE_DEL": 67,
    "KEYCODE_GRAVE": 68,
    "KEYCODE_MINUS": 69,
    "KEYCODE_EQUALS": 70,
    "KEYCODE_LEFT_BRACKET": 71,
    "KEYCODE_RIGHT_BRACKET": 72,
    "KEYCODE_BACKSLASH": 73,
    "KEYCODE_SEMICOLON": 74,
    "KEYCODE_APOSTROPHE": 75,
    "KEYCODE_SLASH": 76,
    "KEYCODE_AT": 77,
    "KEYCODE_NUM": 78,
    "KEYCODE_HEADSETHOOK": 79,
    "KEYCODE_FOCUS": 80,
    "KEYCODE_PLUS": 81,
    "KEYCODE_MENU": 82,
    "KEYCODE_NOTIFICATION": 83,
    "KEYCODE_SEARCH": 84,
    "KEYCODE_MEDIA_PLAY_PAUSE": 85,
    "KEYCODE_MEDIA_STOP": 86,
    "KEYCODE_MEDIA_NEXT": 87,
    "KEYCODE_MEDIA_PREVIOUS": 88,
    "KEYCODE_MEDIA_REWIND": 89,
    "KEYCODE_MEDIA_FAST_FORWARD": 90,
    "KEYCODE_MUTE": 91,
    "KEYCODE_PAGE_UP": 92,
    "KEYCODE_PAGE_DOWN": 93,
    "KEYCODE_PICTSYMBOLS": 94,
    "KEYCODE_SWITCH_CHARSET": 95,
    "KEYCODE_BUTTON_A": 96,
    "KEYCODE_BUTTON_B": 97,
    "KEYCODE_BUTTON_C": 98,
    "KEYCODE_BUTTON_X": 99,
    "KEYCODE_BUTTON_Y": 100,
    "KEYCODE_BUTTON_Z": 101,
    "KEYCODE_BUTTON_L1": 102,
    "KEYCODE_BUTTON_R1": 103,
    "KEYCODE_BUTTON_L2": 104,
    "KEYCODE_BUTTON_R2": 105,
    "KEYCODE_BUTTON_THUMBL": 106,
    "KEYCODE_BUTTON_THUMBR": 107,
    "KEYCODE_BUTTON_START": 108,
    "KEYCODE_BUTTON_SELECT": 109,
    "KEYCODE_BUTTON_MODE": 110,
    "KEYCODE_ESCAPE": 111,
    "KEYCODE_FORWARD_DEL": 112,
    "KEYCODE_CTRL_LEFT": 113,
    "KEYCODE_CTRL_RIGHT": 114,
    "KEYCODE_CAPS_LOCK": 115,
    "KEYCODE_SCROLL_LOCK": 116,
    "KEYCODE_META_LEFT": 117,
    "KEYCODE_META_RIGHT": 118,
    "KEYCODE_FUNCTION": 119,
    "KEYCODE_SYSRQ": 120,
    "KEYCODE_BREAK": 121,
    "KEYCODE_MOVE_HOME": 122,
    "KEYCODE_MOVE_END": 123,
    "KEYCODE_INSERT": 124,
    "KEYCODE_FORWARD": 125,
    "KEYCODE_MEDIA_PLAY": 126,
    "KEYCODE_MEDIA_PAUSE": 127,
    "KEYCODE_MEDIA_CLOSE": 128,
    "KEYCODE_MEDIA_EJECT": 129,
    "KEYCODE_MEDIA_RECORD": 130,
    "KEYCODE_F1": 131,
    "KEYCODE_F2": 132,
    "KEYCODE_F3": 133,
    "KEYCODE_F4": 134,
    "KEYCODE_F5": 135,
    "KEYCODE_F6": 136,
    "KEYCODE_F7": 137,
    "KEYCODE_F8": 138,
    "KEYCODE_F9": 139,
    "KEYCODE_F10": 140,
    "KEYCODE_F11": 141,
    "KEYCODE_F12": 142,
    "KEYCODE_NUM_LOCK": 143,
    "KEYCODE_NUMPAD_0": 144,
    "KEYCODE_NUMPAD_1": 145,
    "KEYCODE_NUMPAD_2": 146,
    "KEYCODE_NUMPAD_3": 147,
    "KEYCODE_NUMPAD_4": 148,
    "KEYCODE_NUMPAD_5": 149,
    "KEYCODE_NUMPAD_6": 150,
    "KEYCODE_NUMPAD_7": 151,
    "KEYCODE_NUMPAD_8": 152,
    "KEYCODE_NUMPAD_9": 153,
    "KEYCODE_NUMPAD_DIVIDE": 154,
    "KEYCODE_NUMPAD_MULTIPLY": 155,
    "KEYCODE_NUMPAD_SUBTRACT": 156,
    "KEYCODE_NUMPAD_ADD": 157,
    "KEYCODE_NUMPAD_DOT": 158,
    "KEYCODE_NUMPAD_COMMA": 159,
    "KEYCODE_NUMPAD_ENTER": 160,
    "KEYCODE_NUMPAD_EQUALS": 161,
    "KEYCODE_NUMPAD_LEFT_PAREN": 162,
    "KEYCODE_NUMPAD_RIGHT_PAREN": 163,
    "KEYCODE_VOLUME_MUTE": 164,
    "KEYCODE_INFO": 165,
    "KEYCODE_CHANNEL_UP": 166,
    "KEYCODE_CHANNEL_DOWN": 167,
    "KEYCODE_ZOOM_IN": 168,
    "KEYCODE_ZOOM_OUT": 169,
    "KEYCODE_TV": 170,
    "KEYCODE_WINDOW": 171,
    "KEYCODE_GUIDE": 172,
    "KEYCODE_DVR": 173,
    "KEYCODE_BOOKMARK": 174,
    "KEYCODE_CAPTIONS": 175,
    "KEYCODE_SETTINGS": 176,
    "KEYCODE_TV_POWER": 177,
    "KEYCODE_TV_INPUT": 178,
    "KEYCODE_STB_POWER": 179,
    "KEYCODE_STB_INPUT": 180,
    "KEYCODE_AVR_POWER": 181,
    "KEYCODE_AVR_INPUT": 182,
    "KEYCODE_PROG_RED": 183,
    "KEYCODE_PROG_GREEN": 184,
    "KEYCODE_PROG_YELLOW": 185,
    "KEYCODE_PROG_BLUE": 186,
    "KEYCODE_APP_SWITCH": 187,
    "KEYCODE_BUTTON_1": 188,
    "KEYCODE_BUTTON_2": 189,
    "KEYCODE_BUTTON_3": 190,
    "KEYCODE_BUTTON_4": 191,
    "KEYCODE_BUTTON_5": 192,
    "KEYCODE_BUTTON_6": 193,
    "KEYCODE_BUTTON_7": 194,
    "KEYCODE_BUTTON_8": 195,
    "KEYCODE_BUTTON_9": 196,
    "KEYCODE_BUTTON_10": 197,
    "KEYCODE_BUTTON_11": 198,
    "KEYCODE_BUTTON_12": 199,
    "KEYCODE_BUTTON_13": 200,
    "KEYCODE_BUTTON_14": 201,
    "KEYCODE_BUTTON_15": 202,
    "KEYCODE_BUTTON_16": 203,
    "KEYCODE_LANGUAGE_SWITCH": 204,
    "KEYCODE_MANNER_MODE": 205,
    "KEYCODE_3D_MODE": 206,
    "KEYCODE_CONTACTS": 207,
    "KEYCODE_CALENDAR": 208,
    "KEYCODE_MUSIC": 209,
    "KEYCODE_CALCULATOR": 210,
    "KEYCODE_ZENKAKU_HANKAKU": 211,
    "KEYCODE_EISU": 212,
    "KEYCODE_MUHENKAN": 213,
    "KEYCODE_HENKAN": 214,
    "KEYCODE_KATAKANA_HIRAGANA": 215,
    "KEYCODE_YEN": 216,
    "KEYCODE_RO": 217,
    "KEYCODE_KANA": 218,
    "KEYCODE_ASSIST": 219,
    "KEYCODE_BRIGHTNESS_DOWN": 220,
    "KEYCODE_BRIGHTNESS_UP": 221,
    "KEYCODE_MEDIA_AUDIO_TRACK": 222
};

function keySender(type, fixedKey) {
    return function(key) {
        if (typeof key === 'string')
            this._ws.send(JSON.stringify({cmd: type, key: key}));
        else {
            var mapped = fixedKey || specialKeycodes[key];
            if (mapped) {
                var androidKey = androidKeycodes['KEYCODE_' + mapped.toUpperCase()];

                if (androidKey)
                    this._ws.send(JSON.stringify({cmd: type, key: androidKey}));
                else
                    console.log("Unknown key: " + key);
            }
        }
    }
}

Keyboard.prototype.type = function(text) {
    this._ws.send(JSON.stringify({cmd: "input.type", text: text}));
};

Keyboard.prototype.keyDown  = keySender('input.keyDown');
Keyboard.prototype.keyUp    = keySender('input.keyUp');
Keyboard.prototype.keyPress = keySender('input.keyPress');

Keyboard.prototype.home = keySender('input.keyPress', 'home');
Keyboard.prototype.menu = keySender('input.keyPress', 'menu');
Keyboard.prototype.back = keySender('input.keyPress', 'back');

module.exports = Keyboard;