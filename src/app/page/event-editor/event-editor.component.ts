import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EventService } from 'src/app/service/event.service';
import { Event } from 'src/app/model/event';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {
/*
  urlId: number = this.activatedRoute.params.pipe(
    switchMap( params => this.urlId=params['id'])
  );
*/
  // 1. Kiolvasni az id paramétert az URL-ből.
  // 2. Ezzel a paraméterrel meghívni az EventService.get metódust.
  /*
  event$: Observable<Event> = this.activatedRoute.params.pipe(
    switchMap( params => this.eventService.get(params['id']))
  );
*/

  event$: Observable<Event> = this.activatedRoute.params.pipe(
    switchMap( params => {
      if (params['id']==0) {
        //console.log("0 a route", new Observable<Event>)
        return new Observable(subscriber => {
          subscriber.next(new Event);
        })
      }
      else {
        return this.eventService.get(params['id'])
      }
    })
  );

  //@Input() id: number = -1;

  constructor(private activatedRoute: ActivatedRoute, private eventService: EventService, private router: Router) { }

  ngOnInit(): void { }


  onUpdate(from: NgForm, event: Event){
    if (0===0) {
      this.eventService.create(event);
    }
  }

}
