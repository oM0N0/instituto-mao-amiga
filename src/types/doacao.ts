export type Doacao = {
  id: string;
  tipoItem: string;
  quantidade: number;
  pontoDestino: string;
  criadoEm: string;
};

export type DoacaoRequest = {
  tipoItem: string;
  quantidade: number;
  pontoDestino: string;
};
