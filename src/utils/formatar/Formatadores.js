export const FormatarCpf = (cpf) => {
  const cleaned = cpf.replace(/\D/g, "");

  return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(
    6,
    9
  )}-${cleaned.slice(9, 11)}`;
};

export const formatarCep = (cep) => {
  return cep.replace(/(\d{5})(\d{3})/, "$1-$2");
};
