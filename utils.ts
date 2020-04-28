export {
  // cartesianProductN,
  cartesianProduct2
}

const {isArray} = Array

// function cartesianProductN(source: any[]) {
//   const $return: any[] = []
// }
function cartesianProduct2<T1, T2>(source1: T1[], source2: T2[]): [T1, T2][]
function cartesianProduct2<T1, T2>(source1: T1[], source2: T2): [T1, T2][]
function cartesianProduct2<T1, T2>(source1: T1, source2: T2[]): [T1, T2][]
function cartesianProduct2<T1, T2>(source1: T1, source2: [T2]): [[T1, T2]]
function cartesianProduct2<T1, T2>(source1: [T1], source2: T2): [[T1, T2]]
function cartesianProduct2<T1, T2>(source1: T1, source2: T2): [[T1, T2]]
function cartesianProduct2(source1: any, source2: any) {
  const l1 = isArray(source1) ? source1.length : 1
  , l2 = isArray(source2) ? source2.length : 1
  , $return = new Array(l1 * l2)

  for (let i1 = 0; i1 < l1; i1++) {
    const el1 = isArray(source1) ? source1[i1] : source1
    let i = i1 * l2
    for (let i2 = 0; i2 < l2; i2++)
      $return[i++] = [el1, undefined]
  }

  for (let i2 = 0; i2 < l2; i2++) {
    const el2 = isArray(source2) ? source2[i2] : source2
    let i = i2
    for (let i1 = 0; i1 < l1; i1++) {
      $return[i][1] = el2
      i += l2
    }
  }

  return $return
}