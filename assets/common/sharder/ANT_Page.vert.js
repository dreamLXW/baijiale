module.exports  = "precision mediump float;\n"
+"varying vec2 texCoord;\n"
+"uniform sampler2D sourceTex;\n"
+"uniform sampler2D targetTex;\n"
+"uniform float time;\n"

+"const float MIN_AMOUNT = -0.16;\n"
+"const float MAX_AMOUNT = 1.3;\n"
+"float amount = time * (MAX_AMOUNT - MIN_AMOUNT) + MIN_AMOUNT;\n"

+"const float PI = 3.141592653589793;\n"

+"const float scale = 512.0;\n"
+"const float sharpness = 3.0;\n"

+"float cylinderCenter = amount;\n"
+"float cylinderAngle = 2.0 * PI * amount;\n"

+"const float cylinderRadius = 1.0 / PI / 2.0;\n"

+"vec3 hitPoint(float hitAngle, float yc, vec3 point, mat3 rrotation) {\n"
+"float hitPoint = hitAngle / (2.0 * PI);\n"
    +"point.y = hitPoint;\n"
    +"return rrotation * point;\n"
    +"}\n"


+"vec4 antiAlias(vec4 color1, vec4 color2, float distance) {\n"
+"distance *= scale;\n"
    +"if (distance < 0.0) return color2;\n"
        +"if (distance > 2.0) return color1;\n"
        +"float dd = pow(1.0 - distance / 2.0, sharpness);\n"
    +"return ((color2 - color1) * dd) + color1;\n"
    +"}\n"

+"float distanceToEdge(vec3 point) {\n"
+"float dx = abs(point.x > 0.5 ? 1.0 - point.x : point.x);\n"
    +"float dy = abs(point.y > 0.5 ? 1.0 - point.y : point.y);\n"
    +"if (point.x < 0.0) dx = -point.x;\n"
        +"if (point.x > 1.0) dx = point.x - 1.0;\n"
        +"if (point.y < 0.0) dy = -point.y;\n"
        +"if (point.y > 1.0) dy = point.y - 1.0;\n"
        +"if ((point.x < 0.0 || point.x > 1.0) && (point.y < 0.0 || point.y > 1.0)) return sqrt(dx * dx + dy * dy);\n"
        +"return min(dx, dy);\n"
    +"}\n"

+"vec4 seeThrough(float yc, vec2 p, mat3 rotation, mat3 rrotation) {\n"
+"float hitAngle = PI - (acos(yc / cylinderRadius) - cylinderAngle);\n"
    +"vec3 point = hitPoint(hitAngle, yc, rotation * vec3(p, 1.0), rrotation);\n"

    +"if (yc <= 0.0 && (point.x < 0.0 || point.y < 0.0 || point.x > 1.0 || point.y > 1.0)) {\n"
        +"return texture2D(targetTex, texCoord);\n"
    +"}\n"

    +"if (yc > 0.0) return texture2D(sourceTex, p);\n"

        +"vec4 color = texture2D(sourceTex, point.xy);\n"
    +"vec4 tcolor = vec4(0.0);\n"

    +"return antiAlias(color, tcolor, distanceToEdge(point));\n"
    +"}\n"

+"vec4 seeThroughWithShadow(float yc, vec2 p, vec3 point, mat3 rotation, mat3 rrotation) {\n"
+"float shadow = distanceToEdge(point) * 30.0;\n"
    +"shadow = (1.0 - shadow) / 3.0;\n"
    +"if (shadow < 0.0) shadow = 0.0;\n"
        +"else shadow *= amount;\n"

        +"vec4 shadowColor = seeThrough(yc, p, rotation, rrotation);\n"
    +"shadowColor.r -= shadow;\n"
    +"shadowColor.g -= shadow;\n"
    +"shadowColor.b -= shadow;\n"
    +"return shadowColor;\n"
    +"}\n"

+"vec4 backside(float yc, vec3 point) {\n"
+"vec4 color = texture2D(sourceTex, point.xy);\n"
    +"float gray = (color.r + color.b + color.g) / 15.0;\n"
    +"gray += (8.0 / 10.0) * (pow(1.0 - abs(yc / cylinderRadius), 2.0 / 10.0) / 2.0 + (5.0 / 10.0));\n"
    +"color.rgb = vec3(gray);\n"
    +"return color;\n"
    +"}\n"

