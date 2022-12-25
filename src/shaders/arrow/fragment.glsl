uniform vec3 uColor;

varying vec2 vUv;

void main() {
    float strength = vUv.x;
    gl_FragColor = vec4(uColor, strength);
}
