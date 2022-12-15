#version 450
#extension GL_ARB_separate_shader_objects : enable


layout(location = 0) in vec2 fragColor;
layout(location = 1) in vec2 texCoord;


layout(binding = 0) uniform UniformBufferObject {
    dvec2 center;
    double scale;
    int iter;
} ubo;
layout(binding = 1) uniform sampler2D tex;

layout(location = 0) out vec4 outColor;

void main() {
    dvec2 z, c;
    c.x = 1.77777 * (texCoord.x - 0.5) * ubo.scale - ubo.center.x;
    c.y = (texCoord.y - 0.5) * ubo.scale - ubo.center.y;

    int i;
    z = c;
    double j, x, y;
    int pow = 1;
    for (i = 0; i < ubo.iter; i++) {
        x = (z.x * z.x - z.y * z.y) + c.x;
        y = (z.y * z.x + z.x * z.y) + c.y;
        double r2 = x * x + y * y;

        if (r2 > 4) {
            break;
        }
        z.x = x;
        z.y = y;
        pow = pow * 2;
    }
    if (i < ubo.iter) {
        j = i;
        float log_zn = log(float(x*x + y*y)) / 2;
        double nu = log(log_zn / log(2)) / log(2);
        j = i + 1 - nu;
    }
    float waste;
    vec4 color1 = texture(tex, vec2((float(floor(j)) / 100.0f), 1.0f));
    vec4 color2 = texture(tex, vec2((float((floor(j) + 1.0f)) / 100.0f), 1.0f));

    outColor = mix(color1, color2, modf(float(j), waste));
    //FragColor = texture(tex, texCoord.x);
}
