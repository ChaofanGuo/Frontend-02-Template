export let linear = v => v

let CubeBezier = function (p1x, p1y, p2x, p2y) {
  let p_start = {x: 0, y: 0}
  let p_end = {x: 1, y: 1}
  let p_crt1 = {x: p1x, y: p1y}
  let p_crt2 = {x: p2x, y: p2y}
  /**
   * 计算公式：
   *                  | 1  0  0   0|  |P0|
   * [1 t t*t  t*t*t] |-3  3  0   0|  |P1|
   *                  |3  -6  3   0|  |P2|
   *                  |-1  3  -3  1|  |p3|
   *
   * **/
  return (t) => {
    let _matrix1 = [1, t, t * t, t * t * t]
    let _matrix2 = [
      [1, 0, 0, 0]
      , [-3, 3, 0, 0]
      , [3, -6, 3, 0]
      , [-1, 3, -3, 1]
    ]

    let _matrix3 = [
      [p_start.x, p_start.y]
      , [p_crt1.x, p_crt1.y]
      , [p_crt2.x, p_crt2.y]
      , [p_end.x, p_end.y]
    ]
    let _matrix_tmp = [
      _matrix1[0] * _matrix2[0][0] + _matrix1[1] * _matrix2[1][0] + _matrix1[2] * _matrix2[2][0] + _matrix1[3] * _matrix2[3][0]
      , _matrix1[0] * _matrix2[0][1] + _matrix1[1] * _matrix2[1][1] + _matrix1[2] * _matrix2[2][1] + _matrix1[3] * _matrix2[3][1]
      , _matrix1[0] * _matrix2[0][2] + _matrix1[1] * _matrix2[1][2] + _matrix1[2] * _matrix2[2][2] + _matrix1[3] * _matrix2[3][2]
      , _matrix1[0] * _matrix2[0][3] + _matrix1[1] * _matrix2[1][3] + _matrix1[2] * _matrix2[2][3] + _matrix1[3] * _matrix2[3][3]
    ]

    let _matrix_final = [
      _matrix_tmp[0] * _matrix3[0][0] + _matrix_tmp[1] * _matrix3[1][0] + _matrix_tmp[2] * _matrix3[2][0] + _matrix_tmp[3] * _matrix3[3][0]
      , _matrix_tmp[0] * _matrix3[0][1] + _matrix_tmp[1] * _matrix3[1][1] + _matrix_tmp[2] * _matrix3[2][1] + _matrix_tmp[3] * _matrix3[3][1]
    ]

    // return _matrix_final[0]
    return _matrix_final[1]
  }
}

export let ease = CubeBezier(.25, .1, .25, 1)
export let easeIn = CubeBezier(.42, 0, 1, 1)
export let easeOut = CubeBezier(0, 0, .58, 1)
export let easeInOut = CubeBezier(.42, 0, .58, 1)
