import { HandlerInput, RequestHandler } from "ask-sdk";
import { Response } from "ask-sdk-model";

import { SpeechHelperService } from './services/speech-helper-service';
import { RandomMessageTypes } from './speech/enum/random-message-types.enum';

export class AmazonStopIntentHandler implements RequestHandler {
  canHandle( handlerInput: HandlerInput ) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.StopIntent';

  } 

  async handle(handlerInput: HandlerInput): Promise<Response> {
    const responseBuilder = handlerInput.responseBuilder;

    return responseBuilder.speak(SpeechHelperService.randomMessage(RandomMessageTypes.EXIT))
                          .withShouldEndSession(false)
                          .getResponse()
  }
}