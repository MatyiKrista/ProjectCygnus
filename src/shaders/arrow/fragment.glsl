varying vec2 vUv;

void main() {
    float strength = vUv.x;
    gl_FragColor = vec4(0.0, 1.0, 1.0, strength);
}
