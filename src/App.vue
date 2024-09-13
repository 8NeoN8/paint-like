<template>
  <div class="main-container">
    <div class="navBar">
      <div class="save-image"></div>
      <div class="open-image"></div>
      <div class="brush-size"></div>
      <div class="brush-type"></div>
      <div class="brush-shapes"></div>
    </div>
    <canvas id="paintin-canvas" class="paintin-canvas" @mousedown="setClickDown($event)" @mouseup="setClickUp($event)" @mousemove="hoverMouse($event)">
    </canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvas: null,
      ctx: null,
      canvasSize: 800,
      isDrawing: false,
      brushSize: 5,
      mousePos: [0,0],
      fillStyle: 'red'
    }
  },
  computed: {
    
  },
  created() {
    
  },
  mounted() {
    this.canvas = document.getElementById('paintin-canvas')
    this.ctx = this.canvas.getContext('2d')
    this.canvas.height = this.canvasSize
    this.canvas.width = this.canvasSize
    this.penMode()
  },
  methods: {
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
      this.ctx.strokeStyle = this.fillStyle
      this.ctx.fillStyle = this.fillStyle
      this.ctx.lineCap = 'round'
      this.ctx.lineJoin = 'round'
      this.ctx.lineTo(event.offsetX, event.offsetY)
      this.ctx.stroke()
      this.ctx.beginPath()
      this.ctx.moveTo(event.offsetX, event.offsetY)
    },
    eraserMode(){
      this.ctx.globalCompositeOperation = 'destination-out'
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0)'
    },
    penMode(){
      this.ctx.globalCompositeOperation = 'source-over';
      this.ctx.strokeStyle = this.fillStyle;
    }
  },
}
</script>

<style scoped>
@import './styles.scss';
</style>
