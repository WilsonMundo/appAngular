import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Item, ItemCreateDto } from '@core/models/item.model';

@Injectable({ providedIn: 'root' })
export class ItemService {
    private readonly base = `${environment.apiUrl}/items`;

    constructor(private http: HttpClient) { }

    create(dto: ItemCreateDto): Observable<Item> {
        return this.http.post<Item>(this.base, dto);
    }

    getAll(): Observable<Item[]> {
        return this.http.get<Item[]>(this.base);
    }

    getById(id: number): Observable<Item> {
        return this.http.get<Item>(`${this.base}/${id}`);
    }
}