import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { ProductsResponse } from 'src/app/shared/interfaces/store.interface';
import { StoreService } from 'src/app/shared/services/store.service';
import { ViewChild } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private store: StoreService, private router: Router) { }

  product !: ProductsResponse;
  @ViewChild('slider') slider: any;
  @ViewChild("playButtonIcon") playButtonIcon: any;
  @ViewChild("currentTime") currentTime: any;
  @ViewChild("totalDuration") totalDuration: any;
  wv: any;
  valorInicial: string = "";

  ngOnInit(): void {
    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // Desplazar la ventana hacia arriba al cambiar de ruta
      }
    });
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.store.oneProduct(id))
      )
      .subscribe(data => {
        this.product = data;
        this.valorInicial = this.product?.audio || ""; // Asignar valor dependiendo de product.audio

        this.wv = new WaveSurfer({
          container: "#waveform",
          height: 65,
          waveColor: "#757373",
          progressColor: "#292828",
          barWidth: 2,
          url: "../../../../../assets/audio/" + this.valorInicial,
        });
       

      });
      

  }

  play = () => {
    this.wv.playPause() 
    if (this.wv.isPlaying() == true) {
      this.playButtonIcon.nativeElement.src = '../../../../../assets/icons/pause-circle.svg';
    } else {
      this.playButtonIcon.nativeElement.src = '../../../../../assets/icons/play-circle.svg';
    }
  };

  ngOnDestroy(): void {
    if (this.wv) {
      this.wv.stop();
      this.wv.destroy();
    }
  }

  increase() {
    if (this.product != null) {
      var c = this.product?.quantity ?? 1;
      c = c + 1;
      this.product.quantity = c;
    }
  }

  decrease() {
    if (this.product != null) {
      var c = this.product?.quantity ?? 1;
      c = c - 1;
      this.product.quantity = c;
    }
  }

  addProduct() {
    this.store.saveCart(this.product);
  }

}
