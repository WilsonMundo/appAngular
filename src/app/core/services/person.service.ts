import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Person, PersonCreateDto } from '../models/person.model';

@Injectable({ providedIn: 'root' })
export class PersonService {
    private readonly base = `${environment.apiUrl}/persons`; // => /api/persons

    constructor(private http: HttpClient) { }

    create(dto: PersonCreateDto): Observable<Person> {
        return this.http.post<Person>(this.base, dto);
    }


    getAll(): Observable<Person[]> { return this.http.get<Person[]>(this.base); }
    getById(id: number): Observable<Person> { return this.http.get<Person>(`${this.base}/${id}`); }
}
