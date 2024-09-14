<template>
  <div class="main-container">
    <main class="content-container">
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

    <aside class="sidebar">
      <div class="color-picker sidebar-option">
        <input type="color" name="color-picker-sidebar" id="color-picker-sidebar" v-model="color" @mouseover="test($event)">
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvas: null,
      ctx: null,
      canvasSizeX: 1580,
      canvasSizeY: 880,
      isDrawing: false,
      brushSize: 5,
      mousePos: [0,0],
      color: '#ff0000'
    }
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
      console.log(event.target.value);
    },
    setClickDown(event){
      console.log('click');
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
      this.ctx.strokeStyle = 'red'
      this.ctx.fillStyle = 'red'
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
      this.ctx.strokeStyle = 'red';
    }
  },
}
</script>

<style scoped>
@import './styles.scss';
</style>
