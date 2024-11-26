import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations:[
    trigger('shrinkMove', [
      state('initial', style({
        transform: 'translate(-50%, -50%)',
        width: '150px',
        height: '150px'
      })),
      state('shrunken', style({
        transform: 'translate(-10%, 90%)',
        width: '50px',
        height: '50px'
      })),
      transition('initial => shrunken', [
        animate('1s')
      ]),
      transition('shrunken => initial', [
        animate('0.5s')
      ])
    ])
  ]
})
export class HomeComponent {
  mountTapped:boolean = false;
  landTapped:boolean = false;
  seaTapped:boolean = false;
  moveCenter:boolean = false;
  showProblem:boolean = false;
  problem1Show:boolean= false;
  problem2Show:boolean = false;
  list:boolean = false;
  closeTri:boolean = false;
  openProblems:boolean =false;
  roadTapped:boolean = false;


  animState = 'initial';  // State for animation control
  triTap(){
    this.closeTri = true;
    setTimeout(() => {
      this.openProblems =true;
    }, 1000);
  }
  problem1Tap() {
    this.animState = 'shrunken';
    setTimeout(() => this.showProblem = false, 1000);  // Hide after the animation
  }

  roadTap(){
    this.roadTapped = true;
  }

  problem2Tap() {
    this.animState = 'shrunken';
    setTimeout(() => this.showProblem = false, 1000);  // Hide after the animation
  }
  images = [
    { src: '../../assets/problems/air-pollution.png', alt: 'Air Pollution' },
    { src: '../../assets/problems/Climate Change.png', alt: 'Climate Change' },
    { src: '../../assets/problems/Ecosystem Management.png', alt: 'Ecosystem Management' },
    { src: '../../assets/problems/Ground water management.png', alt: 'Ground Water Management' },
    { src: '../../assets/problems/marine pollution.png', alt: 'Marine Pollution' },
    { src: '../../assets/problems/Shoreline errosion.png', alt: 'Shoreline Erosion' },
    { src: '../../assets/problems/water resource.png', alt: 'Water Resource' }
  ];

  selectedImageIndex: number = 5;
  previousImageIndex: number | null = null;
  droppedImageName: string | null = null;  // To store the name of the dropped image

  selectImage(index: number): void {
    this.previousImageIndex = this.selectedImageIndex;
    this.selectedImageIndex = index;
  }

  getStyle(index: number): any {
    const angle = (360 / this.images.length) * index;
    const distance = 120;
    if (index === this.selectedImageIndex) {
      return {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(1.5)`,
        zIndex: 10,
        transition: 'all 0.5s ease'
      };
    }
    if (index === this.previousImageIndex) {
      const anglePrev = (360 / this.images.length) * this.previousImageIndex;
      return {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `rotate(${anglePrev}deg) translate(${distance}px) rotate(-${anglePrev}deg)`,
        zIndex: 1,
        transition: 'all 0.5s ease'
      };
    }
    return {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: `rotate(${angle}deg) translate(${distance}px) rotate(-${angle}deg)`,
      zIndex: 1,
      transition: 'all 0.5s ease'
    };
  }

  // Handle dragstart event
  onDragStart(event: DragEvent, index: number): void {
    console.log('Dragging image:', this.images[index].alt);  // Optional logging to debug
    event.dataTransfer?.setData('imageIndex', index.toString()); // Store the index of the dragged image
  }

  // Allow the drop by preventing the default behavior (otherwise, it will not drop)
  onDragOver(event: DragEvent): void {
    event.preventDefault();  // Required to allow drop
  }

  // Handle the drop event
  onDrop(event: DragEvent): void {
    event.preventDefault();
    const index = event.dataTransfer?.getData('imageIndex');  // Get the index of the dragged image
    if (index) {
      const imageName = this.images[parseInt(index)].alt;
      console.log('Dropped image:', imageName);
      this.droppedImageName = imageName;  // Store the dropped image name
      if(this.droppedImageName == 'Water Resource'){
        this.list = true;
      }
    }
  }
  

  mountTapp(){
    this.mountTapped = true;
  }
  landTapp(){
    this.landTapped = true;
  }
  seaTap(){
    this.seaTapped = true;
  }
iconTap(name:string){
  console.log(name);
  this.moveCenter = true;
  this.showProblem = true;

}

}
