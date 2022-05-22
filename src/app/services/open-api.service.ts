import { Injectable } from '@angular/core';
import {environment} from '../../../openai_environment';

const OpenAIApi = require('openai-api');
const OPENAI_API_KEY = environment.OPENAI_API_KEY;
const openai = new OpenAIApi(OPENAI_API_KEY);

@Injectable({
  providedIn: 'root'
})

export class OpenAPIService {

  constructor() { }

  getPrompts(text: string, engine: string) {
    return openai.complete({
      "engine": engine,
      "prompt": text,
      "max_tokens": 256,
      "temperature": 0.6,
      "top_p": 1,
      "frequency_penalty": 0,
      "presence_penalty": 0
    })
  }

}
