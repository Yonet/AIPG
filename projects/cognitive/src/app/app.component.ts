import { Component, EventEmitter, Output } from '@angular/core';
import { VisionService } from './vision.service';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
} )
export class AppComponent {
  @Output() analyzeRequest = new EventEmitter();
  title = 'cognitive';
  constructor ( private visionService: VisionService ) {

  }

  onClick () {
    this.analyzeRequest.emit( "image url" );
    console.log( 'clicked e' );
    this.visionService.analyzeImage().subscribe( id => console.log( 'Subscribed id ', id ) );

  }
}
