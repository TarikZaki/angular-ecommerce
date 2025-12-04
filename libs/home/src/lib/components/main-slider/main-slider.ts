import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

/**
 *  Main Slider Component
 */
@Component({
  selector: 'lib-main-slider',
  imports: [CarouselModule],
  templateUrl: './main-slider.html',
  styleUrl: './main-slider.css',
})
export class MainSlider {
  mainImages = [
    'images/img1.avif',
    'images/img2.avif',
    'images/img3.avif',
    'images/img4.avif',
    'images/img5.avif',
    'images/img6.avif',
  ];
  sideImages = ['images/img4.avif', 'images/img2.avif'];
  mainOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 2500,
    autoplayHoverPause: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };
}
