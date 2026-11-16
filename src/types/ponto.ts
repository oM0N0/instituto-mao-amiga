export type Ponto = {
  id: string;
  nome: string;
  endereco: string;
  bairro: string;
  horario: string;
  tipo: string;
};

export type PontoRequest = {
  nome: string;
  endereco: string;
  bairro: string;
  horario: string;
  tipo: string;
};

export type Page<T> = {
  content: T[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
};
