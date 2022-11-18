import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/service/event.service';


@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  eventList$: Observable<Event[]> = this.eventService.getAll();

  @Output() clicked: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private eventService: EventService,
    private router: Router,
  ) { }

  ngOnInit(): void { }

  onDelete(event: Event): void {
    this.eventService.remove(event);
  }

}
