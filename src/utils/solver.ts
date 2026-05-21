export interface Roots {
  x1: number | string
  x2: number | string
  x1Real: number
  x1Imag: number
  x2Real: number
  x2Imag: number
  type: 'Real and Distinct' | 'Real and Equal' | 'Complex / Imaginary'
  typeCode: 'distinct' | 'equal' | 'complex'
}

export interface SolveResult {
  a: number
  b: number
  c: number
  discriminant: number
  roots: Roots
  vertex: { x: number; y: number }
  yIntercept: number
  axisOfSymmetry: number
  steps: {
    title: string
    formula?: string
    explanation: string
    calculation: string
  }[]
}

export function solveQuadratic(a: number, b: number, c: number): SolveResult {
  const d = b * b - 4 * a * c
  
  let type: Roots['type'] = 'Real and Distinct'
  let typeCode: Roots['typeCode'] = 'distinct'
  let x1: string | number = 0
  let x2: string | number = 0
  let x1Real = 0, x1Imag = 0, x2Real = 0, x2Imag = 0

  if (d > 0) {
    x1Real = (-b + Math.sqrt(d)) / (2 * a)
    x2Real = (-b - Math.sqrt(d)) / (2 * a)
    x1 = Number(x1Real.toFixed(4))
    x2 = Number(x2Real.toFixed(4))
    type = 'Real and Distinct'
    typeCode = 'distinct'
  } else if (d === 0) {
    x1Real = -b / (2 * a)
    x2Real = -b / (2 * a)
    x1 = Number(x1Real.toFixed(4))
    x2 = Number(x2Real.toFixed(4))
    type = 'Real and Equal'
    typeCode = 'equal'
  } else {
    x1Real = -b / (2 * a)
    x2Real = -b / (2 * a)
    x1Imag = Math.sqrt(-d) / (2 * a)
    x2Imag = -Math.sqrt(-d) / (2 * a)
    x1 = `${x1Real.toFixed(4)} + ${x1Imag.toFixed(4)}i`
    x2 = `${x2Real.toFixed(4)} - ${Math.abs(x2Imag).toFixed(4)}i`
    type = 'Complex / Imaginary'
    typeCode = 'complex'
  }

  const roots: Roots = {
    x1,
    x2,
    x1Real,
    x1Imag,
    x2Real,
    x2Imag,
    type,
    typeCode
  }

  // Calculate vertex (h, k) where h = -b/(2a), k = -D/(4a)
  const vertexX = -b / (2 * a)
  const vertexY = -d / (4 * a)

  // Axis of Symmetry x = -b/(2a)
  const axis = -b / (2 * a)

  // Build high-quality step-by-step mathematical derivation
  const steps: SolveResult['steps'] = [
    {
      title: 'Step 1: Identify the Coefficients',
      explanation: `Identify the coefficients a, b, and c in the standard quadratic equation ax² + bx + c = 0.`,
      calculation: `a = ${a}, b = ${b}, c = ${c}`
    },
    {
      title: 'Step 2: Calculate the Discriminant (Δ or D)',
      formula: 'D = b² - 4ac',
      explanation: `The discriminant determines the nature and number of roots of the quadratic equation.`,
      calculation: `D = (${b})² - 4(${a})(${c})\nD = ${b * b} - ${4 * a * c}\nD = ${d}`
    },
    {
      title: 'Step 3: Determine the Nature of Roots',
      explanation: `Analyze the calculated value of the discriminant:\n• If D > 0, roots are real and distinct.\n• If D = 0, roots are real and equal.\n• If D < 0, roots are complex/imaginary.`,
      calculation: `Since D = ${d} ${d > 0 ? '> 0' : d === 0 ? '= 0' : '< 0'}, the roots are ${type}.`
    },
    {
      title: 'Step 4: Apply the Quadratic Formula',
      formula: 'x = \\frac{-b \\pm \\sqrt{b² - 4ac}}{2a}',
      explanation: `Substitute the coefficients a, b, and the discriminant D into the quadratic formula to solve for x.`,
      calculation: d >= 0 
        ? `x = \\frac{-(${b}) \\pm \\sqrt{${d}}}{2(${a})}\n` + 
          `x = \\frac{${-b} \\pm ${Number(Math.sqrt(d).toFixed(4))}}{${2 * a}}`
        : `x = \\frac{-(${b}) \\pm \\sqrt{${d}}}{2(${a})}\n` + 
          `x = \\frac{${-b} \\pm \\sqrt{${Math.abs(d)}}i}{${2 * a}}\n` +
          `x = \\frac{${-b} \\pm ${Number(Math.sqrt(-d).toFixed(4))}i}{${2 * a}}`
    },
    {
      title: 'Step 5: Solve for Final Values',
      explanation: `Calculate individual values for both solutions x₁ and x₂.`,
      calculation: d > 0 
        ? `x₁ = \\frac{${-b} + ${Number(Math.sqrt(d).toFixed(4))}}{${2 * a}} = ${x1}\n` +
          `x₂ = \\frac{${-b} - ${Number(Math.sqrt(d).toFixed(4))}}{${2 * a}} = ${x2}`
        : d === 0
        ? `x₁ = x₂ = \\frac{${-b}}{${2 * a}} = ${x1}`
        : `x₁ = \\frac{${-b}}{${2 * a}} + \\frac{${Number(Math.sqrt(-d).toFixed(4))}}{${2 * a}}i = ${x1}\n` +
          `x₂ = \\frac{${-b}}{${2 * a}} - \\frac{${Number(Math.sqrt(-d).toFixed(4))}}{${2 * a}}i = ${x2}`
    }
  ]

  return {
    a,
    b,
    c,
    discriminant: d,
    roots,
    vertex: { x: Number(vertexX.toFixed(4)), y: Number(vertexY.toFixed(4)) },
    yIntercept: c,
    axisOfSymmetry: Number(axis.toFixed(4)),
    steps
  }
}
