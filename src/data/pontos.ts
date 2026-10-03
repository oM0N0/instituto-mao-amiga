export type Ponto = {
  id: string;
  nome: string;
  endereco: string;
  diasHorarios: string;
  recebeDistribui: string;
};

export const pontosMock: Ponto[] = [
  {
    id: '1',
    nome: 'Mercado Central',
    endereco: 'Av. Rio Branco, 123',
    diasHorarios: 'Seg a Sex, 8h às 18h',
    recebeDistribui: 'Recebe: alimentos, roupas, brinquedos',
  },
  {
    id: '2',
    nome: 'Feira do Bairro',
    endereco: 'Praça Nossa Sra. da Conceição',
    diasHorarios: 'Sáb e Dom, 6h às 12h',
    recebeDistribui: 'Distribui: cestas básicas, hortifrúti',
  },
  {
    id: '3',
    nome: 'Supermercado Boa Vida',
    endereco: 'Rua 15 de Novembro, 456',
    diasHorarios: 'Seg a Sáb, 9h às 20h',
    recebeDistribui: 'Recebe: alimentos não perecíveis',
  },
];