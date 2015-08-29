#ifdef GL_ES
precision highp float;
#endif

#pragma glslify: texture2DLatLong  = require(../local_modules/glsl-texture2d-latlong)
#pragma glslify: rgbe2rgb  = require(../local_modules/glsl-rgbe2rgb)
#pragma glslify: toGamma  = require(glsl-gamma/out)
#pragma glslify: tonemapReinhard  = require(../local_modules/glsl-tonemap-reinhard)

varying vec3 vNormal;

uniform sampler2D uReflectionMap;
uniform float uExposure;

void main() {
    vec3 N = normalize(vNormal);
    gl_FragColor.rgb = rgbe2rgb(texture2DLatLong(uReflectionMap, N));
    gl_FragColor.rgb *= uExposure;
    gl_FragColor.rgb = tonemapReinhard(gl_FragColor.rgb);
    gl_FragColor.rgb = toGamma(gl_FragColor.rgb);
    gl_FragColor.a = 1.0;
}
