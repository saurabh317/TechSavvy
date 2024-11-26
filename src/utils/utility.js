export function reduceArrayToHalf(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i += 2) {
    result.push(arr[i] + arr[i + 1]);
  }
  return result;
}

export const getColor = (value, min, max, label) => {
  const normalizedValue = (value - min) / (max - min);

  const darkToLightMetrics = ['CPC', 'CPM', 'CPO', 'ACOS', 'CPA'];
  const lightToDarkMetrics = ['Imp', 'Clicks'];

  let intensity;
  if (darkToLightMetrics.includes(label)) {
    // Intensity goes from dark to light
    intensity = 1 - normalizedValue;
  } else if (lightToDarkMetrics.includes(label)) {
    // Intensity goes from light to dark
    intensity = normalizedValue;
  }

  // Apply different color shades for each label
  switch (label) {
    case 'Imp':
      // Lavender color: light to dark
      return `rgba(${230 - intensity * 80}, ${230 - intensity * 80}, 255, 1)`;
    case 'Clicks':
      // Pink color: light to dark
      return `rgba(${255}, ${180 - intensity * 90}, ${200 - intensity * 90}, 1)`;
    case 'CPM':
      // Cyan color: dark to light
      return `rgba(${80 + intensity * 100}, ${180 + intensity * 50}, 255, 1)`;
    case 'CPC':
      // Teal color: dark to light
      return `rgba(${50 + intensity * 100}, ${150 + intensity * 80}, 200 + intensity * 55, 1)`;
    case 'CPO':
      // Blue color: dark to light
      return `rgba(${30 + intensity * 70}, ${100 + intensity * 120}, 220, 1)`;
    case 'ACOS':
      // Greenish-cyan color: dark to light
      return `rgba(${60 + intensity * 80}, ${180 + intensity * 60}, 210 + intensity * 45, 1)`;
    case 'CPA':
      // Mint color: dark to light
      return `rgba(${90 + intensity * 80}, ${200 + intensity * 40}, 220 + intensity * 35, 1)`;
    default:
      // Default color if the label is not matched
      return `rgba(200, 200, 200, 1)`;
  }
};
