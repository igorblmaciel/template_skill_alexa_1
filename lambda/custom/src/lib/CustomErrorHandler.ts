import { HandlerInput, ErrorHandler } from "ask-sdk";
import { Response } from "ask-sdk-model";

import { SpeechHelperService } from './services/speech-helper-service';
import { RandomMessageTypes } from './speech/enum/random-message-types.enum';


export class CustomErrorHandler implements ErrorHandler {
  canHandle( handlerInput: HandlerInput ) {
    return true;

  } 

  async handle(handlerInput: HandlerInput, error: Error): Promise<Response> {
    
    const { request } = handlerInput.requestEnvelope;
    const {responseBuilder} = handlerInput;

    let rb = responseBuilder.getResponse();

    console.log(`Error Handled ${error.message})` );
    console.log(`Original Request was: ${JSON.stringify(request,null,2)}` );

    //Conditional Logic

    rb = responseBuilder.speak(SpeechHelperService.randomMessage(RandomMessageTypes.GENERAL_ERROR))
                          .withShouldEndSession(false)
                          .getResponse();

    return rb;
    
  }
}