<template>
  <div class="main-container">
    <main id="content-container" class="content-container" v-if="true">
      <div class="navbar">
        <div class="options navbar-list">
          <div class="save-image navbar-button">Save</div>
          <div class="open-image navbar-button">Open</div>
        </div>
        <div class="brush-sizes navbar-list">
          <input type="number" name="brush-size-number-input" class="brush-size-number-input" id="brush-size-number-input" v-model="brushSize" step="1" min="2" max="100">
          <input type="range" name="brush-size-range-input" class="brush-size-range-input" id="brush-size-range-input" v-model="brushSize" step="1" min="2" max="100">
        </div>
        <ul class="brush-types navbar-list">
          <li class="type-brush navbar-button" @click="penMode()">&#9998;</li>
          <li class="type-brush navbar-button" @click="eraserMode()">&#10001;</li>
        </ul>
        <ul class="brush-shapes navbar-list">
          <li class="shape-brush navbar-button">&#9679;</li>
          <li class="shape-brush navbar-button">&#9650;</li>
          <li class="shape-brush navbar-button">&#9724;</li>
        </ul>
      </div>
  
      <canvas id="paintin-canvas" class="paintin-canvas" @mousedown="setClickDown($event)" @mouseup="setClickUp($event)" @mousemove="hoverMouse($event)">
      </canvas>
    </main>

    <DraggableDiv class="color-picker-widget">
      <template v-slot:header>
        <div class="open-close-container">
          Color Picker
          <button class="open-close-button" @click="openCloseColor()">{{ pickerState }}</button>
        </div>
      </template>
      <template v-slot:main >
        <div id="picker-container">
          <color-picker class="color-picker" id="color-picker" isWidget pickerType="chrome" lang="En"  @update:pureColor="setColor($event)"></color-picker>
        </div>
      </template>
    </DraggableDiv>

    <div id="pen-cursor" class="pen-cursor"></div>
  </div>
</template>

<script>
import Vue3ColorPicker from "vue3-colorpicker";
import DraggableDiv from './components/draggableDiv.vue'
export default {
  data() {
    return {
      vaina: true,
      canvas: null,
      ctx: null,
      canvasSizeX: 800,
      canvasSizeY: 800,
      isDrawing: false,
      brushSize: 5,
      mousePos: [0,0],
      color: '#ff0000',
      pickerState: '-',
      penCursor: null,
    }
  },
  components:{
    Vue3ColorPicker,
    DraggableDiv,
  },
  computed: {
    
  },
  created() {
    
  },
  mounted() {
    this.canvas = document.getElementById('paintin-canvas')
    this.ctx = this.canvas.getContext('2d')
    this.canvas.height = window.innerHeight - 5
    this.canvas.width = window.innerWidth - 5
    this.penMode()

    let mainContainer = document.getElementById('content-container')
    let penCursor = document.getElementById('pen-cursor')

    this.penCursor = penCursor
    mainContainer.addEventListener('mousemove', (e) => {
      penCursor.setAttribute('style', `top: ${e.clientY-(this.brushSize/2)}px; left:${e.clientX-(this.brushSize/2)}px; width: ${this.brushSize}px; height:${this.brushSize}px;`)
    })
  },
  watch:{
  },
  methods: {
    test(event){
      console.log(event);
    },
    setColor(color){
      this.color = color
    },
    openCloseColor(){
      let picker = document.getElementById('picker-container')
      console.log(picker);
      if(picker.classList.contains('hidden')){
        picker.classList.remove('hidden')
        this.pickerState = '-'
      }else{
        picker.classList.add('hidden')
        this.pickerState = '+'
      }
    },
    setClickDown(event){
      this.isDrawing = true
      this.draw(this.mousePos)
    },
    setClickUp(event){
      this.isDrawing = false
      this.ctx.beginPath()
    },
    hoverMouse(event){
      if (!this.isDrawing) return
      this.draw(event)
      //console.log(event);
    },
    draw(event){
      this.ctx.lineWidth = this.brushSize
      this.ctx.strokeStyle = this.color
      this.ctx.fillStyle = this.color
      this.ctx.lineCap = 'round'
      this.ctx.lineJoin = 'round'
      this.ctx.lineTo(event.clientX - this.canvas.offsetLeft, event.clientY - this.canvas.offsetTop)
      this.ctx.stroke()
      this.ctx.beginPath()
      this.ctx.moveTo(event.clientX - this.canvas.offsetLeft, event.clientY - this.canvas.offsetTop)
    },
    eraserMode(){
      this.ctx.globalCompositeOperation = 'destination-out'
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0)'
    },
    penMode(){
      this.ctx.globalCompositeOperation = 'source-over';
      this.ctx.strokeStyle = this.color;
    },
  },
}
</script>

<style scoped>
@import './styles.scss';
</style>
