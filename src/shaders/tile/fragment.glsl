uniform vec3 uColor;

varying vec3 vPositon;

void main() {
    float strength = vPositon.z * 0.5 + 0.1;
    gl_FragColor = vec4(uColor, strength);
}
