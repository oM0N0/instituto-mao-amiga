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
    endereco: 'Av. Rio Branco, 123 - Centro',
    diasHorarios: 'Seg a Sex, 8h às 18h',
    recebeDistribui: 'Recebe: alimentos não perecíveis, roupas',
  },
  {
    id: '2',
    nome: 'Feira do Bairro',
    endereco: 'Praça Nossa Sra. da Conceição - Setor Sul',
    diasHorarios: 'Sáb e Dom, 6h às 12h',
    recebeDistribui: 'Distribui: cestas básicas, hortifrúti',
  },
  {
    id: '3',
    nome: 'Supermercado Boa Vida',
    endereco: 'Rua 15 de Novembro, 456 - Setor Oeste',
    diasHorarios: 'Seg a Sáb, 9h às 20h',
    recebeDistribui: 'Recebe: alimentos não perecíveis',
  },
  {
    id: '4',
    nome: 'Igreja São José',
    endereco: 'Rua das Flores, 78 - Jardim América',
    diasHorarios: 'Ter e Qui, 14h às 17h',
    recebeDistribui: 'Distribui: roupas, cobertores, brinquedos',
  },
  {
    id: '5',
    nome: 'Escola Municipal Esperança',
    endereco: 'Av. Goiás, 1020 - Setor Central',
    diasHorarios: 'Seg a Sex, 7h às 12h',
    recebeDistribui: 'Recebe: material escolar, alimentos',
  },
  {
    id: '6',
    nome: 'Centro Comunitário Vila Nova',
    endereco: 'Rua 7, Quadra 15 - Vila Nova',
    diasHorarios: 'Seg, Qua e Sex, 9h às 16h',
    recebeDistribui: 'Distribui: cestas básicas, produtos de higiene',
  },
  {
    id: '7',
    nome: 'Associação dos Moradores Parque Industrial',
    endereco: 'Rua das Indústrias, 300 - Parque Industrial',
    diasHorarios: 'Ter a Sáb, 8h às 14h',
    recebeDistribui: 'Recebe: alimentos, roupas, móveis usados',
  },
];