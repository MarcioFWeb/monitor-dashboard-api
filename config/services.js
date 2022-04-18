const CHARTS_BASE_URL = 'https://run.mocky.io/v3/';
const CHART_GET_CPU_URL = `${CHARTS_BASE_URL}b1bc5162-7cf2-4599-b1f5-e3bd58fcf07f`;
const CHART_GET_MEM_URL = `${CHARTS_BASE_URL}d23c3262-967e-4567-b7f6-2fd263748811`;
const CHART_GET_STATUS_URL = `${CHARTS_BASE_URL}cab2791c-7c85-4461-b95c-86bc1a12dc72`;

const services = {
  CHART_GET_CPU_URL,
  CHART_GET_MEM_URL,
  CHART_GET_STATUS_URL,
};

module.exports = services;