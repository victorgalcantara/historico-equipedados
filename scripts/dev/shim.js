// Shim de pptxgenjs: registra as chamadas de layout para gerar a versão web (HTML) do deck.
const fs = require("fs");
class Slide {
  constructor(master, section) { this.master = master; this.section = section; this.items = []; this.notes = ""; }
  addText(text, o = {}) { this.items.push({ kind: "text", text, o: { ...o } }); return this; }
  addShape(shape, o = {}) { this.items.push({ kind: "shape", shape, o: JSON.parse(JSON.stringify(o)) }); return this; }
  addImage(o = {}) { this.items.push({ kind: "image", o: { ...o } }); return this; }
  addChart(type, data, o = {}) { this.items.push({ kind: "chart", type, data, o: { ...o } }); return this; }
  addNotes(t) { this.notes = t; }
}
class Pres {
  constructor() {
    this.slides = []; this.masters = {}; this._section = null;
    this.SchemeColor = { text1: "tx1", text2: "tx2", background1: "bg1", background2: "bg2", accent1: "accent1", accent2: "accent2", accent3: "accent3", accent4: "accent4", accent5: "accent5", accent6: "accent6" };
    this.shapes = { RECTANGLE: "rect", ROUNDED_RECTANGLE: "roundRect", OVAL: "ellipse", LINE: "line", CUBE: "cube", DIAMOND: "diamond", RIGHT_ARROW: "rightArrow" };
    this.charts = { BAR: "bar" };
  }
  defineSlideMaster(m) { this.masters[m.title] = JSON.parse(JSON.stringify(m)); }
  addSection(s) { this._section = s.title; }
  addSlide(o = {}) { const s = new Slide(o.masterName, o.sectionTitle || this._section); this.slides.push(s); return s; }
  async writeFile({ fileName }) {
    fs.writeFileSync(fileName + ".json", JSON.stringify({ masters: this.masters, slides: this.slides, theme: this.theme, meta: { title: this.title, author: this.author } }));
    return fileName;
  }
}
module.exports = Pres;
