import * as _ from 'lodash';

import { Speech } from '../enum/speech';
import { CanonicalSSML } from '../enum/canonical-ssml.enum'; 

export class SpeechHelperService {

  static randomSpeech: any = {
    "WELCOME": [
      CanonicalSSML.SKILL_FIRST_LAUNCH + Speech.welcome_0_0_0,
      CanonicalSSML.SKILL_FIRST_LAUNCH + Speech.welcome_0_0_1
    ],
    "GENERAL_ERROR": [
      Speech.general_error_0_0_0
    ],
  
    "EXIT": [
    Speech.general_exit_0_0_0
    ],
    "HELP": [
    Speech.general_help_0_0_0
    ],
    "HELLO": [
      Speech.hello_0_0_0
      ]
  }

  static randomMessage(type: string): string {
    return '<speak>' + _.sample(this.randomSpeech[type]) + '</speak>';
  }

  
  static randomMessageFragment(type: string): string {
    return _.sample(this.randomSpeech[type]);
  }
}
