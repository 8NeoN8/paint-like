<template>
  <div class="main-container">
    <main class="content-container" v-if="true">
      <div class="navbar">
        <div class="save-image navbar-button">Save</div>
        <div class="open-image navbar-button">Open</div>
        <div class="brush-sizes navbar-list">
          <input type="number" name="brush-size-number-input" id="brush-size-number-input" v-model="brushSize" step="1" min="2" max="100">
          <input type="range" name="brush-size-range-input" id="brush-size-range-input" v-model="brushSize" step="1" min="2" max="100">
        </div>
        <ul class="brush-types navbar-list">
          <li class="type-brush navbar-button">Pen</li>
          <li class="type-brush navbar-button">Eraser</li>
        </ul>
        <ul class="brush-shapes navbar-list">
          <li class="shape-brush">Circle</li>
          <li class="shape-brush">Triangle</li>
          <li class="shape-brush">Square</li>
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
      pickerState: '-'
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
    this.canvas.height = this.canvasSizeY
    this.canvas.width = this.canvasSizeX
    this.penMode()
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
