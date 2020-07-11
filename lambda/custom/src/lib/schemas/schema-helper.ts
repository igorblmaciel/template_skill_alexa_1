import {HandlerInput} from "ask-sdk";
import {Profile} from './profile';
import {StorageService} from '../services/storage-services';

export class SchemaHelper {
  static setInitialSchema(handleInput: HandlerInput){
    StorageService.setHybridPersistentAttributes(handleInput, 'profile',Profile);
    //add aditional default schemas
  }
}
