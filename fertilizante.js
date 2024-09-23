// Datos de las materias primas
const materiasPrimas = {
  PURIN: { N: 5, P: 3, K: 2, precio: 50 },
  GALLINAZA: { N: 3, P: 3, K: 3, precio: 30 },
  COMPOST: { N: 2, P: 1, K: 1, precio: 20 },
  FOSFATO: { N: 0, P: 30, K: 0, precio: 40 },
  POTASA: { N: 0, P: 0, K: 20, precio: 70 },
  'HARINA DE CARNE': { N: 7, P: 4, K: 1, precio: 100 },
};

// Función principal
function calcularMezclaNPK(Nt, Pt, Kt, seleccionadas) {
  const m = seleccionadas.length;
  let mejorError = Infinity;
  let mejorCombinacion = null;

  if (m === 1) {
    const materia = materiasPrimas[seleccionadas[0]];
    const N_actual = materia.N;
    const P_actual = materia.P;
    const K_actual = materia.K;
    const error =
      Math.pow(N_actual - Nt, 2) +
      Math.pow(P_actual - Pt, 2) +
      Math.pow(K_actual - Kt, 2);
    mejorError = error;
    mejorCombinacion = { [seleccionadas[0]]: 100 };
  } else if (m === 2) {
    for (let x = 0; x <= 100; x += 1) {
      const frac1 = x / 100;
      const frac2 = 1 - frac1;
      const mat1 = materiasPrimas[seleccionadas[0]];
      const mat2 = materiasPrimas[seleccionadas[1]];

      const N_actual = frac1 * mat1.N + frac2 * mat2.N;
      const P_actual = frac1 * mat1.P + frac2 * mat2.P;
      const K_actual = frac1 * mat1.K + frac2 * mat2.K;

      const error =
        Math.pow(N_actual - Nt, 2) +
        Math.pow(P_actual - Pt, 2) +
        Math.pow(K_actual - Kt, 2);

      if (error < mejorError) {
        mejorError = error;
        mejorCombinacion = {
          [seleccionadas[0]]: x,
          [seleccionadas[1]]: 100 - x,
        };
      }
    }
  } else if (m === 3) {
    for (let x = 0; x <= 100; x += 5) {
      for (let y = 0; y <= 100 - x; y += 5) {
        const z = 100 - x - y;
        const frac1 = x / 100;
        const frac2 = y / 100;
        const frac3 = z / 100;

        const mat1 = materiasPrimas[seleccionadas[0]];
        const mat2 = materiasPrimas[seleccionadas[1]];
        const mat3 = materiasPrimas[seleccionadas[2]];

        const N_actual =
          frac1 * mat1.N + frac2 * mat2.N + frac3 * mat3.N;
        const P_actual =
          frac1 * mat1.P + frac2 * mat2.P + frac3 * mat3.P;
        const K_actual =
          frac1 * mat1.K + frac2 * mat2.K + frac3 * mat3.K;

        const error =
          Math.pow(N_actual - Nt, 2) +
          Math.pow(P_actual - Pt, 2) +
          Math.pow(K_actual - Kt, 2);

        if (error < mejorError) {
          mejorError = error;
          mejorCombinacion = {
            [seleccionadas[0]]: x,
            [seleccionadas[1]]: y,
            [seleccionadas[2]]: z,
          };
        }
      }
    }
  } else {
    console.log(
      'El número de materias primas seleccionadas debe ser entre 1 y 3.'
    );
    return;
  }

  // Cálculo del precio final
  let precioFinal = 0;
  let N_final = 0;
  let P_final = 0;
  let K_final = 0;

  for (const mat in mejorCombinacion) {
    const frac = mejorCombinacion[mat] / 100;
    precioFinal += frac * materiasPrimas[mat].precio;
    N_final += frac * materiasPrimas[mat].N;
    P_final += frac * materiasPrimas[mat].P;
    K_final += frac * materiasPrimas[mat].K;
  }

  console.log('Mejor combinación de materias primas:');
  for (const mat in mejorCombinacion) {
    console.log(`${mat}: ${mejorCombinacion[mat].toFixed(2)}%`);
  }
  console.log(
    `NPK obtenido: N=${N_final.toFixed(2)}, P=${P_final.toFixed(
      2
    )}, K=${K_final.toFixed(2)}`
  );
  console.log(`Precio final: ${precioFinal.toFixed(2)} unidades monetarias`);
}

// Ejemplo de uso:
const Nt = 0; // Deseado Nitrogeno
const Pt = 15; // Deseado Fosforo
const Kt = 10; // Deseado Potasio
const seleccionadas = ['FOSFATO', 'POTASA'];

calcularMezclaNPK(Nt, Pt, Kt, seleccionadas);
