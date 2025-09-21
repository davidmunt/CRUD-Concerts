import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Concert } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ConcertService {
  constructor(private apiService: ApiService) {}

  get_concerts(): Observable<Concert[]> {
    return this.apiService.get(`/concerts/`);
  }

  get_concert(slug: String): Observable<Concert> {
    return this.apiService.get(`/concerts/${slug}`);
  }

  create_concert(concert: Concert): Observable<Concert> {
    return this.apiService.post(`/concerts/`, concert);
  }

  update_concert(slug: String, concert: Concert): Observable<Concert> {
    return this.apiService.put(`/concerts/${slug}`, concert);
  }

  delete_concert(slug: String): Observable<Concert> {
    return this.apiService.delete(`/concerts/${slug}`);
  }
}
