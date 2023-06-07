import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-wavesurfer',
  templateUrl: './wavesurfer.component.html',
  styleUrls: ['./wavesurfer.component.scss']
})
export class WavesurferComponent implements OnInit, OnDestroy {
  @ViewChild('currentTimeRef') currentTimeRef!: ElementRef<HTMLParagraphElement>;
  waveSurfer!: WaveSurfer;
  audioDurationHuman = '00:00:00';

  ngOnInit(): void {
    this.createWaveSurfer();
    this.playWhenReady();
  }

  ngOnDestroy(): void {
    if (this.waveSurfer) {
      this.waveSurfer.destroy()
    }
  }

  createWaveSurfer() {
    this.waveSurfer = WaveSurfer.create({
      container: "#waveform",
      height: 65,
      waveColor: "#757373",
      progressColor: "#292828",
      barWidth: 1.5,
    });
    this.waveSurfer.load("../../../../../assets/audio/BadBunny.wav")
  }

  playWhenReady() {
    this.waveSurfer.on('ready', () => {
      this.onPlayPause();
    });
  }


  onPlayPause() {
    this.waveSurfer.playPause();
  }

}
