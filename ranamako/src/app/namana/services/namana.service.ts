import { Injectable } from "@angular/core";
import { Configuration, OpenAIApi } from "openai";
import { BehaviorSubject, from, Observable, take, tap } from "rxjs";
import { environment } from "src/environments/environment";

const configuration = new Configuration({
    apiKey: `${environment.OPENAI_API_KEY}`
});
const openai = new OpenAIApi(configuration);

@Injectable()
export class NamanaService {

    

    private _response!: string;
    private _responseOpenai$ = new BehaviorSubject<string>(this._response);
    get responseOpenai$(): Observable<string> {
        return this._responseOpenai$.asObservable();
    }

    requestOpenai(prompt: string): void {
        from(openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 3001,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0
        })).pipe(
            take(1),
            tap(response => {
                this._responseOpenai$.next(response.data.choices[0].text as string);
            }),
        ).subscribe();
    }

}
