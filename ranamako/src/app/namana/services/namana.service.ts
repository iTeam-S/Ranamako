import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class NamanaService {
    constructor(
        private http: HttpClient
    ) {}

    requestResponse(donnees: string): Observable<string> {
        return this.http.post<{response_data: string}>(`${environment.apiUrl}/`, 
            {prompt: `${donnees}`}
        ).pipe(
            map(response => response.response_data.trim())
        );
    }
}
