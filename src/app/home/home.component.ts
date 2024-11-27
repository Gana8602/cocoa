import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
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
  MonitoringStationlist:boolean = false;
  BuoyList:boolean = false;
  weatherMonitorList:boolean = false;
  oilpollutionList:boolean = false;
  shipList:boolean=false;
  MarineSurvey:boolean=false;

  closeTri:boolean = false;
  openProblems:boolean =false;
  roadTapped:boolean = false;


  animState = 'initial';  // State for animation control
  triTap(){
    this.closeTri = true;
    setTimeout(() => {
      this.openProblems =true;
    }, 2000);
  }
  problem1Tap() {
    this.animState = 'shrunken';
    setTimeout(() => this.showProblem = false, 1000);  // Hide after the animation
  }
  tapProblems(num:number){
    setTimeout(() => {
      this.selectedImageIndex = num;
      this.previousImageIndex = this.selectedImageIndex
      this.selectImage(num);
    }, 2000);
   
  }

  roadTap(){
    this.roadTapped = true;
  }

  problem2Tap() {
    this.animState = 'shrunken';
    setTimeout(() => this.showProblem = false, 1000);  // Hide after the animation
  }
  images = [
    { src: '../../assets/5.png', alt: 'MonitoringStation' },
    { src: '../../assets/aerial_platforms.png', alt: 'Buoy' },
    { src: '../../assets/monitoring_networks.png', alt: 'WeatherMonitor' },
    { src: '../../assets/survey_platforms.png', alt: 'OilPollution' },
    { src: '../../assets/monitoring_station.png', alt: 'Ship' },
    { src: '../../assets/marine_survey_platforms.png', alt: 'MarineSurvey' },
    // { src: '../../assets/problems/water resource.png', alt: 'Water Resource' }
  ];

  selectedImageIndex: number = 5;
  previousImageIndex: number | null = null;
  droppedImageName: string | null = null;  // To store the name of the dropped image

  selectImage(index: number): void {
    this.previousImageIndex = this.selectedImageIndex;
    this.selectedImageIndex = index;
    const imageName = this.images[index].alt;
  console.log('Selected image:', imageName);
  this.droppedImageName = imageName;
  if(this.droppedImageName == 'MonitoringStation'){
    this.MonitoringStationlist = true;
    this.BuoyList = false;
    this.weatherMonitorList = false;
    this.oilpollutionList = false;
    this.shipList = false;
    this.MarineSurvey = false;
   
  }else if(this.droppedImageName == 'Buoy'){
    this.BuoyList = true;
    this.MonitoringStationlist = false;
  
    this.weatherMonitorList = false;
    this.oilpollutionList = false;
    this.shipList = false;
    this.MarineSurvey = false;
  }else if(this.droppedImageName == 'WeatherMonitor'){
    this.weatherMonitorList = true;
    this.MonitoringStationlist = false;
    this.BuoyList = false;
    console.log(this.weatherMonitorList);
    this.oilpollutionList = false;
    this.shipList = false;
    this.MarineSurvey = false;
  }else if(this.droppedImageName == 'OilPollution'){
this.oilpollutionList = true;
this.MonitoringStationlist = false;
this.BuoyList = false;
this.weatherMonitorList = false;

this.shipList = false;
this.MarineSurvey = false;
  }else if(this.droppedImageName == 'Ship'){
this.shipList = true;
this.MonitoringStationlist = false;
this.BuoyList = false;
this.weatherMonitorList = false;
this.oilpollutionList = false;

this.MarineSurvey = false;
  }else if(this.droppedImageName == 'MarineSurvey'){
this.MarineSurvey =true;
this.MonitoringStationlist = false;
this.BuoyList = false;
this.weatherMonitorList = false;
this.oilpollutionList = false;
this.shipList = false;
// this.unselectAerial();
// this.u_s_monitiring_networks();
//   this.unselectmonitstation();
//   this.unselectsattlite();
//   this.unselectsurvey();

  }
  this.unselectAerial();
  this.unselectbathy();
  this.u_s_monitiring_networks();
  this.unselectmonitstation();
  this.unselectsattlite();
  this.unselectsurvey();

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
        top: '40%',
        left: '40%',
        transform: `rotate(${anglePrev}deg) translate(${distance}px) rotate(-${anglePrev}deg)`,
        zIndex: 1,
        transition: 'all 0.5s ease'
      };
    }
    return {
      position: 'absolute',
      top: '40%',
      left: '40%',
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
    const index = event.dataTransfer?.getData('imageIndex');
    
      // Get the index of the dragged image
    if (index) {
      const num = parseInt(index);
      this.selectedImageIndex = num;
      this.previousImageIndex = num;
      const imageName = this.images[parseInt(index)].alt;
      console.log('Dropped image:', imageName);
      this.droppedImageName = imageName;  // Store the dropped image name
      if(this.droppedImageName == 'MonitoringStation'){
        this.MonitoringStationlist = true;
        this.BuoyList = false;
        this.weatherMonitorList = false;
        this.oilpollutionList = false;
        this.shipList = false;
        this.MarineSurvey = false;
      }else if(this.droppedImageName = 'Buoy'){
        this.BuoyList = true;
        this.MonitoringStationlist = false;
      
        this.weatherMonitorList = false;
        this.oilpollutionList = false;
        this.shipList = false;
        this.MarineSurvey = false;
      }else if(this.droppedImageName = 'WeatherMonitor'){
        this.weatherMonitorList = true;
        this.MonitoringStationlist = false;
        this.BuoyList = false;
    
        this.oilpollutionList = false;
        this.shipList = false;
        this.MarineSurvey = false;
      }else if(this.droppedImageName = 'OilPollution'){
    this.oilpollutionList = true;
    this.MonitoringStationlist = false;
    this.BuoyList = false;
    this.weatherMonitorList = false;
    
    this.shipList = false;
    this.MarineSurvey = false;
      }else if(this.droppedImageName = 'Ship'){
    this.shipList = true;
    this.MonitoringStationlist = false;
    this.BuoyList = false;
    this.weatherMonitorList = false;
    this.oilpollutionList = false;
    
    this.MarineSurvey = false;
      }else if(this.droppedImageName = 'MonitoringNetwork'){
    this.MarineSurvey =true;
    this.MonitoringStationlist = false;
    this.BuoyList = false;
    this.weatherMonitorList = false;
    this.oilpollutionList = false;
    this.shipList = false;
    
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






// full screen func

toggleFullScreen(): void {
  const elem = document.documentElement; // Select the whole webpage

  if (!document.fullscreenElement) {
    // Enter fullscreen mode
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if ((elem as any).mozRequestFullScreen) { // Firefox
      (elem as any).mozRequestFullScreen();
    } else if ((elem as any).webkitRequestFullscreen) { // Chrome, Safari, Opera
      (elem as any).webkitRequestFullscreen();
    } else if ((elem as any).msRequestFullscreen) { // IE/Edge
      (elem as any).msRequestFullscreen();
    }
  } else {
    // Exit fullscreen mode
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).mozCancelFullScreen) { // Firefox
      (document as any).mozCancelFullScreen();
    } else if ((document as any).webkitExitFullscreen) { // Chrome, Safari, Opera
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) { // IE/Edge
      (document as any).msExitFullscreen();
    }
  }
}



positions = {
  left: { x: 30, y: 20 }, // Initial position for left container
  right: { x: 65, y: 10 }, // Initial position for right container
};

// Restrict draggingElement to valid keys of positions
draggingElement: keyof typeof this.positions | null = null;
offset = { x: 0, y: 0 };

// Handle mouse down (start drag)
onDragStartt(event: MouseEvent, containerType: keyof typeof this.positions): void {
  this.draggingElement = containerType; // Set the current dragging container
  this.offset.x = event.clientX - this.positions[containerType].x; // Calculate X offset
  this.offset.y = event.clientY - this.positions[containerType].y; // Calculate Y offset
}

// Handle mouse move (dragging)
@HostListener('document:mousemove', ['$event'])
onDragMove(event: MouseEvent): void {
  if (this.draggingElement) {
    const container = this.draggingElement;
    this.positions[container].x = event.clientX - this.offset.x;
    this.positions[container].y = event.clientY - this.offset.y;
  }
}

// Handle mouse up (end drag)
@HostListener('document:mouseup')
onDragEnd(): void {
  this.draggingElement = null; // Stop dragging
}




// solutions

selectedlidar:boolean = false;
selecteddroneHabbit:boolean = false;
selecteddroneWeather:boolean = false;




tapLidar(){
  this.selectedlidar = true;
  this.selecteddroneHabbit = false;
  this.selecteddroneWeather = false;
}
tapDroneHabbit(){
  this.selectedlidar = false;
  this.selecteddroneHabbit = true;
  this.selecteddroneWeather = false;
}
tapDroneWeather(){
  this.selectedlidar = false;
  this.selecteddroneHabbit = false;
  this.selecteddroneWeather = true;
}
unselectAerial(){
  this.selectedlidar = false;
  this.selecteddroneHabbit = false;
  this.selecteddroneWeather = false;
}

// bathymetri 
selectedBathymetric:boolean=false;
selectedMarineEcology:boolean=false;

tapBathy(){
  this.selectedBathymetric = true;
  this.selectedMarineEcology = false;
}
tapMarineEcology(){
  this.selectedBathymetric = false;
  this.selectedMarineEcology = true;
}
unselectbathy(){
  this.selectedBathymetric = false;
  this.selectedMarineEcology = false;
}


// Monitoring Networks

selectedAirQuality:boolean= false;
selctedgwaterMonitoring:boolean = false;
selectednoiseMonitoring:boolean=false;
selectedweatherMonit:boolean=false;


tapAirQ(){
  this.selectedAirQuality= true;
  this.selctedgwaterMonitoring = false;
  this.selectednoiseMonitoring=false;
  this.selectedweatherMonit=false;
}
tapGwater(){
  this.selectedAirQuality= false;
  this.selctedgwaterMonitoring = true;
  this.selectednoiseMonitoring=false;
  this.selectedweatherMonit=false;
}
tapNoiseMonit(){
  this.selectedAirQuality= false;
  this.selctedgwaterMonitoring = false;
  this.selectednoiseMonitoring=true;
  this.selectedweatherMonit=false;
}
tapWeather(){
  this.selectedAirQuality= false;
  this.selctedgwaterMonitoring = false;
  this.selectednoiseMonitoring=false;
  this.selectedweatherMonit=true;
}
u_s_monitiring_networks(){
  this.selectedAirQuality= false;
  this.selctedgwaterMonitoring = false;
  this.selectednoiseMonitoring=false;
  this.selectedweatherMonit=false;
}
// Survey Platform 

selectedhabit:boolean = false;

taphabbit(){
this.selectedhabit = true;
}

unselectsurvey(){
  this.selectedhabit = false;
}

// sattlite plateform
selectedhabbit:boolean=false;
selectedlandfill:boolean=false;
selectedspill:boolean=false;
selectedsattlkitedrived:boolean=false;


taphabbitmap(){
  this.selectedhabbit=true;
  this.selectedlandfill=false;
  this.selectedspill=false;
  this.selectedsattlkitedrived=false;
}
taplandfill(){
  this.selectedhabbit=false;
  this.selectedlandfill=true;
  this.selectedspill=false;
  this.selectedsattlkitedrived=false;
  }
  tapspill(){
    this.selectedhabbit=false;
    this.selectedlandfill=false;
    this.selectedspill=true;
    this.selectedsattlkitedrived=false;
    }
    tapsattlkitedrived(){
      this.selectedhabbit=false;
      this.selectedlandfill=false;
      this.selectedspill=false;
      this.selectedsattlkitedrived=true;
      }

unselectsattlite(){
  this.selectedhabbit=false;
  this.selectedlandfill=false;
  this.selectedspill=false;
  this.selectedsattlkitedrived=false;
}

      // monitoring Stations

      selectedCoastalBuoy:boolean=false;
      selectedCoastalStation:boolean=false;
      selectedoffshore:boolean=false;

      t_coastal(){
        this.selectedCoastalBuoy=true;
        this.selectedCoastalStation=false;
        this.selectedoffshore=false;
        this.unselectsubs();
      }
      t_coastalstation(){
        this.selectedCoastalBuoy=false;
        this.selectedCoastalStation=true;
        this.selectedoffshore=false;
        this.unselectsubs();
        }
        t_offshorem(){
          this.selectedCoastalBuoy=false;
          this.selectedCoastalStation=false;
          this.selectedoffshore=true;
          this.unselectsubs();
          }

      s_float:boolean = false;
      s_lidar:boolean=false;
      s_offshore:boolean=false;
      s_profilers:boolean=false;
      s_surveyVessal:boolean = false;
      s_usv:boolean=false;
          t_float(){
            this.s_float=true;
            this.s_lidar=false;
            this.s_offshore=false;
            this.s_profilers=false;
            this.s_surveyVessal=false;
            this.s_usv=false;
            }
            t_lidar(){
              this.s_float=false;
              this.s_lidar=true;
              this.s_offshore=false;
              this.s_profilers=false;
              this.s_surveyVessal=false;
              this.s_usv=false;
              }
              t_offshores(){
                this.s_float=false;
                this.s_lidar=false;
                this.s_offshore=true;
                this.s_profilers=false;
                this.s_surveyVessal=false;
                this.s_usv=false;
                }
                t_profilers(){
                  this.s_float=false;
                  this.s_lidar=false;
                  this.s_offshore=false;
                  this.s_profilers=true;
                  this.s_surveyVessal=false;
                  this.s_usv=false;
                  }
                  t_surveyVessal(){
                    this.s_float=false;
                    this.s_lidar=false;
                    this.s_offshore=false;
                    this.s_profilers=false;
                    this.s_surveyVessal=true;
                    this.s_usv=false;
                    }
                    t_usv(){
                      this.s_float=false;
                      this.s_lidar=false;
                      this.s_offshore=false;
                      this.s_profilers=false;
                      this.s_surveyVessal=false;
                      this.s_usv=true;
                      }
                    unselectmonitstation(){
                      this.selectedCoastalBuoy=false;
                      this.selectedCoastalStation=false;
                      this.selectedoffshore=false;
                      this.unselectsubs();

                    }
                    unselectsubs(){
                      this.s_float=false;
                      this.s_lidar=false;
                      this.s_offshore=false;
                      this.s_profilers=false;
                      this.s_surveyVessal=false;
                      this.s_usv=false;
                      
                    }
          

                    isImagePopupVisible = false; // Tracks modal visibility
                    popupImageSrc = ''; // Holds the source of the clicked image
                    isZoomed = false; // Tracks zoom state
                
                    // Open the image popup
                    openImagePopup(imageSrc: string): void {
                        this.popupImageSrc = imageSrc;
                        this.isImagePopupVisible = true;
                        this.isZoomed = false; // Reset zoom state
                    }
                
                    // Close the image popup
                    closeImagePopup(): void {
                        this.isImagePopupVisible = false;
                        this.popupImageSrc = '';
                        this.isZoomed = false; // Reset zoom state
                    }
                
                    // Toggle zoom in/out
                    toggleZoom(event: MouseEvent): void {
                        event.stopPropagation(); // Prevent modal from closing
                        this.isZoomed = !this.isZoomed; // Toggle zoom state
                    }
}
