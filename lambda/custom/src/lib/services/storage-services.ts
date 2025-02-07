import { HandlerInput } from "ask-sdk";
import { SkillBuilders } from 'ask-sdk';
import { resolve } from "path";
import { reject } from "lodash";

export class StorageService {

  /**
   * Convenience method for retrieving specific session attributes
   * @static
   * @param {HandlerInput} handlerInput 
   * @param {string} key
   * @returns
   * @memberof StorageService 
   */
  static fetchAttributeFromSession(handlerInput: HandlerInput, key:string) {
    const {attributesManager} = handlerInput;
    let sessionAttributes = attributesManager.getSessionAttributes();
    return sessionAttributes[key];
  }
/**
 * Syncs persistent attributes to the current user session
 * @static
 * @param {HandlerInput} handlerInput 
 * @returns {Promise<boolean>}
 * @memberof StorageService
 */
  static syncPersistentAttributesToSession(handlerInput: HandlerInput): Promise<boolean> {
    return new Promise((resolve,reject) => {
      const {attributesManager} = handlerInput;
      attributesManager.getPersistentAttributes().then(
        (persistentAttributesResponse) => {
            attributesManager.setSessionAttributes(persistentAttributesResponse);
            resolve(true);
        },
        (persistentAttributesError) => {
            reject(false);
        }
      )
    })
    

  }


  /**
   * Sync session attributes with persistent attributes
   * @param {HandlerInput} handlerInput 
   * @param {string} key 
   * @param {*} value
   * @memberof StorageService 
   */
  static setHybridPersistentAttributes(handlerInput: HandlerInput, key: string, value: any){
    const {attributesManager} = handlerInput;
    let sessionAttributes = attributesManager.getSessionAttributes();
    sessionAttributes[key] = value;
    attributesManager.setSessionAttributes(sessionAttributes);
    attributesManager.setPersistentAttributes(sessionAttributes);

  }

  /**
   * Sync and Save attributes to database
   * @param {HandlerInput} handlerInput 
   * @param {string} key 
   * @param {*} value
   * @memberof StorageService 
   */
  static saveGlobalPersistenceAttributes(handlerInput: HandlerInput): Promisse<boolean> {
    return new Promise((resolve, reject) => {
      const {attributesManager} = handlerInput;
      let sessionAttributes = attributesManager.getSessionAttributes();
      attributesManager.setSessionAttributes(sessionAttributes);
      attributesManager.setPersistentAttributes(sessionAttributes);

      attributesManager.savePersistentAttributes().then(
        () => {
          resolve(true);
        }
      ),
      (saveAttributesError) => {
        //log the error here
        reject(false);
      }
    })
  }
}