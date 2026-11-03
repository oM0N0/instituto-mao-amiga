export type Ponto = {
  pontoId: string;
  nome: string;
  endereco: string;
  diasHorarios: string;
  recebeDistribui: string;
  latitude: number;
  longitude: number;
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
