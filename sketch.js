let imgs;
// image names have to start at 0
// so for eg. set_0.png, set_1.png, set_2.png, set_3.png, etc
//
// whatever is the last img, rn it's set_23.png
// then the num below will be 22
let image_count = 22;

// this is the file name if you wanna change the type structure
let type_struct_img = "t4.jpeg";

let offsets = [];

let width = 1100 * 2;
let height = 1700 * 2;

let template, off_1_x, off_1_y, off_2_x, off_2_y, off_3_x, off_3_y, n;

let o = 255;

if (localStorage.getItem("n")) {
  n = parseInt(localStorage.getItem("n"));
  console.log(n);
} else {
  n = 1;
  localStorage.setItem("n", n);
}

function preload() {
  template = loadImage("./" + type_struct_img);
  imgs = Array(image_count)
    .fill(0)
    .map((_, i) => loadImage(`./pngs/set_${i + 1}.png`));
}

let index_next;
let index_prev;
let mode = "view";
let type_struct = true;

const mode_view = () => (mode = "view");
const mode_edit = () => (mode = "edit");
let cur_index = 0;

const next_index = () =>
  (cur_index = offsets.length - 1 === cur_index ? 0 : cur_index + 1);
const prev_index = () =>
  (cur_index = cur_index === 0 ? offsets.length - 1 : cur_index - 1);

function set_n_next() {
  n++;
  localStorage.setItem("n", n);
}

function set_n_prev() {
  n--;
  localStorage.setItem("n", n);
}

function shuffl() {
  console.log("shuffl");
  let len = imgs.length;
  for (let f = 0; f < offsets.length; f++) {
    let i = Math.floor(Math.random() * len);
    let x = Math.random() * width;
    let y = Math.random() * height;
    offsets[f] = { x, y, i };
  }
}

function create_offsets(num) {
  for (let i = 0; i < num; i++) {
    let x = {
      x: Math.random(),
      y: Math.random() * 500,
      i: Math.floor(Math.random() * imgs.length),
    };
    offsets.push(x);
  }
}

function setup() {
  createCanvas(width, height).parent("p5");
  create_offsets(11);
  pixelDensity(1);
}

function draw_images() {
  for (let i = 0; i < offsets.length; i++) {
    let cur = offsets[i];
    let img = imgs[cur.i];
    let w = img.width;
    let h = img.height;
    image(img, 0 + cur.x, 0 + cur.y, w, h);
  }

  if (mode === "edit") {
    noFill();
    stroke(255, 0, 0);
    strokeWeight(5);
    let cur_img = imgs[offsets[cur_index].i];

    rect(
      0 + offsets[cur_index].x,
      0 + offsets[cur_index].y,
      cur_img.width,
      cur_img.height,
    );
  }
}

function draw() {
  blendMode(NORMAL);
  background(255);

  tint(255, o);

  draw_images();

  tint(255, 255);

  blendMode(MULTIPLY);

  if (type_struct) {
    image(template, 0, 0, width, height);
  }

  // blendMode(NORMAL);

  textSize(30);
  fill(0, 200);
  text("_" + n, width - 150, height - 150);
}

function keyPressed() {
  // s
  if (keyCode === 83) {
    saveImage();
  }

  // e
  if (keyCode === 69) {
    mode_edit();
  }

  // v
  if (keyCode === 86) {
    mode_view();
  }

  let inc = 100;

  //H
  if (keyCode === 72) {
    offsets[cur_index].x -= inc;
  }

  //J
  if (keyCode === 74) {
    offsets[cur_index].y += inc;
  }

  //K
  if (keyCode === 75) {
    offsets[cur_index].y -= inc;
  }

  //L
  if (keyCode === 76) {
    offsets[cur_index].x += inc;
  }

  // Z
  if (keyCode === 90) {
    offsets[cur_index].i = Math.floor(Math.random() * imgs.length);
  }

  // p
  if (keyCode === 80) {
    shuffl();
  }

  // r
  if (keyCode === 82) {
    offsets[cur_index].x = Math.random() * width;
    offsets[cur_index].y = Math.random() * height;
  }
  // w
  if (keyCode === 87) {
    next_index();
  }

  // b
  if (keyCode === 66) {
    prev_index();
  }

  // t
  if (keyCode === 84) {
    type_struct = !type_struct;
  }
}

function saveImage() {
  saveCanvas("template" + t + "_n" + n, "jpg");
  n++;
  localStorage.setItem("n", n);
}
