export const matricsColors = [
  {
    label: "IMP",
    code: "Impressions",
    borderColor: "rgb(150, 150, 200)",
    backgroundColor: "rgba(150, 150, 200, 0.9)",
    tension: 0.4,
  },
  {
    label: "Clicks",
    code: "Clicks",
    borderColor: "rgb(200, 100, 120)",
    backgroundColor: "rgba(200, 100, 120, 0.9)",
    tension: 0.4,
  },
  {
    label: "CPM",
    code: "CPM",
    borderColor: "rgb(0, 130, 180)",
    backgroundColor: "rgba(0, 130, 180, 0.9)",
    tension: 0.4,
  },
  {
    label: "CPC",
    code: "CPC",
    borderColor: "rgb(0, 100, 150)",
    backgroundColor: "rgba(0, 100, 150, 0.9)",
    tension: 0.4,
  },
  {
    label: "CPO",
    code: "CPO",
    borderColor: "rgb(0, 70, 160)",
    backgroundColor: "rgba(0, 70, 160, 0.9)",
    tension: 0.4,
  },
  {
    label: "ACOS",
    code: "ACOS",
    borderColor: "rgb(0, 120, 140)",
    backgroundColor: "rgba(0, 120, 140, 0.9)",
    tension: 0.4,
  },
  {
    label: "CPA",
    code: "CPA",
    borderColor: "rgb(0, 140, 150)",
    backgroundColor: "rgba(0, 140, 150, 0.9)",
    tension: 0.4,
  },
  {
    label: "ROAS",
    code: "ROAS",
    borderColor: "rgb(120, 80, 40)",
    backgroundColor: "rgba(120, 80, 40, 0.9)",
    tension: 0.4,
  },
  {
    label: "Spend",
    code: "Spend",
    borderColor: "rgb(255, 99, 132)",
    backgroundColor: "rgba(255, 99, 132, 0.9)",
    tension: 0.4,
  },
  {
    label: "Revenue",
    code: "Revenue",
    borderColor: "rgb(54, 162, 235)",
    backgroundColor: "rgba(54, 162, 235, 0.9)",
    tension: 0.4,
  },
  {
    label: "Orders",
    code: "Orders",
    borderColor: "rgb(255, 206, 86)",
    backgroundColor: "rgba(255, 206, 86, 0.9)",
    tension: 0.4,
  },
  {
    label: "CR %",
    code: "CR_perc",
    borderColor: "rgb(15, 70, 130)",
    backgroundColor: "rgba(15, 70, 130, 0.9)",
    tension: 0.4,
  },
  {
    label: "CTR%",
    code: "CTR",
    borderColor: "rgb(550, 150, 200)",
    backgroundColor: "rgba(550, 150, 200, 0.9)",
    tension: 0.4,
  },
  {
    label: "AOV",
    code: "AOV",
    borderColor: "rgb(550, 150, 0)",
    backgroundColor: "rgba(550, 150, 0, 0.9)",
    tension: 0.4,
  }
];


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

export const IDENTITY_TOKEN = 'U2FsdGVkX18lreBwDMZIZaWXmCA+9GGYXAFttifVV7ovRjRGNNlnl3F8QSfmgxbGrm4zk42ud8ygR0rZccDFlOVDj01aIUTjKrX6TNza+qoIkSe0xGH0MxBlUXrV+c+ULtgFHS9XcTXbrIGbSN1Cwt18SZK5UOGF3aavkG5ZGXwOAopznMUp4CJOxE9a7DzNsb0rJpsguSXehn+Fw0b6GT30m/c0+7Nhbtwi8GFflEgr8F41hE4jMoLwCEajSkxQhTxorAqtJRF0tlM5sUeAvBODqx4sZMB8MNv9v9NzQ7cA+P+FKB6VSS9QIwRx5PC4LQnmthfupakaZmnRL1YbZ56rPbt8lu3QSRS1yuV/GwRuCN3MBwaHitsgzMYEnAMiYGup+W/nbNsukqCXhSZGtg==';
export const POST_REQUEST = "POST";


