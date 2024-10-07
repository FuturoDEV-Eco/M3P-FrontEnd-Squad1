const API_VIACEP_URL = "https://viacep.com.br/ws/CEP/json/";

const normalizeString = (str) => {
  return str.replace("-", "").trim();
};

const Get = async (cep) => {
  const response = await fetch(
    API_VIACEP_URL.replace("CEP", normalizeString(cep))
  );
  const data = await response.json();

  return data;
};

export const ViaCepService = {
  Get
};