+"vec4 behindSurface(float yc, vec3 point, mat3 rrotation) {\n"
+"float shado = (1.0 - ((-cylinderRadius - yc) / amount * 7.0)) / 6.0;\n"
    +"shado *= 1.0 - abs(point.x - 0.5);\n"

    +"yc = (-cylinderRadius - cylinderRadius - yc);\n"

    +"float hitAngle = (acos(yc / cylinderRadius) + cylinderAngle) - PI;\n"
    +"point = hitPoint(hitAngle, yc, point, rrotation);\n"

    +"if (yc < 0.0 && point.x >= 0.0 && point.y >= 0.0 && point.x <= 1.0 && point.y <= 1.0 && (hitAngle < PI || amount > 0.5)){\n"
        +"shado = 1.0 - (sqrt(pow(point.x - 0.5, 2.0) + pow(point.y - 0.5, 2.0)) / (71.0 / 100.0));\n"
    +"shado *= pow(-yc / cylinderRadius, 3.0);\n"
        +"shado *= 0.5;\n"
        +"} else\n"
    +"shado = 0.0;\n"

        +"return vec4(texture2D(targetTex, texCoord).rgb - shado, 1.0);\n"
    +"}\n"

+"void main(void) {\n"
+"const float angle = 30.0 * PI / 180.0;\n"
    +"float c = cos(-angle);\n"
    +"float s = sin(-angle);\n"

    +"mat3 rotation = mat3(\n"
    +"c, s, 0,\n"
        +"-s, c, 0,\n"
        +"0.12, 0.258, 1\n"
        +");\n"

    +"c = cos(angle);\n"
    +"s = sin(angle);\n"

    +"mat3 rrotation = mat3(\n"
    +"c, s, 0,\n"
        +"-s, c, 0,\n"
        +"0.15, -0.5, 1\n"
        +");\n"

    +"vec3 point = rotation * vec3(texCoord, 1.0);\n"

    +"float yc = point.y - cylinderCenter;\n"

    +"if (yc < -cylinderRadius) {\n"
        +" gl_FragColor = behindSurface(yc, point, rrotation);\n"
        +"return;\n"
        +"}\n"

        +"if (yc > cylinderRadius) {\n"
        +"gl_FragColor = texture2D(sourceTex, texCoord);\n"
        +"return;\n"
    +"}\n"

    +"float hitAngle = (acos(yc / cylinderRadius) + cylinderAngle) - PI;\n"

    +"float hitAngleMod = mod(hitAngle, 2.0 * PI);\n"
    +"if ((hitAngleMod > PI && amount < 0.5) || (hitAngleMod > PI/2.0 && amount < 0.0)) {\n"
    +"gl_FragColor = seeThrough(yc, texCoord, rotation, rrotation);\n"
    +"return;\n"
    +"}\n"

    +"point = hitPoint(hitAngle, yc, point, rrotation);\n"

    +"if (point.x < 0.0 || point.y < 0.0 || point.x > 1.0 || point.y > 1.0) {\n"
        +"gl_FragColor = seeThroughWithShadow(yc, texCoord, point, rotation, rrotation);\n"
    +"return;\n"
        +"}\n"

    +"vec4 color = backside(yc, point);\n"

    +"vec4 otherColor;\n"
    +"if (yc < 0.0) {\n"
        +"float shado = 1.0 - (sqrt(pow(point.x - 0.5, 2.0) + pow(point.y - 0.5, 2.0)) / 0.71);\n"
    +"shado *= pow(-yc / cylinderRadius, 3.0);\n"
        +"shado *= 0.5;\n"
        +"otherColor = vec4(0.0, 0.0, 0.0, shado);\n"
    +"} else {\n"
    +"otherColor = texture2D(sourceTex, texCoord);\n"
    +"}\n"

    +"color = antiAlias(color, otherColor, cylinderRadius - abs(yc));\n"

    +"vec4 cl = seeThroughWithShadow(yc, texCoord, point, rotation, rrotation);\n"
    +"float dist = distanceToEdge(point);\n"
    +"gl_FragColor = antiAlias(color, cl, dist);\n"
+"}\n";