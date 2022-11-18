import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Event } from '../model/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  eventsUrl: string = "https://nettuts.hu/jms/feladat/events";

  list$: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);

  constructor(
    private http: HttpClient) {
  }

  newEvent: Observable<Event> = new Observable<Event>;

  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventsUrl);
  }

  get(id: number | string): Observable<Event> {
    id = parseInt('' + id);
    /*if (id===0){
      console.log(id, this.newEvent);
      return this.newEvent;
    }*/
    return this.http.get<Event>(`${this.eventsUrl}/${id}`);
  }

  update(event: Event): Observable<Event> {
    return this.http.patch<Event>(
      `${this.eventsUrl}/${event.id}`,
      event,
    );
  }

  create(event: Event): void {
    this.http.post<Event>(
      `${this.eventsUrl}/${event.id}`,
      event).subscribe(createdEvent => {
        const list = this.list$.getValue();
        list.push(createdEvent);
        this.list$.next(list);});
  }

  remove(event: Event): void {
    this.http.delete<Event>(`${this.eventsUrl}/${event.id}`).subscribe(
        deletedEvent => {
          const list = this.list$.getValue();
          list.push(deletedEvent);
          this.list$.next(list);
        });
  }

}
